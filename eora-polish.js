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

  const firstPersonRewrites = [
    ["Eora Labs documents Langston Brown's progression from frontline healthcare and public-sector IT support into systems administration, identity, cybersecurity, and enterprise infrastructure.", "Eora Labs documents my progression from frontline healthcare and public-sector IT support into systems administration, identity, cybersecurity, and enterprise infrastructure."],
    ["Welcome to Eora Labs. This portfolio presents Langston Brown's professional experience, certifications, technical projects, and operating philosophy in systems and security.", "Welcome to Eora Labs. This portfolio presents my professional experience, certifications, technical projects, and operating philosophy in systems and security."],
    ["Langston Brown is a Memphis-based information systems professional with more than seven years of IT experience across healthcare, customer field environments, and county government.", "I am a Memphis-based information systems professional with more than seven years of IT experience across healthcare, customer field environments, and county government."],
    ["This recruiter briefing summarizes Langston Brown's experience, credentials, current technical lab, and target roles in systems administration, identity, endpoint administration, cybersecurity operations, and healthcare information technology.", "This recruiter briefing summarizes my experience, credentials, current technical lab, and target roles in systems administration, identity, endpoint administration, cybersecurity operations, and healthcare information technology."],
    ["Langston's background began with hands-on support in HIPAA-regulated clinical settings, expanded into field engineering and customer deployments, and continued in enterprise public-sector service delivery.", "My background began with hands-on support in HIPAA-regulated clinical settings, expanded into field engineering and customer deployments, and continued in enterprise public-sector service delivery."],
    ["The portfolio contains dedicated pages for each employer, project, credential, and education milestone so a reviewer can move from claims to supporting context.", "I maintain dedicated pages for each employer, project, credential, and education milestone so a reviewer can move from claims to supporting context."],
    ["At Shelby County Government, Langston supported enterprise users across Active Directory, Microsoft 365, endpoints, mobile devices, printers, account access, dispatch, documentation, and on-call operations.", "At Shelby County Government, I supported enterprise users across Active Directory, Microsoft 365, endpoints, mobile devices, printers, account access, dispatch, documentation, and on-call operations."],
    ["This role demonstrates enterprise service delivery and operational discipline. It should not be misrepresented as direct ownership of county servers or architecture.", "I use this role to demonstrate enterprise service delivery and operational discipline. I do not present it as direct ownership of county servers or architecture."],
    ["At eResources, Langston worked as an IT Field Engineer deploying and supporting Windows endpoints and server environments while troubleshooting DNS, VPN, firewall, application, and network connectivity problems.", "At eResources, I worked as an IT Field Engineer deploying and supporting Windows endpoints and server environments while troubleshooting DNS, VPN, firewall, application, and network connectivity problems."],
    ["At Alliance Healthcare Services, Langston supported HIPAA-regulated clinical environments, user access, endpoints, mobile devices, Citrix thin clients, clinical applications, printers, and after-hours incidents.", "At Alliance Healthcare Services, I supported HIPAA-regulated clinical environments, user access, endpoints, mobile devices, Citrix thin clients, clinical applications, printers, and after-hours incidents."],
    ["Langston earned the CompTIA Cybersecurity Analyst Plus certification on May tenth, 2025. The current cycle runs through May tenth, 2028.", "I earned the CompTIA Cybersecurity Analyst Plus certification on May tenth, 2025. The current cycle runs through May tenth, 2028."],
    ["Langston holds a current CompTIA Security Plus certification based on the SY0-701 exam, earned November seventeenth, 2024 and valid through November seventeenth, 2027.", "I hold a current CompTIA Security Plus certification based on the SY0-701 exam, earned November seventeenth, 2024 and valid through November seventeenth, 2027."],
    ["Langston earned CompTIA Network Plus on December fifteenth, 2023. The supplied credential is current through December fifteenth, 2026.", "I earned CompTIA Network Plus on December fifteenth, 2023. The supplied credential is current through December fifteenth, 2026."],
    ["Langston earned CompTIA A Plus on April twentieth, 2018. The supplied certificate reflects a prior cycle that ended April twentieth, 2021.", "I earned CompTIA A Plus on April twentieth, 2018. The supplied certificate reflects a prior cycle that ended April twentieth, 2021."],
    ["Langston earned CompTIA IT Fundamentals Plus on August sixteenth, 2017, making it the first formal certification milestone in the portfolio.", "I earned CompTIA IT Fundamentals Plus on August sixteenth, 2017, making it the first formal certification milestone in the portfolio."],
    ["Langston has held the ISC2 Certified in Cybersecurity credential since 2024. The current certificate cycle runs through January thirty-first, 2027.", "I have held the ISC2 Certified in Cybersecurity credential since 2024. The current certificate cycle runs through January thirty-first, 2027."],
    ["Langston completed a Bachelor of Business Administration in Management Information Systems at the University of Memphis in 2026.", "I completed a Bachelor of Business Administration in Management Information Systems at the University of Memphis in 2026."],
    ["Langston earned an Associate of Science from Southwest Tennessee Community College on August eleventh, 2022.", "I earned an Associate of Science from Southwest Tennessee Community College on August eleventh, 2022."],
    ["Eora Labs is accepting limited pilot engagements for small organizations in the Memphis area. Services begin with discovery and a written scope rather than a one-size-fits-all infrastructure package.", "Through Eora Labs, I am accepting limited pilot engagements for small organizations in the Memphis area. Services begin with discovery and a written scope rather than a one-size-fits-all infrastructure package."],
    ["Langston Brown brings more than seven years of IT experience across county government, healthcare, field engineering, endpoint operations, Microsoft 365 administration, Active Directory, PowerShell automation, and technical documentation.", "I bring more than seven years of IT experience across county government, healthcare, field engineering, endpoint operations, Microsoft 365 administration, Active Directory, PowerShell automation, and technical documentation."],
    ["Use this page to contact Langston Brown about systems administration, identity, endpoint administration, cybersecurity operations, healthcare information technology, or infrastructure support opportunities.", "Use this page to contact me about systems administration, identity, endpoint administration, cybersecurity operations, healthcare information technology, or infrastructure support opportunities."],
    ["Contact Langston", "Contact me"],
    ["Email Langston", "Email me"],
    ["Langston Brown's certifications and education milestones.", "My certifications and education milestones."],
    ["Langston Brown's", "my"],
    ["Langston's", "my"]
  ];

  const rewriteString = (value) => {
    if (typeof value !== "string") return value;
    return firstPersonRewrites.reduce((current, [from, to]) => current.split(from).join(to), value);
  };

  const rewritePageNarrative = () => {
    if (!pages) return;
    Object.values(pages).forEach((page) => {
      if (!page || typeof page !== "object") return;
      ["lede", "voice", "content", "headline", "eyebrow", "title"].forEach((key) => {
        if (typeof page[key] === "string") page[key] = rewriteString(page[key]);
      });
      if (Array.isArray(page.actions)) {
        page.actions = page.actions.map((action) => Array.isArray(action) ? action.map(rewriteString) : action);
      }
    });
  };

  rewritePageNarrative();

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
      footerCopy.innerHTML = `<span class="footer-credit-line">Crafted by me, Langston Brown.</span><span class="footer-credit-line">Developed with the assistance of OpenAI ChatGPT.</span>`;
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
