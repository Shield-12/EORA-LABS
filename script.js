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
        <label class="volume-wrap">Volume <input id="volumeControl" type="range" min="0" max="100" value="30" aria-label="Ambient music volume"></label>
        <button class="voice-button" id="voiceGuide" type="button" aria-label="Read a short voice guide for this page" title="Voice guide">◉</button>
        <button class="shortcut-button" id="shortcutButton" type="button" aria-label="Show keyboard shortcuts" title="Keyboard shortcuts">?</button>
      </div>
      <div class="audio-hint">Generative ambient music and subtle interface feedback. The voice guide uses your device's speech engine.</div>
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

  // Active navigation state.
  const currentPath = location.pathname;
  qa(".site-nav a").forEach(a => {
    const href = new URL(a.href, location.origin).pathname;
    if (currentPath === href || (href !== "/" && currentPath.startsWith(href))) a.setAttribute("aria-current","page");
  });

  // Mobile menu and header state.
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

  // Loading and entry experience.
  const loader = q("#pageLoader");
  const loaderLog = q("#loaderLog");
  const loaderActions = q("#loaderActions");
  const visited = sessionStorage.getItem("eoraVisited") === "true";
  let audioDesired = localStorage.getItem("eoraAudio") === "on";
  body.classList.add("is-loading");

  const logs = ["Resolving portfolio routes…","Loading infrastructure records…","Synchronizing project dossiers…","Interface ready."];
  let logIndex = 0;
  const logTimer = setInterval(() => {
    loaderLog.textContent = logs[Math.min(logIndex++, logs.length - 1)];
    if (logIndex >= logs.length) clearInterval(logTimer);
  }, 350);

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

  // Reveals and animated counters.
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

  // Pointer lighting and restrained 3D movement.
  const glow = q("#cursorGlow");
  if (matchMedia("(pointer:fine)").matches && !reducedMotion) {
    body.classList.add("has-pointer");
    addEventListener("pointermove", e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, {passive:true});
    qa("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => card.style.transform = "");
    });
  }

  // Page transitions.
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(a.href, location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin !== location.origin || a.target === "_blank" || (url.hash && url.pathname === location.pathname)) return;
    e.preventDefault();
    if (audioEnabled) uiTone("navigate");
    body.classList.add("nav-exit");
    setTimeout(() => location.href = url.href, reducedMotion ? 0 : 240);
  });

  // Generative ambient music and interface audio.
  let ctx, master, musicGain, uiGain, filter, lfo, chordTimer, bellTimer;
  let audioEnabled = false;
  let currentChord = 0;
  const audioVoices = [];
  const chordSets = [
    [130.81,164.81,196.00,246.94],
    [110.00,130.81,164.81,196.00],
    [87.31,130.81,174.61,220.00],
    [98.00,146.83,196.00,220.00]
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
    master.gain.value = .0001;
    musicGain.gain.value = .22;
    uiGain.gain.value = .18;
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = .7;
    musicGain.connect(filter);
    filter.connect(master);
    uiGain.connect(master);
    master.connect(ctx.destination);

    lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = .07;
    lfoGain.gain.value = 160;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    chordSets[0].forEach((frequency,index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index % 2 ? "sine" : "triangle";
      oscillator.frequency.value = frequency / 2;
      gain.gain.value = index === 0 ? .035 : .018;
      oscillator.connect(gain);
      gain.connect(musicGain);
      oscillator.start();
      audioVoices.push({oscillator,gain});
    });
    scheduleChord();
    chordTimer = setInterval(nextChord, 8000);
    bellTimer = setInterval(playBell, 4300);
    return ctx;
  }

  function scheduleChord() {
    if (!ctx) return;
    const set = chordSets[currentChord];
    const now = ctx.currentTime;
    audioVoices.forEach((voice,index) => voice.oscillator.frequency.exponentialRampToValueAtTime(set[index] / 2, now + 3.2));
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
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + 2.4);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 2.5);
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
    master.gain.exponentialRampToValueAtTime(Math.max(volume * .45,.0001), activeContext.currentTime + .8);
    localStorage.setItem("eoraAudio","on");
    syncAudioUI();
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

  function uiTone(type="click") {
    if (!audioEnabled) return;
    const activeContext = ensureContext();
    if (!activeContext) return;
    const oscillator = activeContext.createOscillator();
    const gain = activeContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = type === "navigate" ? 420 : type === "hover" ? 760 : 620;
    if (type === "navigate") oscillator.frequency.exponentialRampToValueAtTime(840, activeContext.currentTime + .12);
    gain.gain.setValueAtTime(.0001, activeContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.035, activeContext.currentTime + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, activeContext.currentTime + (type === "navigate" ? .18 : .08));
    oscillator.connect(gain);
    gain.connect(uiGain);
    oscillator.start();
    oscillator.stop(activeContext.currentTime + .22);
  }

  q("#audioToggle").addEventListener("click", () => audioEnabled ? stopAudio() : startAudio());
  q("#volumeControl").addEventListener("input", e => {
    if (!ctx) return;
    const volume = Number(e.target.value) / 100;
    master.gain.setTargetAtTime(audioEnabled ? Math.max(volume * .45,.0001) : .0001, ctx.currentTime, .12);
  });
  document.addEventListener("pointerover", e => {
    if (!audioEnabled) return;
    const target = e.target.closest(".button,.page-link,.card,.header-chip");
    if (target && !target.contains(e.relatedTarget)) uiTone("hover");
  });
  document.addEventListener("click", e => { if (audioEnabled && e.target.closest("button,.button")) uiTone("click"); });

  // Voice guide.
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

  // Keyboard shortcuts.
  const shortcutPanel = q("#shortcutPanel");
  q("#shortcutButton").addEventListener("click", () => shortcutPanel.classList.toggle("is-open"));
  addEventListener("keydown", e => {
    if (e.target.matches("input,textarea,select,[contenteditable=true]")) return;
    if (e.key.toLowerCase() === "m") audioEnabled ? stopAudio() : startAudio();
    if (e.key.toLowerCase() === "g") speak(`${page.title}. ${page.voice}`);
    if (e.key.toLowerCase() === "h") location.href = "/";
    if (e.key === "?") shortcutPanel.classList.toggle("is-open");
  });

  // Browser autoplay rules require a trusted interaction when audio was saved from a previous page.
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

  // Animated network background.
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
      const count = Math.max(22, Math.min(58, Math.floor(width * height / 26000)));
      nodes = Array.from({length:count}, () => ({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.6+.6}));
    }
    function drawNetwork() {
      context.clearRect(0,0,width,height);
      nodes.forEach(node => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
      context.lineWidth = .55;
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i], b=nodes[j], distance=Math.hypot(a.x-b.x,a.y-b.y);
        if (distance < 145) {
          context.strokeStyle = `rgba(104,220,255,${(1-distance/145)*.10})`;
          context.beginPath(); context.moveTo(a.x,a.y); context.lineTo(b.x,b.y); context.stroke();
        }
      }
      nodes.forEach(node => { context.fillStyle="rgba(137,226,255,.34)"; context.beginPath(); context.arc(node.x,node.y,node.r,0,Math.PI*2); context.fill(); });
      requestAnimationFrame(drawNetwork);
    }
    resizeCanvas();
    addEventListener("resize",resizeCanvas);
    drawNetwork();
  }
})();
