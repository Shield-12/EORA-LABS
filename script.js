(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const intro = document.getElementById("intro");
  const introStatus = document.getElementById("introStatus");
  const introActions = document.getElementById("introActions");
  const enterSound = document.getElementById("enterSound");
  const enterMuted = document.getElementById("enterMuted");
  const audioToggle = document.getElementById("audioToggle");
  const audioLabel = document.getElementById("audioLabel");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const siteHeader = document.getElementById("siteHeader");
  const cursorGlow = document.getElementById("cursorGlow");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  window.setTimeout(() => {
    if (introStatus) introStatus.textContent = "Interface ready.";
    if (introActions) introActions.hidden = false;
  }, reducedMotion ? 80 : 1850);

  let audioContext = null;
  let masterGain = null;
  let ambientGain = null;
  let ambientStarted = false;
  let audioEnabled = false;

  function getAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      ambientGain = audioContext.createGain();
      masterGain.gain.value = 0.0001;
      ambientGain.gain.value = 0.12;
      ambientGain.connect(masterGain);
      masterGain.connect(audioContext.destination);
    }
    return audioContext;
  }

  function rampMaster(target, duration = 0.4) {
    const context = getAudioContext();
    if (!context || !masterGain) return;
    const now = context.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), now);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(target, 0.0001), now + duration);
  }

  function startAmbient() {
    const context = getAudioContext();
    if (!context || ambientStarted) return;
    ambientStarted = true;

    [55, 82.41, 110].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();

      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 2 ? 4 : index === 0 ? -3 : 0;
      filter.type = "lowpass";
      filter.frequency.value = 420 + index * 110;
      filter.Q.value = 0.55;
      gain.gain.value = [0.11, 0.065, 0.035][index];
      lfo.type = "sine";
      lfo.frequency.value = 0.035 + index * 0.012;
      lfoGain.gain.value = gain.gain.value * 0.32;

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(ambientGain);
      oscillator.start();
      lfo.start();
    });
  }

  function playTone(frequency = 760, duration = 0.08, volume = 0.025, type = "sine", delay = 0) {
    if (!audioEnabled) return;
    const context = getAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playEnterChime() {
    playTone(293.66, 0.9, 0.028, "sine", 0);
    playTone(369.99, 0.85, 0.024, "sine", 0.05);
    playTone(440, 0.8, 0.022, "sine", 0.1);
    playTone(587.33, 0.65, 0.018, "triangle", 0.16);
  }

  function updateAudioUI() {
    if (!audioToggle || !audioLabel) return;
    audioToggle.setAttribute("aria-pressed", String(audioEnabled));
    audioToggle.setAttribute("aria-label", audioEnabled ? "Mute audio" : "Enable audio");
    audioLabel.textContent = audioEnabled ? "Audio on" : "Audio off";
  }

  async function setAudio(enabled, playAnnouncement = true) {
    audioEnabled = Boolean(enabled);
    localStorage.setItem("eoraAudioEnabled", String(audioEnabled));
    const context = getAudioContext();
    if (context && context.state === "suspended") await context.resume();

    if (audioEnabled) {
      startAmbient();
      rampMaster(0.72, 0.55);
      if (playAnnouncement) playEnterChime();
    } else {
      rampMaster(0.0001, 0.35);
    }
    updateAudioUI();
  }

  function dismissIntro(withSound) {
    setAudio(withSound, withSound);
    intro?.classList.add("is-exiting");
    body.classList.remove("intro-open");
    window.setTimeout(() => {
      if (intro) intro.hidden = true;
    }, reducedMotion ? 0 : 720);
  }

  enterSound?.addEventListener("click", () => dismissIntro(true));
  enterMuted?.addEventListener("click", () => dismissIntro(false));
  audioToggle?.addEventListener("click", () => setAudio(!audioEnabled, !audioEnabled));
  updateAudioUI();

  document.addEventListener("click", (event) => {
    if (!audioEnabled) return;
    const target = event.target instanceof Element ? event.target.closest("a, button, summary") : null;
    if (!target || target.matches("#audioToggle, #enterSound")) return;
    playTone(target.tagName === "SUMMARY" ? 520 : 820, 0.07, 0.018);
  }, true);

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menuToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      }
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  let metricsAnimated = false;
  function animateMetrics() {
    if (metricsAnimated) return;
    metricsAnimated = true;
    document.querySelectorAll("[data-count]").forEach((element) => {
      const target = Number(element.getAttribute("data-count")) || 0;
      if (reducedMotion) {
        element.textContent = `${target}+`;
        return;
      }
      const start = performance.now();
      const duration = 900;
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(target * eased)}+`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  const metrics = document.querySelector(".hero-metrics");
  if (metrics && "IntersectionObserver" in window) {
    const metricObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateMetrics();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    metricObserver.observe(metrics);
  } else {
    animateMetrics();
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  function updateNavigation() {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) current = `#${section.id}`;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === current));
  }

  updateNavigation();
  window.addEventListener("scroll", updateNavigation, { passive: true });

  const canTilt = !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canTilt) {
    document.querySelectorAll("[data-tilt]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 6;
        const rotateX = (0.5 - y) * 6;
        element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        element.style.setProperty("--shine-x", `${x * 100}%`);
        element.style.setProperty("--shine-y", `${y * 100}%`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
        element.style.removeProperty("--shine-x");
        element.style.removeProperty("--shine-y");
      });
    });

    document.addEventListener("pointermove", (event) => {
      body.classList.add("pointer-active");
      if (cursorGlow) {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
      }
    }, { passive: true });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav?.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.focus();
    }
  });
})();
