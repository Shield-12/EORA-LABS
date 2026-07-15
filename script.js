(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
    observer.observe(element);
  });

  const soundToggle = document.getElementById("soundToggle");
  const soundLabel = document.getElementById("soundLabel");
  let audioContext = null;
  let soundsEnabled = localStorage.getItem("signalSoundsEnabled") === "true";

  function getAudioContext() {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    if (!audioContext) audioContext = new Context();
    return audioContext;
  }

  function playTone(ctx, frequency, startTime, duration, gainLevel) {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainLevel, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.05);
  }

  function playStartupChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    ctx.resume();

    const now = ctx.currentTime + 0.03;
    playTone(ctx, 261.63, now, 1.15, 0.025);
    playTone(ctx, 329.63, now + 0.03, 1.1, 0.025);
    playTone(ctx, 392.0, now + 0.06, 1.05, 0.022);
    playTone(ctx, 523.25, now + 0.1, 0.95, 0.018);
  }

  function playClick() {
    const ctx = getAudioContext();
    if (!ctx) return;
    ctx.resume();

    const now = ctx.currentTime;
    playTone(ctx, 880, now, 0.08, 0.012);
    playTone(ctx, 1320, now + 0.025, 0.06, 0.008);
  }

  function refreshSoundToggle() {
    if (!soundToggle || !soundLabel) return;
    soundToggle.classList.toggle("is-on", soundsEnabled);
    soundToggle.setAttribute("aria-pressed", String(soundsEnabled));
    soundToggle.setAttribute(
      "aria-label",
      soundsEnabled ? "Disable interface sounds" : "Enable interface sounds"
    );
    soundLabel.textContent = soundsEnabled ? "Sound: On" : "Sound: Off";
  }

  if (soundToggle) {
    refreshSoundToggle();

    soundToggle.addEventListener("click", () => {
      soundsEnabled = !soundsEnabled;
      localStorage.setItem("signalSoundsEnabled", String(soundsEnabled));
      refreshSoundToggle();
      if (soundsEnabled) playStartupChime();
    });
  }

  document.addEventListener(
    "click",
    (event) => {
      if (!soundsEnabled) return;
      const target = event.target;
      if (!target || !target.closest) return;
      if (target.closest("#soundToggle")) return;
      if (target.closest("a, button, summary")) playClick();
    },
    true
  );
})();
