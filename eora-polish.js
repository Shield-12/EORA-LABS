(() => {
  "use strict";

  const pages = window.EORA_PAGES;
  if (pages) {
    if (pages.home) {
      pages.home.eyebrow = "Langston Brown · Systems · Security · Infrastructure";
      pages.home.lede = "Eora Labs is where I document the systems I build, the operational lessons I have earned, and the direction I am taking across infrastructure, identity, cybersecurity, and healthcare IT.";
      pages.home.actions = [["/projects/eora-lab/", "Open Eora Lab", "primary"], ["/recruiter/", "Recruiter view", "secondary"], ["/services/", "Pilot services", "secondary"]];
    }
    if (pages.recruiter) {
      pages.recruiter.lede = "I am a Memphis-based information systems professional with more than seven years of experience across healthcare, customer field environments, and county government. This briefing connects that operating history to the systems, identity, endpoint, and security work I am building toward.";
    }
    if (pages.projects) {
      pages.projects.headline = "Labs, case studies, and services that show <em>how I think.</em>";
      pages.projects.lede = "These projects document implementation decisions, constraints, mistakes, validations, and next steps—not just finished screenshots.";
    }
    if (pages["project-eora"]) {
      pages["project-eora"].headline = "Building a Windows Server 2025 enterprise lab, <em>one defensible decision at a time.</em>";
      pages["project-eora"].lede = "Eora Lab is an active Windows Server 2025 environment used to turn certification objectives into working infrastructure: Active Directory, DNS, DHCP, Group Policy, Hyper-V, file services, PowerShell administration, and an expanding security-monitoring stack.";
      pages["project-eora"].content += `
        <section class="section band"><div class="inner">
          <header class="section-heading reveal"><div><p class="eyebrow">Build log · July 30, 2026</p><h2>Security monitoring is moving from local logs to centralized telemetry.</h2></div><p>This phase is being implemented incrementally on the existing lab hardware. Current milestones are published in the repository build log so the lab remains auditable as it grows.</p></header>
          <div class="cards">
            <article class="card wide reveal" data-tilt>
              <span class="status current">SEC-001</span>
              <h3>Centralized event collection foundation</h3>
              <p>Initialized Windows Event Collector on Windows Server 2025, verified the Windows Event Collector service (<code>Wecsvc</code>) and Windows Remote Management (<code>WinRM</code>) are running automatically, and confirmed the <code>ForwardedEvents</code> channel is enabled.</p>
              <ul class="tag-list"><li>Windows Server 2025</li><li>WEC</li><li>WinRM</li><li>Event Viewer</li><li>PowerShell</li></ul>
            </article>
            <article class="card wide reveal" data-tilt>
              <span class="status current">SEC-002</span>
              <h3>Security telemetry baseline</h3>
              <p>Captured the server's current audit and endpoint-security posture before making policy changes. Microsoft Defender antivirus, antispyware, real-time protection, behavior monitoring, IOAV protection, and network inspection were confirmed enabled.</p>
              <p>Verified active operational channels with 1,085 PowerShell events, 4,299 Defender events, and 1,690 Windows Firewall events at the time of collection. All Domain, Private, and Public firewall profiles were enabled.</p>
              <p>The audit baseline also identified deliberate next-step gaps including Process Creation, Sensitive Privilege Use, Directory Service Changes, Group Membership, and additional policy-change auditing.</p>
              <ul class="tag-list"><li>Audit Policy</li><li>Defender</li><li>PowerShell</li><li>Windows Firewall</li><li>Event Logs</li></ul>
            </article>
            <article class="card reveal" data-tilt>
              <p class="card-number">GPO</p>
              <h3>Group Policy before one-off changes</h3>
              <p>Next implementation phase: review the existing EORA baseline security GPO, then centrally configure high-value audit categories and firewall logging through Group Policy instead of one-off local changes.</p>
            </article>
            <article class="card reveal" data-tilt>
              <p class="card-number">WEF</p>
              <h3>Forward selected events</h3>
              <p>Planned validation: forward selected events from domain-managed systems into the collector and confirm end-to-end delivery in the centralized event log.</p>
            </article>
          </div>
          <div class="card-actions reveal" style="margin-top:1.25rem"><a class="button secondary small" target="_blank" rel="noreferrer" href="https://github.com/Shield-12/EORA-LABS/blob/main/docs/eora-security-build-log.md">Read the full security build log on GitHub</a></div>
        </div></section>`;
    }
  }

  // Remove every narration path before the main application handles it.
  const stopVoice = () => {
    try {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } catch (_) {}
  };

  const shouldBlockVoiceButton = (target) => {
    const isTyping = target && target.matches && target.matches("input, textarea, select, [contenteditable='true']");
    return !isTyping;
  };

  document.addEventListener("click", (event) => {
    if (event.target && event.target.closest && event.target.closest("#voiceGuide")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      stopVoice();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if ((event.key || "").toLowerCase() === "g" && shouldBlockVoiceButton(event.target)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      stopVoice();
    }
  }, true);

  const neuterVoiceButton = () => {
    const btn = document.getElementById("voiceGuide");
    if (!btn) return;
    btn.setAttribute("aria-label", "Voice guide disabled");
    btn.setAttribute("title", "Voice guide disabled");
    btn.disabled = true;
    btn.style.display = "none";
    btn.onclick = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      return false;
    };
  };

  const updateAudioLanguage = () => {
    const audioHint = document.querySelector(".audio-hint");
    if (audioHint) {
      audioHint.textContent = "Generative ambient music and subtle interface feedback. Use the audio control at any time.";
    }
  };

  const tuneShell = () => {
    neuterVoiceButton();
    updateAudioLanguage();

    const loaderKicker = document.querySelector(".loader-kicker");
    if (loaderKicker) loaderKicker.textContent = "Langston Brown · Systems Operations";

    const loaderTitle = document.querySelector(".loader-title");
    if (loaderTitle) loaderTitle.textContent = "Eora Labs";

    const loaderMeta = document.querySelector(".loader-meta");
    if (loaderMeta) loaderMeta.textContent = "Loading systems portfolio";

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const footer = document.querySelector(".site-footer .inner > div:first-child p");
    if (footer) {
      footer.innerHTML = `<span class="footer-credit-line">Crafted by me, Langston Brown.</span><span class="footer-credit-line">Developed with the assistance of OpenAI ChatGPT.</span>`;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tuneShell, { once: true });
  } else {
    tuneShell();
  }

  const observer = new MutationObserver(() => tuneShell());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  const style = document.createElement("style");
  style.textContent = `
    #voiceGuide{display:none!important}
    .footer-credit-line{display:block;color:rgba(231,238,249,.62)}
  `;
  document.head.appendChild(style);
})();
