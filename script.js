(() => {
  "use strict";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const key = body.dataset.page || "home";
  const page = (window.EORA_PAGES && window.EORA_PAGES[key]) || window.EORA_PAGES.notfound;
  const q = (s, c=document) => c.querySelector(s);
  const qa = (s, c=document) => [...c.querySelectorAll(s)];

  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const actionLink = ([href,label,style]) => {
    const external = /^https?:/i.test(href);
    return `<a class="button ${style || "secondary"}" href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${label}</a>`;
  };

  function breadcrumbs() {
    if (key === "home") return "";
    const parts = location.pathname.split("/").filter(Boolean);
    const labels = {recruiter:"Recruiter",projects:"Projects",experience:"Experience",credentials:"Credentials",education:"Education",capabilities:"Capabilities",about:"About",contact:"Contact"};
    let path = "";
    const crumbs = ['<a href="/">Home</a>'];
    parts.forEach((part, index) => {
      path += `/${part}`;
      const label = index === parts.length - 1 ? page.title : (labels[part] || part.replace(/-/g," "));
      crumbs.push(index === parts.length - 1 ? `<span>${escapeHtml(label)}</span>` : `<a href="${path}/">${escapeHtml(label)}</a>`);
    });
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${crumbs.join("<b aria-hidden='true'>/</b>")}</nav>`;
  }

  function renderPage() {
    document.title = `${page.title} | Eora Labs`;
    const meta = q('meta[name="description"]');
    if (meta) meta.content = page.lede;
    q("#main").innerHTML = `
      <section class="page-hero ${page.compact ? "compact" : ""}" id="top">
        <div class="inner">
          ${breadcrumbs()}
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.headline}</h1>
          <p class="hero-lede">${page.lede}</p>
          ${page.actions ? `<div class="hero-actions">${page.actions.map(actionLink).join("")}</div>` : ""}
        </div>
      </section>
      ${page.content || ""}
    `;
  }

  renderPage();

  function injectShell() {
    body.insertAdjacentHTML("afterbegin", `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="page-loader" id="pageLoader" role="dialog" aria-modal="true" aria-label="Loading Eora Labs">
        <div class="loader-shell">
          <div class="loader-mark" aria-hidden="true">EL</div>
          <p class="loader-kicker">Professional systems portfolio</p>
          <h1 class="loader-title">Eora Labs</h1>
          <p class="loader-subtitle">Systems · Security · Infrastructure</p>
          <div class="loader-track" aria-hidden="true"><i></i></div>
          <p class="loader-log" id="loaderLog" aria-live="polite">Initializing ${escapeHtml(page.title)} interface…</p>
          <div class="loader-actions" id="loaderActions">
            <button class="button primary" id="enterAudio" type="button">Enter with ambient audio</button>
            <button class="button secondary" id="enterSilent" type="button">Enter silently</button>
          </div>
          <small class="loader-note">Audio is optional and can be muted at any time.</small>
        </div>
      </div>
      <canvas id="networkCanvas" aria-hidden="true"></canvas>
      <div class="grid-field" aria-hidden="true"></div>
      <div class="noise-field" aria-hidden="true"></div>
      <div class="scanline" aria-hidden="true"></div>
      <div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
      <header class="site-header" id="siteHeader">
        <a class="brand" href="/" aria-label="Eora Labs home"><span class="brand-mark">EL</span><span><strong>Eora Labs</strong><small>Langston Brown</small></span></a>
        <nav class="site-nav" id="siteNav" aria-label="Primary navigation">
          <a href="/recruiter/">Recruiter</a><a href="/projects/">Projects</a><a href="/experience/">Experience</a><a href="/credentials/">Credentials</a><a href="/capabilities/">Capabilities</a><a href="/about/">About</a>
        </nav>
        <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Open navigation"><span></span><span></span><span></span></button>
        <div class="header-actions"><a class="header-chip" href="/contact/">Contact</a></div>
      </header>
      <div class="audio-dock" id="audioDock">
        <button class="audio-button" id="audioToggle" type="button" aria-pressed="false" aria-label="Enable ambient music and interface sounds"><span class="audio-meter" aria-hidden="true"><i></i><i></i><i></i></span><span class="audio-label" id="audioLabel">Audio off</span></button>
        <label class="volume-wrap">Volume <input id="volumeControl" type="range" min="0" max="100" value="36" aria-label="Ambient music volume"></label>
        <button class="voice-button" id="voiceGuide" type="button" aria-label="Read a short voice guide for this page" title="Voice guide">◉</button>
        <button class="shortcut-button" id="shortcutButton" type="button" aria-label="Show keyboard shortcuts" title="Keyboard shortcuts">?</button>
      </div>
      <div class="audio-hint">Generative ambient music, spatial hover cues, scrolling pulses, and interface feedback. Everything can be muted.</div>
      <div class="shortcut-panel" id="shortcutPanel"><strong>Keyboard controls</strong><p><b>M</b> — mute or enable audio</p><p><b>G</b> — voice guide</p><p><b>H</b> — home</p><p><b>?</b> — show or hide this panel</p></div>
    `);

    body.insertAdjacentHTML("beforeend", `
      <footer class="site-footer">
        <div><a class="brand" href="/"><span class="brand-mark">EL</span><span><strong>Eora Labs</strong><small>Systems · Security · Infrastructure</small></span></a><p>© <span id="year"></span> Langston Brown. Built as a living technical portfolio.</p></div>
        <div class="footer-links"><a href="/projects/">Projects</a><a href="/experience/">Experience</a><a href="/credentials/">Credentials</a><a href="/contact/">Contact</a><a href="#top">Back to top ↑</a></div>
      </footer>
    `);
  }

  injectShell();
  q("#year").textContent = new Date().getFullYear();

  const currentPath = location.pathname;
  qa(".site-nav a").forEach(a => {
    const href = new URL(a.href, location.origin).pathname;
    if (currentPath === href || (href !== "/" && currentPath.startsWith(href))) a.setAttribute("aria-current","page");
  });

  const menu = q("#menuToggle");
  const nav = q("#siteNav");
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.addEventListener("click", () => { nav.classList.remove("is-open"); menu.setAttribute("aria-expanded","false"); });
  const header = q("#siteHeader");
  const syncHeader = () => header.classList.toggle("is-scrolled", scrollY > 22);
  addEventListener("scroll", syncHeader, {passive:true});
  syncHeader();

  const loader = q("#pageLoader");
  const loaderLog = q("#loaderLog");
  const loaderActions = q("#loaderActions");
  const visited = sessionStorage.getItem("eoraVisited") === "true";
  let audioDesired = localStorage.getItem("eoraAudio") === "on";
  body.classList.add("is-loading");

  const logs = ["Resolving portfolio routes…","Loading infrastructure records…","Synchronizing project dossiers…","Calibrating spatial interface audio…","Interface ready."];
  let logIndex = 0;
  const logTimer = setInterval(() => {
    loaderLog.textContent = logs[Math.min(logIndex++, logs.length - 1)];
    if (logIndex >= logs.length) clearInterval(logTimer);
  }, 320);

  function closeLoader(enableAudio, speakWelcome=false, userInitiated=false) {
    sessionStorage.setItem("eoraVisited","true");
    audioDesired = enableAudio;
    localStorage.setItem("eoraAudio", enableAudio ? "on" : "off");
    if (enableAudio && userInitiated) startAudio();
    syncAudioUI();
    if (speakWelcome) speak(`Welcome to Eora Labs. ${page.voice}`);
    loader.classList.add("is-hidden");
    body.classList.remove("is-loading");
    setTimeout(() => loader.setAttribute("aria-hidden","true"), 700);
  }

  setTimeout(() => {
    if (visited) closeLoader(audioDesired, false, false);
    else {
      loaderActions.classList.add("is-ready");
      q("#enterAudio").focus({preventScroll:true});
    }
  }, reducedMotion ? 90 : (visited ? 700 : 1750));

  q("#enterAudio").addEventListener("click", () => closeLoader(true, true, true));
  q("#enterSilent").addEventListener("click", () => closeLoader(false, false, true));

  const reveals = qa(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), {threshold:.11});
    reveals.forEach((el,i) => { el.style.transitionDelay = `${Math.min(i * 34, 220)}ms`; observer.observe(el); });
  } else reveals.forEach(el => el.classList.add("is-visible"));

  qa("[data-count]").forEach(el => {
    const target = Number(el.dataset.count);
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / 1000, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { run(); io.disconnect(); } }, {threshold:.4});
      io.observe(el);
    } else run();
  });

  const glow = q("#cursorGlow");
  let pointerX = innerWidth / 2;
  let pointerY = innerHeight / 2;
  let pointerSpeed = 0;
  let lastPointerX = pointerX;
  let lastPointerY = pointerY;
  let lastPointerT = performance.now();
  if (matchMedia("(pointer:fine)").matches && !reducedMotion) {
    body.classList.add("has-pointer");
    addEventListener("pointermove", e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      const now = performance.now();
      const dt = Math.max(now - lastPointerT, 1);
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      pointerSpeed = Math.min(Math.hypot(dx,dy) / dt, 2.4);
      pointerX = e.clientX;
      pointerY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerT = now;
      if (audioEnabled && ctx && spatialPan) {
        const pan = Math.max(-1, Math.min(1, (pointerX / innerWidth) * 2 - 1));
        spatialPan.pan.setTargetAtTime(pan, ctx.currentTime, .05);
      }
    }, {passive:true});
    qa("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 8}deg) translateY(-4px) scale(1.01)`;
      });
      card.addEventListener("pointerleave", () => card.style.transform = "");
    });
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(a.href, location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin !== location.origin || a.target === "_blank" || (url.hash && url.pathname === location.pathname)) return;
    e.preventDefault();
    if (audioEnabled) uiTone("navigate");
    body.classList.add("nav-exit");
    setTimeout(() => location.href = url.href, reducedMotion ? 0 : 300);
  });

  let ctx, master, musicGain, uiGain, filter, lfo, chordTimer, bellTimer, shimmerTimer, spatialPan, motionGain;
  let audioEnabled = false;
  let currentChord = 0;
  let lastHoverTone = 0;
  let lastScrollTone = 0;
  const audioVoices = [];
  const chordSets = [
    [130.81,164.81,196.00,246.94],
    [110.00,130.81,164.81,196.00],
    [87.31,130.81,174.61,220.00],
    [98.00,146.83,196.00,220.00],
    [123.47,155.56,185.00,233.08]
  ];

  function ensureContext() {
    if (ctx) return ctx;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    ctx = new AudioContext();
    master = ctx.createGain();
    musicGain = ctx.createGain();
    uiGain = ctx.createGain();
    filter = ctx.createBiquadFilter();
    motionGain = ctx.createGain();
    spatialPan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    master.gain.value = .0001;
    musicGain.gain.value = .24;
    uiGain.gain.value = .2;
    motionGain.gain.value = .0001;
    filter.type = "lowpass";
    filter.frequency.value = 1050;
    filter.Q.value = .8;
    musicGain.connect(filter);
    filter.connect(master);
    if (spatialPan) {
      uiGain.connect(spatialPan);
      spatialPan.connect(master);
    } else uiGain.connect(master);
    motionGain.connect(master);
    master.connect(ctx.destination);

    lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = .055;
    lfoGain.gain.value = 240;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    chordSets[0].forEach((frequency,index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index % 2 ? "sine" : "triangle";
      oscillator.frequency.value = frequency / 2;
      gain.gain.value = index === 0 ? .038 : .019;
      oscillator.connect(gain);
      gain.connect(musicGain);
      oscillator.start();
      audioVoices.push({oscillator,gain});
    });

    const air = ctx.createOscillator();
    const airGain = ctx.createGain();
    air.type = "sine";
    air.frequency.value = 43.65;
    airGain.gain.value = .012;
    air.connect(airGain);
    airGain.connect(musicGain);
    air.start();

    scheduleChord();
    chordTimer = setInterval(nextChord, 7600);
    bellTimer = setInterval(playBell, 3900);
    shimmerTimer = setInterval(playShimmer, 6100);
    return ctx;
  }

  function scheduleChord() {
    if (!ctx) return;
    const set = chordSets[currentChord];
    const now = ctx.currentTime;
    audioVoices.forEach((voice,index) => voice.oscillator.frequency.exponentialRampToValueAtTime(set[index] / 2, now + 3));
  }
  function nextChord() { currentChord = (currentChord + 1) % chordSets.length; scheduleChord(); }

  function playBell() {
    if (!audioEnabled || !ctx) return;
    const notes = chordSets[currentChord];
    const frequency = notes[Math.floor(Math.random() * notes.length)] * 2;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.018, ctx.currentTime + .04);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + 2.6);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 2.7);
  }

  function playShimmer() {
    if (!audioEnabled || !ctx) return;
    const now = ctx.currentTime;
    [0, .09, .18].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = [784, 987.77, 1174.66][i];
      gain.gain.setValueAtTime(.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(.009, now + offset + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, now + offset + .65);
      osc.connect(gain); gain.connect(musicGain); osc.start(now + offset); osc.stop(now + offset + .7);
    });
  }

  function startAudio() {
    const activeContext = ensureContext();
    if (!activeContext) return;
    activeContext.resume();
    audioDesired = true;
    audioEnabled = true;
    const volume = Number(q("#volumeControl").value) / 100;
    master.gain.cancelScheduledValues(activeContext.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value,.0001), activeContext.currentTime);
    master.gain.exponentialRampToValueAtTime(Math.max(volume * .48,.0001), activeContext.currentTime + .8);
    localStorage.setItem("eoraAudio","on");
    syncAudioUI();
    uiTone("confirm");
  }

  function stopAudio() {
    audioDesired = false;
    audioEnabled = false;
    if (ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(Math.max(master.gain.value,.0001), ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .35);
    }
    localStorage.setItem("eoraAudio","off");
    syncAudioUI();
  }

  function syncAudioUI() {
    const button = q("#audioToggle");
    const label = q("#audioLabel");
    button.setAttribute("aria-pressed", String(audioEnabled));
    button.setAttribute("aria-label", audioEnabled ? "Mute ambient music and interface sounds" : "Enable ambient music and interface sounds");
    label.textContent = audioEnabled ? "Audio on" : (audioDesired ? "Audio ready" : "Audio off");
  }

  function uiTone(type="click", panOverride=null) {
    if (!audioEnabled) return;
    const activeContext = ensureContext();
    if (!activeContext) return;
    const oscillator = activeContext.createOscillator();
    const gain = activeContext.createGain();
    const panNode = activeContext.createStereoPanner ? activeContext.createStereoPanner() : null;
    oscillator.type = type === "hover" ? "triangle" : "sine";
    const frequencyMap = {navigate:420,hover:760,click:620,confirm:880,scroll:300,menu:540};
    oscillator.frequency.value = frequencyMap[type] || 620;
    if (type === "navigate") oscillator.frequency.exponentialRampToValueAtTime(840, activeContext.currentTime + .14);
    if (type === "confirm") oscillator.frequency.exponentialRampToValueAtTime(1174.66, activeContext.currentTime + .16);
    if (type === "scroll") oscillator.frequency.exponentialRampToValueAtTime(360, activeContext.currentTime + .08);
    const peak = type === "hover" ? .018 : type === "scroll" ? .012 : .035;
    const duration = type === "navigate" || type === "confirm" ? .2 : type === "scroll" ? .12 : .09;
    gain.gain.setValueAtTime(.0001, activeContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(peak, activeContext.currentTime + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, activeContext.currentTime + duration);
    oscillator.connect(gain);
    if (panNode) {
      const pan = panOverride == null ? Math.max(-1, Math.min(1, (pointerX / innerWidth) * 2 - 1)) : panOverride;
      panNode.pan.value = pan;
      gain.connect(panNode);
      panNode.connect(uiGain);
    } else gain.connect(uiGain);
    oscillator.start();
    oscillator.stop(activeContext.currentTime + duration + .05);
  }

  q("#audioToggle").addEventListener("click", () => audioEnabled ? stopAudio() : startAudio());
  q("#volumeControl").addEventListener("input", e => {
    if (!ctx) return;
    const volume = Number(e.target.value) / 100;
    master.gain.setTargetAtTime(audioEnabled ? Math.max(volume * .48,.0001) : .0001, ctx.currentTime, .12);
  });

  document.addEventListener("pointerover", e => {
    if (!audioEnabled) return;
    const target = e.target.closest(".button,.page-link,.card,.header-chip,.site-nav a,.brand,.audio-button,.voice-button,.shortcut-button");
    if (!target || target.contains(e.relatedTarget)) return;
    const now = performance.now();
    if (now - lastHoverTone < 55) return;
    lastHoverTone = now;
    const rect = target.getBoundingClientRect();
    const pan = Math.max(-1, Math.min(1, ((rect.left + rect.width / 2) / innerWidth) * 2 - 1));
    uiTone("hover", pan);
  });

  document.addEventListener("click", e => {
    if (!audioEnabled) return;
    if (e.target.closest("button,.button,.site-nav a,.header-chip")) uiTone("click");
  });

  menu.addEventListener("click", () => { if (audioEnabled) uiTone("menu"); });

  let lastScrollY = scrollY;
  addEventListener("scroll", () => {
    if (!audioEnabled || !ctx) return;
    const now = performance.now();
    const delta = Math.abs(scrollY - lastScrollY);
    lastScrollY = scrollY;
    if (delta > 18 && now - lastScrollTone > 145) {
      lastScrollTone = now;
      const directionPan = scrollY % 2 ? .18 : -.18;
      uiTone("scroll", directionPan);
    }
    if (motionGain) motionGain.gain.setTargetAtTime(Math.min(.018, delta / 7000), ctx.currentTime, .04);
  }, {passive:true});

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .94;
    utterance.pitch = .9;
    utterance.volume = .8;
    const available = speechSynthesis.getVoices();
    utterance.voice = available.find(v => /English.*(US|United States)/i.test(`${v.name} ${v.lang}`)) || available.find(v => v.lang.startsWith("en")) || null;
    speechSynthesis.speak(utterance);
  }
  q("#voiceGuide").addEventListener("click", () => speak(`${page.title}. ${page.voice}`));

  const shortcutPanel = q("#shortcutPanel");
  q("#shortcutButton").addEventListener("click", () => shortcutPanel.classList.toggle("is-open"));
  addEventListener("keydown", e => {
    if (e.target.matches("input,textarea,select,[contenteditable=true]")) return;
    if (e.key.toLowerCase() === "m") audioEnabled ? stopAudio() : startAudio();
    if (e.key.toLowerCase() === "g") speak(`${page.title}. ${page.voice}`);
    if (e.key.toLowerCase() === "h") location.href = "/";
    if (e.key === "?") shortcutPanel.classList.toggle("is-open");
  });

  if (audioDesired) {
    const resumeSavedAudio = event => {
      if (event.target && event.target.closest && event.target.closest("#audioToggle")) return;
      startAudio();
      removeEventListener("pointerdown", resumeSavedAudio);
      removeEventListener("keydown", resumeSavedAudio);
    };
    addEventListener("pointerdown", resumeSavedAudio);
    addEventListener("keydown", resumeSavedAudio);
  }
  syncAudioUI();

  if (!reducedMotion) {
    const canvas = q("#networkCanvas");
    const context = canvas.getContext("2d");
    let width, height, dpr, nodes = [];
    function resizeCanvas() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.max(22, Math.min(64, Math.floor(width * height / 24000)));
      nodes = Array.from({length:count}, () => ({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.8+.6}));
    }
    function drawNetwork() {
      context.clearRect(0,0,width,height);
      nodes.forEach(node => {
        const dx = pointerX - node.x;
        const dy = pointerY - node.y;
        const dist = Math.hypot(dx,dy);
        if (dist < 180 && dist > 1) {
          const pull = (1 - dist / 180) * .004 * (1 + pointerSpeed);
          node.vx += dx * pull / dist;
          node.vy += dy * pull / dist;
        }
        node.vx *= .998;
        node.vy *= .998;
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      context.lineWidth = .55;
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i], b=nodes[j], distance=Math.hypot(a.x-b.x,a.y-b.y);
        if (distance < 155) {
          context.strokeStyle = `rgba(104,220,255,${(1-distance/155)*.12})`;
          context.beginPath(); context.moveTo(a.x,a.y); context.lineTo(b.x,b.y); context.stroke();
        }
      }
      nodes.forEach(node => { context.fillStyle="rgba(137,226,255,.38)"; context.beginPath(); context.arc(node.x,node.y,node.r,0,Math.PI*2); context.fill(); });
      requestAnimationFrame(drawNetwork);
    }
    resizeCanvas();
    addEventListener("resize",resizeCanvas);
    drawNetwork();
  }
})();

/* EORA SPA navigation layer
 * Keeps the shared shell, ambient audio, and interface state alive while
 * page content changes in-place. Full URLs remain bookmarkable and
 * back/forward navigation is supported through the History API.
 */
(() => {
  "use strict";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const main = document.querySelector("#main");
  if (!main || !window.EORA_PAGES) return;

  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));

  const pathLabels = {
    recruiter:"Recruiter", projects:"Projects", experience:"Experience",
    credentials:"Credentials", education:"Education",
    capabilities:"Capabilities", about:"About", contact:"Contact"
  };

  const routeParts = path => path.split("/").filter(Boolean);

  function renderBreadcrumbs(path, page) {
    const parts = routeParts(path);
    if (!parts.length) return "";
    let current = "";
    const crumbs = ['<a href="/">Home</a>'];
    parts.forEach((part, index) => {
      current += "/" + part;
      const label = index === parts.length - 1
        ? page.title
        : (pathLabels[part] || part.replace(/-/g, " "));
      crumbs.push(index === parts.length - 1
        ? `<span>${escapeHtml(label)}</span>`
        : `<a href="${current}/">${escapeHtml(label)}</a>`);
    });
    return `<nav class="breadcrumbs" aria-label="Breadcrumb">${crumbs.join("<b aria-hidden='true'>/</b>")}</nav>`;
  }

  function actionLink(action) {
    const [href, label, style] = action;
    const external = /^https?:/i.test(href);
    return `<a class="button ${style || "secondary"}" href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(label)}</a>`;
  }

  function renderPage(path, key) {
    const page = window.EORA_PAGES[key] || window.EORA_PAGES.notfound;
    document.title = `${page.title} | Eora Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = page.lede || "";
    main.innerHTML = `
      <section class="page-hero ${page.compact ? "compact" : ""}" id="top">
        <div class="inner">
          ${renderBreadcrumbs(path, page)}
          <p class="eyebrow">${page.eyebrow || ""}</p>
          <h1>${page.headline || page.title}</h1>
          <p class="hero-lede">${page.lede || ""}</p>
          ${page.actions ? `<div class="hero-actions">${page.actions.map(actionLink).join("")}</div>` : ""}
        </div>
      </section>
      ${page.content || ""}
    `;
    document.querySelectorAll(".site-nav a").forEach(link => {
      const linkPath = new URL(link.href, location.origin).pathname;
      if (path === linkPath || (linkPath !== "/" && path.startsWith(linkPath))) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    document.querySelector("#siteNav")?.classList.remove("is-open");
    document.querySelector("#menuToggle")?.setAttribute("aria-expanded", "false");
    document.querySelector("#year")?.replaceChildren(String(new Date().getFullYear()));
    return page;
  }

  function revealNewContent() {
    const items = [...main.querySelectorAll(".reveal")];
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), {threshold: .11});
    items.forEach((item, index) => {
      item.classList.remove("is-visible");
      item.style.transitionDelay = `${Math.min(index * 34, 220)}ms`;
      observer.observe(item);
    });
  }

  async function pageKeyFor(url) {
    const response = await fetch(url.href, {credentials: "same-origin"});
    if (!response.ok) throw new Error(`Page request failed (${response.status})`);
    const html = await response.text();
    const parsed = new DOMParser().parseFromString(html, "text/html");
    return parsed.body?.dataset.page || "notfound";
  }

  async function navigate(url, {replace = false, scroll = true, force = false} = {}) {
    if (!force && (url.origin !== location.origin || url.pathname === location.pathname && url.search === location.search)) {
      if (url.hash) document.querySelector(url.hash)?.scrollIntoView({behavior: reducedMotion ? "auto" : "smooth"});
      return;
    }
    body.classList.add("spa-leave");
    try {
      const key = await pageKeyFor(url);
      if (!reducedMotion) await new Promise(resolve => setTimeout(resolve, 180));
      renderPage(url.pathname, key);
      if (replace) history.replaceState({path: url.pathname}, "", url.href);
      else history.pushState({path: url.pathname}, "", url.href);
      body.classList.remove("spa-leave");
      body.classList.add("spa-enter");
      requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove("spa-enter")));
      if (scroll) scrollTo({top: 0, behavior: reducedMotion ? "auto" : "smooth"});
      revealNewContent();
    } catch (error) {
      body.classList.remove("spa-leave");
      console.warn("Eora Labs navigation fallback:", error);
      location.href = url.href;
    }
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || link.target === "_blank" ||
        link.hasAttribute("download") || url.hash && url.pathname === location.pathname) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(url);
  }, true);

  addEventListener("popstate", () => navigate(new URL(location.href), {replace: true, force: true}));
  history.replaceState({path: location.pathname}, "", location.href);

  const transitionStyle = document.createElement("style");
  transitionStyle.textContent = `
    body.spa-leave #main { opacity: 0; transform: translateX(-2.5rem) scale(.985); filter: blur(5px); }
    body.spa-enter #main { opacity: 0; transform: translateX(2.5rem) scale(.985); filter: blur(5px); }
    #main { transition: opacity .28s ease, transform .34s cubic-bezier(.2,.8,.2,1), filter .28s ease; }
    @media (prefers-reduced-motion: reduce) {
      #main, body.spa-leave #main, body.spa-enter #main { transition: none; transform: none; filter: none; }
    }
  `;
  document.head.appendChild(transitionStyle);
})();
