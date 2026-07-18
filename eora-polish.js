(() => {
  "use strict";

  const pages = window.EORA_PAGES;
  if (pages) {
    if (pages.home) {
      pages.home.eyebrow = "Langston Brown · Systems · Security · Infrastructure";
      pages.home.lede = "Eora Labs is where I document the systems I build, the operational lessons I have earned, and the direction I am taking across infrastructure, identity, cybersecurity, and healthcare IT.";
    }

    if (pages.recruiter) {
      pages.recruiter.lede = "I am a Memphis-based information systems professional with more than seven years of experience across healthcare, customer field environments, and county government. This briefing connects that operating history to the systems, identity, endpoint, and security work I am pursuing next.";
    }

    if (pages.about) {
      pages.about.lede = "Eora Labs is my living engineering record: a place to show what I have supported, what I am building, how I reason about risk, and how I am progressing toward greater systems and security ownership.";
    }
  }

  // Remove every narration path before the main application handles it.
  const blockNarrationKey = event => {
    const target = event.target;
    const isTyping = target && target.matches && target.matches("input, textarea, select, [contenteditable='true']");
    if (!isTyping && event.key && event.key.toLowerCase() === "g") {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  window.addEventListener("keydown", blockNarrationKey, true);

  // Preserve browser user activation while entering with audio, but bypass the old spoken welcome.
  document.addEventListener("click", event => {
    const enterAudio = event.target.closest && event.target.closest("#enterAudio");
    if (!enterAudio) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    localStorage.setItem("eoraAudio", "on");
    document.querySelector("#enterSilent")?.click();

    const audioToggle = document.querySelector("#audioToggle");
    if (audioToggle && audioToggle.getAttribute("aria-pressed") !== "true") {
      audioToggle.click();
    }
  }, true);

  document.addEventListener("DOMContentLoaded", () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    document.querySelector("#voiceGuide")?.remove();

    const audioHint = document.querySelector(".audio-hint");
    if (audioHint) {
      audioHint.textContent = "Generative ambient music and subtle interface feedback. Use the audio control at any time.";
    }

    const shortcutPanel = document.querySelector("#shortcutPanel");
    if (shortcutPanel) {
      [...shortcutPanel.querySelectorAll("p")].forEach(item => {
        if (/voice guide/i.test(item.textContent || "")) item.remove();
      });
    }

    const loaderKicker = document.querySelector(".loader-kicker");
    if (loaderKicker) loaderKicker.textContent = "Langston Brown · Systems Operations";

    const enterAudio = document.querySelector("#enterAudio");
    if (enterAudio) enterAudio.textContent = "Enter Eora Labs · Audio on";

    const enterSilent = document.querySelector("#enterSilent");
    if (enterSilent) enterSilent.textContent = "Enter silently";

    const volume = document.querySelector("#volumeControl");
    if (volume) {
      const storedVolume = Number(localStorage.getItem("eoraVolume"));
      volume.value = Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 100 ? String(storedVolume) : "48";
      volume.addEventListener("input", () => localStorage.setItem("eoraVolume", volume.value));
    }

    const footerCopy = document.querySelector(".site-footer > div:first-child > p");
    if (footerCopy) {
      footerCopy.innerHTML = `<span class="footer-credit-line">Crafted by Langston Brown.</span><span class="footer-credit-line">Developed with the assistance of OpenAI ChatGPT.</span>`;
    }

    const style = document.createElement("style");
    style.textContent = `
      .footer-credit-line{display:block;margin-top:.22rem}
      .footer-credit-line:first-child{color:var(--text)}
      .footer-credit-line:last-child{color:var(--muted);font-size:.9em}
      .audio-dock{box-shadow:0 14px 40px rgba(0,0,0,.34),0 0 0 1px rgba(104,220,255,.08),0 0 28px rgba(104,220,255,.08)}
      .audio-button[aria-pressed="true"]{text-shadow:0 0 16px rgba(104,220,255,.4)}
      .loader-actions.is-ready #enterAudio{box-shadow:0 0 0 1px rgba(104,220,255,.16),0 0 34px rgba(104,220,255,.14)}
    `;
    document.head.appendChild(style);
  });
})();
