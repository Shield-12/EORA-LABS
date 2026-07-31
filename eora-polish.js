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

    if (pages["project-eora"]) {
      pages["project-eora"].lede = "Eora Lab is an active Windows Server 2025 environment used to turn certification objectives into working infrastructure: Active Directory, DNS, DHCP, Group Policy, Hyper-V, file services, PowerShell administration, and an expanding security-monitoring stack.";

      pages["project-eora"].content += `
        <section class="section band"><div class="inner">
          <header class="section-heading reveal"><div><p class="eyebrow">Build log · July 30, 2026</p><h2>Security monitoring is moving from local logs to centralized telemetry.</h2></div><p>This phase is being implemented incrementally on the existing lab hardware. Current milestones are published as validated evidence rather than presented as a finished SOC platform.</p></header>
          <div class="cards">
            <article class="card wide reveal" data-tilt>
              <p class="card-number">SEC-001</p>
              <span class="status current">Validated</span>
              <h3>Windows Event Collector foundation</h3>
              <p>Initialized Windows Event Collector on Windows Server 2025, verified the Windows Event Collector service (<code>Wecsvc</code>) and Windows Remote Management (<code>WinRM</code>) are running automatically, and confirmed the <code>ForwardedEvents</code> channel is enabled.</p>
              <ul class="tag-list"><li>Windows Server 2025</li><li>WEC</li><li>WinRM</li><li>Event Viewer</li><li>PowerShell</li></ul>
            </article>
            <article class="card wide reveal" data-tilt>
              <p class="card-number">SEC-002</p>
              <span class="status current">Validated</span>
              <h3>Security telemetry baseline</h3>
              <p>Captured the server's current audit and endpoint-security posture before making policy changes. Microsoft Defender antivirus, antispyware, real-time protection, behavior monitoring, IOAV protection, and network inspection were confirmed enabled.</p>
              <p>Verified active operational channels with 1,085 PowerShell events, 4,299 Defender events, and 1,690 Windows Firewall events at the time of collection. All Domain, Private, and Public firewall profiles were enabled.</p>
              <p>The audit baseline also identified deliberate next-step gaps including Process Creation, Sensitive Privilege Use, Directory Service Changes, Group Membership, and additional policy-change auditing.</p>
              <ul class="tag-list"><li>Audit Policy</li><li>Defender</li><li>PowerShell</li><li>Windows Firewall</li><li>Event Logs</li></ul>
            </article>
            <article class="card reveal" data-tilt>
              <p class="card-number">SEC-003</p>
              <span class="status">In progress</span>
              <h3>Advanced audit and firewall policy</h3>
              <p>Next implementation phase: review the existing EORA baseline security GPO, then centrally configure high-value audit categories and firewall logging through Group Policy instead of one-off local changes.</p>
              <ul class="tag-list"><li>Group Policy</li><li>Advanced Audit Policy</li><li>Firewall Logging</li></ul>
            </article>
            <article class="card reveal" data-tilt>
              <p class="card-number">SEC-004</p>
              <span class="status">Planned</span>
              <h3>Centralized event forwarding</h3>
              <p>Planned validation: forward selected events from domain-managed systems into the collector and confirm end-to-end delivery in the centralized event log.</p>
              <ul class="tag-list"><li>WEF</li><li>Subscriptions</li><li>Security telemetry</li></ul>
            </article>
          </div>
          <div class="card-actions reveal" style="margin-top:1.25rem"><a class="button secondary small" target="_blank" rel="noreferrer" href="https://github.com/Shield-12/EORA-LABS/blob/main/docs/eora-security-build-log.md">Read the full security build log on GitHub</a></div>
        </div></section>`;
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
      const storedRaw = localStorage.getItem("eoraVolume");
      const storedVolume = storedRaw === null ? Number.NaN : Number(storedRaw);
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