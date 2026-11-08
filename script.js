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
    const labels = {recruiter:"Recruiter",projects:"Projects",experience:"Experience",resume:"Résumé",credentials:"Credentials",education:"Education",capabilities:"Capabilities",about:"About",contact:"Contact"};
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
      <canvas id="networkCanvas" aria-hidden="true"></canvas>
      <div class="grid-field" aria-hidden="true"></div>
      <div class="noise-field" aria-hidden="true"></div>
      <div class="scanline" aria-hidden="true"></div>
      <div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
      <header class="site-header" id="siteHeader">
        <a class="brand" href="/" aria-label="Eora Labs home"><span class="brand-mark">EL</span><span><strong>Eora Labs</strong><small>Langston Brown · Systems Operations</small></span></a>
        <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Open navigation"><span></span><span></span><span></span></button>
      </header>
      <nav class="site-nav" id="siteNav" aria-label="Primary navigation">
        <a href="/">Home</a><a href="/projects/">Projects</a><a href="/experience/">Experience</a><a href="/resume/">Résumé</a><a href="/credentials/">Credentials</a><a href="/capabilities/">Capabilities</a><a href="/contact/">Contact</a>
      </nav>
      <div class="audio-dock" id="audioDock">
        <button class="audio-button" id="audioToggle" type="button" aria-pressed="false" aria-label="Turn on interaction sounds"><span class="audio-meter" aria-hidden="true"><i></i><i></i><i></i></span><span class="audio-label" id="audioLabel">Sounds off</span></button>
        <label class="volume-wrap">Level <input id="volumeControl" type="range" min="0" max="100" value="22" aria-label="Interaction sound level"></label>
        <button class="shortcut-button" id="shortcutButton" type="button" aria-label="Show keyboard shortcuts" title="Keyboard shortcuts">?</button>
      </div>
      <div class="audio-hint">Optional interaction sounds stay off until this control is turned on. Hovering and scrolling stay quiet.</div>
      <div class="shortcut-panel" id="shortcutPanel"><strong>Keyboard controls</strong><p><b>M</b> — turn interaction sounds on or off</p><p><b>H</b> — home</p><p><b>?</b> — show or hide this panel</p><p>Sounds stay off until you turn them on.</p></div>
    `);

    body.insertAdjacentHTML("beforeend", `
      <footer class="site-footer">
        <div><a class="brand" href="/"><span class="brand-mark">EL</span><span><strong>Eora Labs</strong><small>Systems · Security · Infrastructure</small></span></a><p>© <span id="year"></span> Langston Brown. Built as a living technical portfolio.</p></div>
        <div class="footer-links"><a href="/resume/">Résumé</a><a href="/projects/">Projects</a><a href="/experience/">Experience</a><a href="/credentials/">Credentials</a><a href="/contact/">Contact</a><a href="#top">Back to top ↑</a></div>
      </footer>
    `);
  }

  injectShell();
  q("#year").textContent = new Date().getFullYear();
  q("#siteHeader")?.append(q("#audioDock"));
  if (window.EORA_BOOT) window.EORA_BOOT.dismiss();

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
    if (!/^https?:$/.test(url.protocol) || url.origin !== location.origin || a.target === "_blank" || a.hasAttribute("download") || (url.hash && url.pathname === location.pathname)) return;
    e.preventDefault();
    if (audioEnabled) uiTone("navigate");
    body.classList.add("nav-exit");
    setTimeout(() => location.href = url.href, reducedMotion ? 0 : 300);
  });

  let ctx, master;
  let audioEnabled = false;
  let audioUnavailable = !(window.AudioContext || window.webkitAudioContext);
  let lastToneAt = 0;

  function readSoundPreference() {
    try { return localStorage.getItem("eoraSounds") === "on"; }
    catch (error) { return false; }
  }

  function writeSoundPreference(value) {
    try { localStorage.setItem("eoraSounds", value); }
    catch (error) { /* Storage can be blocked; the choice still applies to this visit. */ }
  }

  function soundLevel() {
    const slider = q("#volumeControl");
    const raw = slider ? Number(slider.value) : 22;
    const normalized = Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) / 100 : .22;
    return Math.min(.045, Math.max(.004, normalized * .04));
  }

  function markAudioUnavailable() {
    audioUnavailable = true;
    audioEnabled = false;
    const button = q("#audioToggle");
    const label = q("#audioLabel");
    if (!button || !label) return;
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Interaction sounds are unavailable in this browser");
    label.textContent = "Sounds unavailable";
  }

  function ensureContext() {
    if (audioUnavailable) return null;
    if (ctx) return ctx;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      markAudioUnavailable();
      return null;
    }
    try {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = soundLevel();
      master.connect(ctx.destination);
      return ctx;
    } catch (error) {
      markAudioUnavailable();
      return null;
    }
  }

  function syncAudioUI() {
    const button = q("#audioToggle");
    const label = q("#audioLabel");
    if (!button || !label || audioUnavailable) return;
    button.setAttribute("aria-pressed", String(audioEnabled));
    button.setAttribute("aria-label", audioEnabled ? "Turn off interaction sounds" : "Turn on interaction sounds");
    label.textContent = audioEnabled ? "Sounds on" : "Sounds off";
  }

  function startAudio() {
    if (audioUnavailable) return;
    audioEnabled = true;
    writeSoundPreference("on");
    syncAudioUI();
    uiTone("confirm");
  }

  function stopAudio() {
    audioEnabled = false;
    writeSoundPreference("off");
    if (ctx && master) {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(Math.max(master.gain.value, .0001), ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .05);
      } catch (error) { /* Ignore a closed audio graph. */ }
    }
    syncAudioUI();
  }

  function uiTone(type="click") {
    if (!audioEnabled || audioUnavailable) return;
    if (type === "hover" || type === "scroll") return;
    const nowMs = performance.now();
    if (nowMs - lastToneAt < 90) return;
    const activeContext = ensureContext();
    if (!activeContext) return;
    if (activeContext.state === "suspended") activeContext.resume().catch(() => {});
    lastToneAt = nowMs;
    try {
      const oscillator = activeContext.createOscillator();
      const gain = activeContext.createGain();
      const frequencyMap = {navigate:494, click:392, confirm:523, menu:440};
      oscillator.type = "sine";
      oscillator.frequency.value = frequencyMap[type] || 392;
      const now = activeContext.currentTime;
      const peak = soundLevel();
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, now + .08);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + .1);
    } catch (error) {
      markAudioUnavailable();
    }
  }

  audioEnabled = readSoundPreference();
  if (audioUnavailable) markAudioUnavailable();
  else syncAudioUI();

  q("#audioToggle").addEventListener("click", () => audioEnabled ? stopAudio() : startAudio());
  q("#volumeControl").addEventListener("input", () => {
    try { localStorage.setItem("eoraVolume", q("#volumeControl").value); }
    catch (error) { /* Preference cannot be stored. */ }
    if (!ctx || !master) return;
    master.gain.setTargetAtTime(audioEnabled ? soundLevel() : .0001, ctx.currentTime, .05);
  });

  document.addEventListener("click", e => {
    if (!audioEnabled || e.target.closest("#audioToggle, a")) return;
    if (e.target.closest("button")) uiTone("click");
  });

  const shortcutPanel = q("#shortcutPanel");
  q("#shortcutButton").addEventListener("click", () => shortcutPanel.classList.toggle("is-open"));
  addEventListener("keydown", e => {
    const typing = e.target.closest && e.target.closest("input, textarea, select, [contenteditable=true]");
    if (typing) return;
    if ((e.key === "m" || e.key === "M") && !e.metaKey && !e.ctrlKey && !e.altKey) {
      if (!audioUnavailable) audioEnabled ? stopAudio() : startAudio();
    }
    if (e.key === "h" || e.key === "H") location.href = "/";
    if (e.key === "?") shortcutPanel.classList.toggle("is-open");
  });

  window.EORA_AUDIO = { tone: uiTone, enabled: () => audioEnabled && !audioUnavailable };

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
    recruiter:"Recruiter", projects:"Projects", experience:"Experience", resume:"Résumé",
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
    } else {
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
    animateCounts();
  }

  function animateCounts() {
    [...main.querySelectorAll("[data-count]")].forEach(el => {
      if (el.dataset.countReady === "1") return;
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      el.dataset.countReady = "1";
      if (reducedMotion) {
        el.textContent = String(target);
        return;
      }
      let done = false;
      const run = () => {
        if (done) return;
        done = true;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / 1000, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(entries => {
          if (entries[0] && entries[0].isIntersecting) {
            run();
            io.disconnect();
          }
        }, {threshold: 0.2});
        io.observe(el);
        // If already on-screen (common after SPA navigation), start immediately.
        const rect = el.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) run();
      } else {
        run();
      }
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
    if (window.EORA_AUDIO?.enabled?.()) window.EORA_AUDIO.tone("navigate");
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


/* XMB-inspired navigation rail
 * A horizontal, keyboard-friendly category and item strip inspired by
 * console media menus without reproducing proprietary artwork.
 */
(() => {
  "use strict";
  const header = document.querySelector("#siteHeader");
  if (!header || document.querySelector("#xmbShell")) return;

  const groups = [
    {
      id: "home", label: "Home", glyph: "⌂",
      items: [["Overview", "/", "Portfolio overview"]]
    },
    {
      id: "projects", label: "Projects", glyph: "◆",
      items: [
        ["All projects", "/projects/", "Technical project index"],
        ["EORA Toolkit", "/projects/eora-toolkit/", "Windows diagnostics and evidence reporting"],
        ["Eora Lab", "/projects/eora-lab/", "Windows Server infrastructure lab"],
        ["Healthcare identity", "/projects/healthcare-identity/", "Role-based access design"],
        ["Wireless security", "/projects/wireless-security/", "Authorized Wi-Fi research"]
      ]
    },
    {
      id: "career", label: "Career", glyph: "▣",
      items: [
        ["Experience", "/experience/", "Healthcare, field, and public-sector operations"],
        ["Résumé", "/resume/", "Accessible résumé and PDF"],
        ["Recruiter briefing", "/recruiter/", "A concise technical profile"],
        ["Capabilities", "/capabilities/", "Systems and security focus areas"]
      ]
    },
    {
      id: "proof", label: "Proof", glyph: "✓",
      items: [
        ["Credentials", "/credentials/", "Certifications and education"],
        ["Education", "/education/", "Academic record"]
      ]
    },
    {
      id: "about", label: "About", glyph: "i",
      items: [
        ["About Eora Labs", "/about/", "Purpose and operating philosophy"],
        ["Contact", "/contact/", "Start a conversation"]
      ]
    }
  ];

  const shell = document.createElement("section");
  shell.id = "xmbShell";
  shell.className = "xmb-shell";
  shell.setAttribute("aria-label", "Eora Labs quick navigation");
  shell.innerHTML = `
    <div class="xmb-category-wrap">
      <p class="xmb-kicker">EORA LABS / QUICK NAVIGATION</p>
      <div class="xmb-categories" role="tablist" aria-label="Navigation categories"></div>
    </div>
    <div class="xmb-items" role="list" aria-live="polite"></div>
  `;
  header.insertAdjacentElement("afterend", shell);

  const categories = shell.querySelector(".xmb-categories");
  const items = shell.querySelector(".xmb-items");
  let selectedGroup = groups[0];

  function currentGroup() {
    const path = location.pathname;
    if (path.startsWith("/projects/")) return groups.find(group => group.id === "projects");
    if (path.startsWith("/experience/") || path.startsWith("/resume/") || path.startsWith("/recruiter/") || path.startsWith("/capabilities/")) return groups.find(group => group.id === "career");
    if (path.startsWith("/credentials/") || path.startsWith("/education/")) return groups.find(group => group.id === "proof");
    if (path.startsWith("/about/") || path.startsWith("/contact/")) return groups.find(group => group.id === "about");
    return groups[0];
  }

  function renderCategories() {
    categories.innerHTML = groups.map((group, index) => `
      <button class="xmb-category" type="button" role="tab" data-group="${group.id}" aria-selected="${group.id === selectedGroup.id}">
        <span class="xmb-glyph" aria-hidden="true">${group.glyph}</span>
        <span>${group.label}</span>
        <small>${String(index + 1).padStart(2, "0")}</small>
      </button>`).join("");
  }

  function renderItems() {
    items.innerHTML = selectedGroup.items.map(([label, href, description], index) => `
      <a class="xmb-item" href="${href}" role="listitem">
        <span class="xmb-item-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="xmb-item-copy"><strong>${label}</strong><small>${description}</small></span>
        <span class="xmb-arrow" aria-hidden="true">↗</span>
      </a>`).join("");
  }

  function selectGroup(id) {
    selectedGroup = groups.find(group => group.id === id) || groups[0];
    renderCategories();
    renderItems();
    shell.classList.remove("xmb-refresh");
    requestAnimationFrame(() => shell.classList.add("xmb-refresh"));
    shell.querySelector(`[data-group="${selectedGroup.id}"]`)?.focus({preventScroll:true});
  }

  categories.addEventListener("click", event => {
    const button = event.target.closest("[data-group]");
    if (button) selectGroup(button.dataset.group);
  });

  categories.addEventListener("keydown", event => {
    const buttons = [...categories.querySelectorAll(".xmb-category")];
    const index = buttons.indexOf(event.target);
    if (index < 0) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      buttons[(index + 1) % buttons.length].focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      buttons[(index - 1 + buttons.length) % buttons.length].focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectGroup(event.target.dataset.group);
    }
  });

  selectedGroup = currentGroup();
  renderCategories();
  renderItems();

  addEventListener("popstate", () => {
    selectedGroup = currentGroup();
    renderCategories();
    renderItems();
  });
})();


/* Motion and interaction sound polish */
(() => {
  "use strict";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ripple(event) {
    if (reducedMotion) return;
    const target = event.target.closest("a,button,.xmb-item,.card,.page-link");
    if (!target || target.closest(".audio-dock")) return;
    const rect = target.getBoundingClientRect();
    const dot = document.createElement("i");
    dot.className = "interaction-ripple";
    dot.style.left = `${event.clientX - rect.left}px`;
    dot.style.top = `${event.clientY - rect.top}px`;
    target.appendChild(dot);
    setTimeout(() => dot.remove(), 620);
  }

  document.addEventListener("pointerdown", ripple, {passive:true});

  if (reducedMotion || !matchMedia("(pointer:fine)").matches) return;

  document.addEventListener("pointermove", event => {
    const target = event.target.closest("a,button,.xmb-item,.card,.page-link");
    if (target) {
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / target.offsetWidth) * 100}%`);
      target.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / target.offsetHeight) * 100}%`);
    }

    const rail = document.querySelector(".xmb-shell");
    if (rail && !target?.closest(".xmb-shell")) {
      rail.style.setProperty("--cursor-drift-x", `${(event.clientX / innerWidth - .5) * 1.4}px`);
      rail.style.setProperty("--cursor-drift-y", `${(event.clientY / innerHeight - .5) * 1.4}px`);
    }
  }, {passive:true});
})();


/* Editorial portfolio theme toggle */
(() => {
  document.body.classList.add("editorial-theme");
})();

