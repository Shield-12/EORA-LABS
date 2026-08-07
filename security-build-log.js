(() => {
  "use strict";

  const page = window.EORA_PAGES?.["project-eora"];
  if (!page) return;

  page.content += `
    <section class="section"><div class="inner">
      <header class="section-heading reveal">
        <div>
          <p class="eyebrow">Security telemetry snapshot · August 7, 2026</p>
          <h2>Baseline first. Then harden deliberately.</h2>
        </div>
        <p>Before changing audit, firewall, and identity policy, I inventoried the current Windows Server 2025 security posture so later changes can be measured against a known state.</p>
      </header>

      <div class="cards">
        <article class="card wide reveal" data-tilt>
          <span class="status current">Validated</span>
          <h3>Defender and operational logging</h3>
          <p>Microsoft Defender Antivirus, antispyware, real-time protection, behavior monitoring, IOAV protection, and Network Inspection System were verified enabled. Operational logs were also confirmed active for PowerShell, Microsoft Defender, and Windows Firewall.</p>
          <ul class="tag-list"><li>Defender</li><li>PowerShell</li><li>Event Viewer</li><li>Windows Firewall</li></ul>
        </article>

        <article class="card reveal" data-tilt>
          <p class="card-number">AUDIT</p>
          <h3>Audit-policy gaps identified</h3>
          <p>The baseline showed several high-value controls not yet enabled, including Process Creation, Sensitive Privilege Use, Directory Service Changes, Group Membership, and selected policy-change auditing. These are being evaluated for centralized Group Policy deployment rather than enabled indiscriminately.</p>
        </article>

        <article class="card reveal" data-tilt>
          <p class="card-number">IDENTITY</p>
          <h3>Active Directory password and lockout baseline</h3>
          <p>I documented an initial authentication hardening pass: complexity enabled, reversible encryption disabled, password history configured, and account lockout set to five invalid attempts with a 30-minute lockout window. Client validation remains in progress.</p>
          <div class="card-actions"><a class="button secondary small" target="_blank" rel="noreferrer" href="https://github.com/Shield-12/EORA-LABS/blob/main/docs/eora-active-directory-password-policy.md">View identity baseline</a></div>
        </article>

        <article class="card reveal" data-tilt>
          <p class="card-number">FIREWALL</p>
          <h3>Firewall enforcement present; traffic logging absent</h3>
          <p>Domain, Private, and Public firewall profiles were verified enabled. Connection logging for allowed and blocked traffic was not enabled, creating a clear next-step opportunity for a managed firewall logging baseline.</p>
        </article>

        <article class="card wide reveal" data-tilt>
          <p class="card-number">NOTES</p>
          <h3>August 7 working notes</h3>
          <p>I published the session notes as an engineering record: first-person portfolio direction, lab topology, identity-baseline decisions, the domain-controller role-separation lesson, and the remaining client-validation steps.</p>
          <div class="card-actions"><a class="button secondary small" target="_blank" rel="noreferrer" href="https://github.com/Shield-12/EORA-LABS/blob/main/docs/eoralabs-session-notes-2026-08-07.md">View session notes</a></div>
        </article>
      </div>

      <div class="callout reveal" style="margin-top:1rem">
        <strong>Engineering record</strong>
        <p>The repository build log preserves the commands, observed state, implementation constraints, and next actions behind this phase of the lab.</p>
        <div class="card-actions"><a class="button secondary small" target="_blank" rel="noreferrer" href="https://github.com/Shield-12/EORA-LABS/blob/main/docs/eora-security-build-log.md">View repository build log</a></div>
      </div>
    </div></section>`;
})();
