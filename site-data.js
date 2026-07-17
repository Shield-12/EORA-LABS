(() => {
  const nextLinks = (items) => `<section class="section"><div class="inner"><div class="page-links reveal">${items.map(i => `<a class="page-link" href="${i[0]}"><div><strong>${i[1]}</strong><br><span>${i[2]}</span></div><b aria-hidden="true">↗</b></a>`).join("")}</div></div></section>`;
  const detail = (main, side) => `<section class="section"><div class="inner detail-grid"><article class="content-panel reveal">${main}</article><aside class="side-panel reveal" data-tilt>${side}</aside></div></section>`;
  const heroCards = (cards) => `<section class="section"><div class="inner"><div class="cards">${cards.map((c,i)=>`<article class="card ${c.wide?'wide':''} reveal" data-tilt><p class="card-number">${String(i+1).padStart(2,'0')}</p>${c.status?`<span class="${c.statusClass||'pill'}">${c.status}</span>`:''}<h3>${c.title}</h3><p>${c.text}</p>${c.tags?`<ul class="tag-list">${c.tags.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}<div class="card-actions"><a class="button secondary small" href="${c.href}">Open page</a></div><span class="watermark" aria-hidden="true">EL</span></article>`).join('')}</div></div></section>`;

  window.EORA_PAGES = {
    home: {
      title: "Eora Labs",
      eyebrow: "Professional systems portfolio",
      headline: "Infrastructure thinking, <em>built from real operations.</em>",
      lede: "Eora Labs documents Langston Brown's progression from frontline healthcare and public-sector IT support into systems administration, identity, cybersecurity, and enterprise infrastructure.",
      voice: "Welcome to Eora Labs. This portfolio presents Langston Brown's professional experience, certifications, technical projects, and operating philosophy in systems and security.",
      compact: false,
      actions: [["/recruiter/","Recruiter overview","primary"],["/projects/","Explore the work","secondary"],["/contact/","Contact Langston","secondary"]],
      content: `
        <section class="section band"><div class="inner command-grid">
          <div class="command-screen reveal" data-tilt>
            <div class="command-top"><span>EORA // ENVIRONMENT OVERVIEW</span><span class="kicker-row"><i class="live-dot"></i> active build</span></div>
            <div class="orbit-map" aria-hidden="true"><span class="orbit o1"></span><span class="orbit o2"></span><div class="core">EORA CORE</div><span class="node n1">Identity</span><span class="node n2">Endpoints</span><span class="node n3">Security</span><span class="node n4">Network</span></div>
          </div>
          <div class="console-list reveal">
            <article class="console-item"><strong>Professional experience</strong><span>Healthcare IT · Field services · County government</span><div class="progress"><i style="width:92%"></i></div></article>
            <article class="console-item"><strong>Technical direction</strong><span>Systems administration · IAM · Endpoint · Security operations</span><div class="progress"><i style="width:84%"></i></div></article>
            <article class="console-item"><strong>Current lab</strong><span>Windows Server 2025 · Active Directory · DNS · DHCP · Group Policy</span><div class="progress"><i style="width:76%"></i></div></article>
            <article class="console-item"><strong>Credentials</strong><span>CySA+ · Security+ · Network+ · ISC2 CC · A+ · ITF+</span><div class="progress"><i style="width:88%"></i></div></article>
          </div>
        </div></section>
        <section class="section"><div class="inner"><header class="section-heading reveal"><div><p class="eyebrow">Choose a route</p><h2>Explore the portfolio as evidence.</h2></div><p>Every major project, role, credential, and education milestone has its own page. The site is designed for both a fast recruiter scan and a deeper technical review.</p></header>
          <div class="cards">
            <article class="card wide reveal" data-tilt><p class="card-number">01</p><h3>Recruiter briefing</h3><p>A concise executive view of experience, value proposition, technical direction, and target roles.</p><div class="card-actions"><a class="button primary small" href="/recruiter/">Open recruiter view</a></div><span class="watermark">R</span></article>
            <article class="card reveal" data-tilt><p class="card-number">02</p><h3>Projects</h3><p>Architecture, implementation decisions, risk analysis, and lessons learned.</p><div class="card-actions"><a class="button secondary small" href="/projects/">View projects</a></div></article>
            <article class="card reveal" data-tilt><p class="card-number">03</p><h3>Experience</h3><p>Seven-plus years supporting clinical, field-service, and government operations.</p><div class="card-actions"><a class="button secondary small" href="/experience/">View experience</a></div></article>
            <article class="card reveal" data-tilt><p class="card-number">04</p><h3>Credentials</h3><p>Current certifications, prior certification cycles, and education records.</p><div class="card-actions"><a class="button secondary small" href="/credentials/">View credentials</a></div></article>
            <article class="card reveal" data-tilt><p class="card-number">05</p><h3>Capabilities</h3><p>Systems, identity, endpoint, networking, documentation, and security-minded support.</p><div class="card-actions"><a class="button secondary small" href="/capabilities/">View capabilities</a></div></article>
          </div>
        </div></section>
        <section class="section band"><div class="inner"><blockquote class="quote reveal">“A password reset is not only a ticket. It is an identity event, an access-control decision, and a continuity dependency.”</blockquote></div></section>
      `
    },

    recruiter: {
      title: "Recruiter Briefing",
      eyebrow: "Fast professional review",
      headline: "A support foundation moving toward <em>systems and security ownership.</em>",
      lede: "Langston Brown is a Memphis-based information systems professional with more than seven years of IT experience across healthcare, customer field environments, and county government.",
      voice: "This recruiter briefing summarizes Langston Brown's experience, credentials, current technical lab, and target roles in systems administration, identity, endpoint administration, cybersecurity operations, and healthcare information technology.",
      actions: [["/experience/","Review experience","primary"],["/projects/eora-lab/","Open flagship lab","secondary"],["/contact/","Contact","secondary"]],
      content: `
        <section class="section"><div class="inner"><div class="stat-grid reveal"><div class="stat"><strong data-count="7">0</strong><span>Years in IT</span></div><div class="stat"><strong data-count="3">0</strong><span>Operating environments</span></div><div class="stat"><strong data-count="6">0</strong><span>Credentials earned</span></div><div class="stat"><strong data-count="4">0</strong><span>Portfolio case studies</span></div></div></div></section>
        ${detail(`
          <p class="eyebrow">Candidate summary</p><h2>Operationally grounded and deliberately advancing.</h2>
          <p>Langston's background began with hands-on support in HIPAA-regulated clinical settings, expanded into field engineering and customer deployments, and continued in enterprise public-sector service delivery. That history provides practical exposure to the human and business consequences of identity failures, endpoint outages, missing documentation, weak escalation paths, and unreliable infrastructure.</p>
          <h3>What distinguishes the profile</h3>
          <ul class="check-list"><li>Long-term healthcare IT experience supporting real clinical workflows.</li><li>Enterprise support experience involving Active Directory, Microsoft 365, endpoints, mobile devices, printers, access incidents, dispatch, and on-call operations.</li><li>A B.B.A. in Management Information Systems and an A.S. degree.</li><li>Current CySA+, Security+, Network+, and ISC2 Certified in Cybersecurity credentials.</li><li>A portfolio lab that converts certification knowledge into Active Directory, DNS, DHCP, Group Policy, file services, access design, and PowerShell implementation.</li></ul>
          <div class="callout"><strong>Career direction</strong><p>The next step is not another generic support role. The intended move is toward systems administration, identity and access administration, endpoint administration, healthcare infrastructure, or defensive security operations.</p></div>
          <h3>Evidence available on this site</h3><p>The portfolio contains dedicated pages for each employer, project, credential, and education milestone so a reviewer can move from claims to supporting context.</p>
        `,`
          <span class="status current">Available</span><h3>Professional snapshot</h3><dl><div><dt>Location</dt><dd>Memphis, Tennessee</dd></div><div><dt>Education</dt><dd>B.B.A., Management Information Systems</dd></div><div><dt>Primary direction</dt><dd>Systems · IAM · Endpoint · Security</dd></div><div><dt>Preferred environment</dt><dd>Healthcare or enterprise IT</dd></div><div><dt>Flagship project</dt><dd>Eora Enterprise Lab</dd></div></dl>
          <div class="card-actions"><a class="button primary small" href="mailto:langston.brown03@gmail.com">Email Langston</a><a class="button secondary small" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/k0326/">LinkedIn</a></div>
        `)}
        ${nextLinks([["/projects/","Technical projects","See architecture and implementation work"],["/credentials/","Credentials","Review certification status and education"]])}
      `
    },

    experience: {
      title: "Professional Experience",
      eyebrow: "Seven-plus years in information technology",
      headline: "Built from the <em>operational floor up.</em>",
      lede: "The experience record spans clinical support, field engineering, enterprise service delivery, identity incidents, endpoint operations, and after-hours continuity.",
      voice: "The experience section covers three primary roles: Customer Service Technician Two with Shelby County Government, IT Field Engineer with eResources, and IT Technician with Alliance Healthcare Services.",
      actions: [["/recruiter/","Recruiter summary","primary"],["/projects/","Technical projects","secondary"]],
      content: `${heroCards([
        {title:"Shelby County Government",text:"Customer Service Technician II supporting enterprise users, access incidents, Microsoft 365, endpoints, mobile devices, printers, dispatch, documentation, and on-call operations.",tags:["2024–2026","Public sector","Enterprise support"],href:"/experience/shelby-county-government/",wide:true},
        {title:"eResources LLC",text:"IT Field Engineer deploying and supporting Windows environments while troubleshooting DNS, VPN, firewall, application, and network connectivity issues.",tags:["2023","Field engineering","Customer environments"],href:"/experience/eresources/"},
        {title:"Alliance Healthcare Services",text:"IT Technician supporting HIPAA-regulated clinical operations, user access, endpoints, Citrix thin clients, mobile devices, printers, applications, and after-hours incidents.",tags:["2018–2023","Healthcare IT","Clinical continuity"],href:"/experience/alliance-healthcare-services/",wide:true}
      ])}
      ${nextLinks([["/capabilities/","Capability map","See the transferable technical capabilities"],["/contact/","Contact","Discuss a systems or infrastructure opportunity"]])}`
    },

    "experience-scg": {
      title: "Shelby County Government",
      eyebrow: "Customer Service Technician II · 2024–2026",
      headline: "Enterprise support inside a <em>public-sector operating environment.</em>",
      lede: "The role combined service-desk intake, identity and access troubleshooting, endpoint support, mobile-device issues, printer incidents, dispatch, escalation, documentation, and scheduled on-call coverage.",
      voice: "At Shelby County Government, Langston supported enterprise users across Active Directory, Microsoft 365, endpoints, mobile devices, printers, account access, dispatch, documentation, and on-call operations.",
      actions: [["/experience/","All experience","primary"],["/projects/infrastructure-operations/","Related case study","secondary"]],
      content: `${detail(`
        <h2>Role context</h2><p>County government technology support requires balancing user urgency, policy, access control, multiple departments, legacy dependencies, escalation boundaries, and continuity expectations. The work was not merely device repair; it was operational coordination across a broad enterprise user base.</p>
        <h3>Responsibilities and exposure</h3><ul><li>Handled service requests and incidents involving account access, password resets, lockouts, Microsoft 365, Windows endpoints, mobile devices, printers, and peripheral equipment.</li><li>Worked with Active Directory account states and identity-related troubleshooting within assigned support boundaries.</li><li>Dispatched or escalated incidents requiring higher-tier infrastructure, networking, application, or field intervention.</li><li>Participated in scheduled on-call coverage and supported continuity outside standard business hours.</li><li>Created and used technical documentation to improve repeatability and handoff quality.</li></ul>
        <h3>Enterprise lesson</h3><p>A mature service desk is an observability layer for the organization. Repeated password lockouts, printer failures, connectivity tickets, or device problems can reveal deeper weaknesses in configuration, identity design, lifecycle management, documentation, or ownership.</p>
        <div class="callout"><strong>Professional framing</strong><p>This role demonstrates enterprise service delivery and operational discipline. It should not be misrepresented as direct ownership of county servers or architecture.</p></div>
      `,`<h3>Environment profile</h3><dl><div><dt>Sector</dt><dd>County government</dd></div><div><dt>Role</dt><dd>Customer Service Technician II</dd></div><div><dt>Dates</dt><dd>April 2024 – May 2026</dd></div><div><dt>Core domains</dt><dd>Identity support, M365, endpoints, mobile, printers, dispatch</dd></div><div><dt>Operational element</dt><dd>Scheduled on-call coverage</dd></div></dl>`)}
      ${nextLinks([["/experience/eresources/","Next role","eResources field engineering"],["/projects/infrastructure-operations/","Related project","Enterprise infrastructure operations case study"]])}`
    },

    "experience-eresources": {
      title: "eResources LLC",
      eyebrow: "IT Field Engineer · 2023",
      headline: "Customer deployments and troubleshooting <em>outside the comfort of one environment.</em>",
      lede: "The field-engineering role required adapting to customer systems, deploying Windows technology, and isolating connectivity, application, DNS, VPN, firewall, and endpoint problems.",
      voice: "At eResources, Langston worked as an IT Field Engineer deploying and supporting Windows endpoints and server environments while troubleshooting DNS, VPN, firewall, application, and network connectivity problems.",
      actions: [["/experience/","All experience","primary"],["/capabilities/","Capability map","secondary"]],
      content: `${detail(`
        <h2>Role context</h2><p>Field engineering compresses the troubleshooting cycle. The engineer arrives in an unfamiliar environment, gathers incomplete information, identifies dependencies, communicates with customer personnel, and must distinguish endpoint symptoms from network, application, identity, or infrastructure causes.</p>
        <h3>Responsibilities and exposure</h3><ul><li>Deployed and supported Windows endpoints and server systems in customer environments.</li><li>Troubleshot DNS resolution, VPN access, firewall behavior, application failures, and general network connectivity.</li><li>Supported clinic and office technology rollouts where sequencing, readiness, and communication mattered as much as installation.</li><li>Worked across different customer configurations rather than relying on one standardized internal image.</li></ul>
        <h3>Professional lesson</h3><p>Successful field work depends on disciplined discovery: establish the scope, confirm the physical and logical path, identify what changed, test from the lowest layer upward, and document the result for the next technician.</p>
      `,`<h3>Environment profile</h3><dl><div><dt>Sector</dt><dd>Managed/customer IT services</dd></div><div><dt>Role</dt><dd>IT Field Engineer</dd></div><div><dt>Dates</dt><dd>April 2023 – August 2023</dd></div><div><dt>Core domains</dt><dd>Deployment, Windows, DNS, VPN, firewall, applications, connectivity</dd></div></dl>`)}
      ${nextLinks([["/experience/alliance-healthcare-services/","Previous role","Alliance Healthcare Services"],["/projects/healthcare-identity/","Related project","Healthcare identity design"]])}`
    },

    "experience-alliance": {
      title: "Alliance Healthcare Services",
      eyebrow: "IT Technician · 2018–2023",
      headline: "Technology support where downtime can interrupt <em>clinical care.</em>",
      lede: "Five years in healthcare IT established the operational foundation: user access, clinical applications, Windows endpoints, mobile devices, Citrix thin clients, printers, network symptoms, and after-hours incidents.",
      voice: "At Alliance Healthcare Services, Langston supported HIPAA-regulated clinical environments, user access, endpoints, mobile devices, Citrix thin clients, clinical applications, printers, and after-hours incidents.",
      actions: [["/experience/","All experience","primary"],["/projects/healthcare-identity/","Healthcare identity project","secondary"]],
      content: `${detail(`
        <h2>Role context</h2><p>Healthcare support is inseparable from workflow continuity. A login failure can delay chart access. A printer outage can disrupt documentation. A thin-client issue can interrupt a clinician's session. The technician must restore service while respecting privacy, authorization, escalation, and the practical realities of patient-facing operations.</p>
        <h3>Responsibilities and exposure</h3><ul><li>Supported Windows endpoints, Citrix thin clients, mobile devices, printers, and clinical applications.</li><li>Assisted users with access and authentication problems in HIPAA-regulated environments.</li><li>Responded to after-hours incidents and worked independently when immediate support was required.</li><li>Troubleshot symptoms spanning devices, applications, connectivity, and user access.</li><li>Communicated with clinical and administrative personnel whose technical issue was often blocking a business or care process.</li></ul>
        <h3>Professional lesson</h3><p>The correct technical resolution is not enough if it ignores clinical urgency, privacy, communication, or a safe escalation path. Healthcare IT requires both systems thinking and respect for operational consequences.</p>
      `,`<h3>Environment profile</h3><dl><div><dt>Sector</dt><dd>Behavioral healthcare</dd></div><div><dt>Role</dt><dd>IT Technician</dd></div><div><dt>Dates</dt><dd>November 2018 – April 2023</dd></div><div><dt>Core domains</dt><dd>Clinical applications, Citrix, access, endpoints, mobile, printers</dd></div><div><dt>Compliance context</dt><dd>HIPAA-regulated operations</dd></div></dl>`)}
      ${nextLinks([["/projects/healthcare-identity/","Related architecture","Healthcare identity design"],["/education/southwest-tennessee/","Education milestone","Associate of Science"]])}`
    },

    projects: {
      title: "Technical Projects",
      eyebrow: "Architecture · implementation · analysis",
      headline: "Evidence of how I <em>reason, build, and document.</em>",
      lede: "Projects are presented as case studies with a business problem, implementation scope, design choices, risk considerations, limitations, and next steps.",
      voice: "The project portfolio includes the Eora Enterprise Lab, healthcare identity design, authorized Wi-Fi deauthentication research, and an enterprise infrastructure operations case study.",
      actions: [["/projects/eora-lab/","Open flagship project","primary"],["/recruiter/","Recruiter view","secondary"]],
      content: `${heroCards([
        {title:"Eora Enterprise Lab",text:"A multi-site Windows Server 2025 environment modeling Active Directory, DNS, DHCP, Group Policy, file services, role-based access, and PowerShell administration.",tags:["Active build","Windows Server 2025","AD DS","PowerShell"],href:"/projects/eora-lab/",wide:true,status:"Active build",statusClass:"status current"},
        {title:"Healthcare Identity Design",text:"A role-based identity and access concept connecting clinical responsibilities, joiner-mover-leaver processes, MFA, privileged access, auditability, and continuity.",tags:["IAM","RBAC","Healthcare"],href:"/projects/healthcare-identity/"},
        {title:"Wi-Fi Deauthentication Research",text:"An authorized Kali Linux research presentation covering 802.11 management frames, deauthentication behavior, PMF, WPA3, monitoring, and ethical constraints.",tags:["Kali Linux","802.11","PMF"],href:"/projects/wireless-security/"},
        {title:"Enterprise Infrastructure Operations",text:"A case study connecting service-desk signals to identity, endpoint, Microsoft 365, escalation, documentation, and continuity improvements.",tags:["Operations","M365","Documentation"],href:"/projects/infrastructure-operations/",wide:true}
      ])}`
    },

    "project-eora": {
      title: "Eora Enterprise Lab",
      eyebrow: "Flagship project · Active build",
      headline: "A healthcare-style Windows domain designed for <em>repeatability and least privilege.</em>",
      lede: "Eora Lab models a growing multi-site organization using Windows Server 2025, Active Directory Domain Services, DNS, DHCP, Group Policy, file services, role-based access, and PowerShell administration.",
      voice: "The Eora Enterprise Lab is a Windows Server 2025 project modeling Active Directory, DNS, DHCP, Group Policy, file services, identity design, administrative controls, and multiple clinic networks.",
      actions: [["/projects/","All projects","primary"],["/contact/","Discuss the architecture","secondary"]],
      content: `${detail(`
        <h2>Business problem</h2><p>Design a manageable identity and infrastructure model for a healthcare-style organization with a central office, multiple clinics, clinical and administrative departments, shared resources, and different levels of access.</p>
        <h3>Current architecture</h3><ul><li>Domain: <strong>EORA.COMMAND</strong> with a Windows Server 2025 domain controller.</li><li>Core services: AD DS, DNS, DHCP, Group Policy, IIS, BitLocker-related policy work, NPS, and WSUS planning.</li><li>Ten modeled DHCP networks covering headquarters and clinic locations across the Memphis area and North Mississippi.</li><li>Organizational units and groups representing clinics, departments, job functions, devices, and administrative boundaries.</li><li>Departmental file shares for Command, Fleet, Logistics, Operations, Orbital, Public, Research, and related resources.</li><li>PowerShell workflows for bulk account creation, attributes, exports, repeatable administration, and inventory tasks.</li></ul>
        <h3>Identity design</h3><p>The lab uses role and location concepts rather than assigning permissions directly to individual users. The intended model follows account-to-global-group-to-domain-local-group-to-resource nesting, supporting cleaner access reviews and fewer one-off exceptions.</p>
        <h3>Network plan</h3><div class="table-wrap"><table><thead><tr><th>Network</th><th>Purpose</th><th>Example scope</th></tr></thead><tbody><tr><td>HQ Core</td><td>Core infrastructure and administration</td><td>10.10.10.0/24</td></tr><tr><td>Downtown Memphis</td><td>Clinic users and devices</td><td>10.20.20.0/24</td></tr><tr><td>Midtown Memphis</td><td>Clinic users and devices</td><td>10.30.30.0/24</td></tr><tr><td>East Memphis</td><td>Clinic users and devices</td><td>10.40.40.0/24</td></tr><tr><td>Additional clinics</td><td>Germantown, Raleigh, Arlington, Millington, Olive Branch, Horn Lake</td><td>10.50.50.0–10.100.100.0/24</td></tr></tbody></table></div>
        <h3>Design decisions</h3><ul><li>Separate identity structure from resource permissions.</li><li>Use aliases and DNS records to reduce dependence on server hostnames.</li><li>Document naming, ownership, and purpose before scaling account creation.</li><li>Treat clinic segmentation as a firewall and routing requirement, not merely a DHCP exercise.</li><li>Plan for logging, backup, recovery, privileged access, and change control instead of presenting a single server as production-ready.</li></ul>
        <div class="callout"><strong>Known single points of failure</strong><p>The current lab is intentionally small. A single domain controller, a single file server, consumer-grade hardware, and limited backup infrastructure would be unacceptable in production. These limitations are documented as part of the project rather than hidden.</p></div>
        <h3>Next implementation milestones</h3><ol><li>Add a second domain controller and validate replication and DNS resilience.</li><li>Formalize VLANs, inter-site routing, firewall policy, and management networks.</li><li>Implement structured GPO baselines and controlled testing rings.</li><li>Add centralized logging, alerting, backup validation, and recovery exercises.</li><li>Publish diagrams, scripts, screenshots, test evidence, and a formal implementation guide.</li></ol>
      `,`<span class="status current">Active build</span><h3>Technical profile</h3><dl><div><dt>Platform</dt><dd>Windows Server 2025</dd></div><div><dt>Identity</dt><dd>Active Directory Domain Services</dd></div><div><dt>Core services</dt><dd>DNS · DHCP · GPO · SMB</dd></div><div><dt>Automation</dt><dd>PowerShell</dd></div><div><dt>Model</dt><dd>Multi-site healthcare organization</dd></div><div><dt>Primary principle</dt><dd>Repeatability and least privilege</dd></div></dl><div class="callout"><strong>Hiring-manager defense</strong><p>How would you explain why the lab separates global role groups from domain-local resource groups?</p></div>`)}
      ${nextLinks([["/projects/healthcare-identity/","Related design","Healthcare identity architecture"],["/capabilities/","Capability map","Skills demonstrated by the project"]])}`
    },

    "project-identity": {
      title: "Healthcare Identity Design",
      eyebrow: "Identity architecture case study",
      headline: "Access based on <em>clinical responsibility, not convenience.</em>",
      lede: "This concept models identity lifecycle, role-based access, privileged administration, authentication, auditability, and continuity for a healthcare organization.",
      voice: "The healthcare identity design project models role-based access, joiner mover leaver processes, multifactor authentication, privileged access, auditability, and clinical workflow continuity.",
      actions: [["/projects/","All projects","primary"],["/projects/eora-lab/","Related lab","secondary"]],
      content: `${detail(`
        <h2>Problem statement</h2><p>Healthcare organizations must provide fast, reliable access without allowing convenience to erase authorization boundaries. Physicians, nurses, nurse practitioners, pharmacists, social workers, counselors, medical assistants, front-office staff, and IT administrators should not receive identical permissions.</p>
        <h3>Control model</h3><ul><li><strong>Joiner:</strong> verify employment, role, location, manager, license-dependent duties, and required systems before provisioning.</li><li><strong>Mover:</strong> reassess access when a person changes clinic, department, job function, or supervisory responsibility.</li><li><strong>Leaver:</strong> disable access promptly, preserve records appropriately, recover devices, and transfer ownership of business data.</li><li><strong>RBAC:</strong> assign permissions through approved role and resource groups rather than individual exceptions.</li><li><strong>Privileged access:</strong> separate daily accounts from administrative identities and log privileged actions.</li><li><strong>Authentication:</strong> use MFA and conditional controls appropriate to risk, device state, and workflow.</li></ul>
        <h3>Clinical safety principle</h3><p>Technical access does not create professional authorization. A highly experienced nurse may understand a workflow better than a new physician, but the system must still respect legal scope, organizational policy, and accountable approvals.</p>
        <div class="callout"><strong>Example</strong><p>Prescribing medication requires both a system permission and an authorized clinical role. Granting the technical capability to an unapproved user creates patient-safety, legal, audit, and insurance risk.</p></div>
        <h3>Audit questions</h3><ul><li>Who approved this access?</li><li>Which role or resource group produced it?</li><li>Does the permission still match the user's current duties?</li><li>Can privileged or emergency access be distinguished from routine work?</li><li>What happens to access during termination, leave, or a transfer?</li></ul>
      `,`<h3>Architecture focus</h3><dl><div><dt>Industry</dt><dd>Healthcare</dd></div><div><dt>Primary domain</dt><dd>Identity and Access Management</dd></div><div><dt>Model</dt><dd>RBAC and lifecycle governance</dd></div><div><dt>Security controls</dt><dd>MFA, least privilege, logging, separation of duties</dd></div><div><dt>Business dependency</dt><dd>Clinical workflow continuity</dd></div></dl>`)}
      ${nextLinks([["/projects/eora-lab/","Implementation context","Eora Enterprise Lab"],["/experience/alliance-healthcare-services/","Professional context","Healthcare IT experience"]])}`
    },

    "project-wireless": {
      title: "Wi-Fi Deauthentication Research",
      eyebrow: "Authorized security research",
      headline: "Understanding wireless disruption to <em>design better defenses.</em>",
      lede: "A Kali Linux presentation examining 802.11 management frames, deauthentication behavior, defensive monitoring, Protected Management Frames, WPA3, and the legal and ethical boundaries of testing.",
      voice: "This authorized wireless security project explains Wi-Fi deauthentication behavior, management frames, Protected Management Frames, WPA3, monitoring, and ethical testing boundaries.",
      actions: [["/projects/","All projects","primary"],["/credentials/comptia-cysa/","Security credential","secondary"]],
      content: `${detail(`
        <h2>Research objective</h2><p>Explain why certain wireless management frames historically allowed clients to be disconnected, demonstrate the concept only in an authorized lab, and connect the behavior to modern defensive controls.</p>
        <h3>Technical concepts</h3><ul><li>802.11 management frames coordinate association, authentication, disassociation, and deauthentication behavior.</li><li>Legacy designs did not always protect management frames cryptographically.</li><li>An attacker or tester can abuse that weakness to interrupt connectivity or force reconnection behavior.</li><li>Protected Management Frames can reduce exposure by authenticating important management traffic.</li><li>WPA3, current firmware, wireless monitoring, segmentation, and user awareness strengthen the defensive posture.</li></ul>
        <h3>Ethical boundary</h3><p>Deauthentication testing can disrupt users and services. It belongs only in an isolated environment or under explicit written authorization with a defined scope, schedule, rollback plan, and responsible owner.</p>
        <div class="callout"><strong>Portfolio purpose</strong><p>The value is not the ability to disconnect a client. The value is understanding the protocol weakness, recognizing the operational impact, and explaining the mitigation.</p></div>
        <h3>Defensive recommendations</h3><ul><li>Enable PMF where supported and require it for capable clients.</li><li>Prefer WPA3 or strong WPA2 configurations during transition.</li><li>Monitor for abnormal deauthentication and disassociation activity.</li><li>Maintain firmware and access-point lifecycle management.</li><li>Segment wireless networks and protect management interfaces.</li></ul>
      `,`<h3>Research profile</h3><dl><div><dt>Platform</dt><dd>Kali Linux</dd></div><div><dt>Protocol</dt><dd>IEEE 802.11</dd></div><div><dt>Threat</dt><dd>Wireless availability disruption</dd></div><div><dt>Primary mitigations</dt><dd>PMF · WPA3 · monitoring</dd></div><div><dt>Testing condition</dt><dd>Authorized lab only</dd></div></dl>`)}
      ${nextLinks([["/credentials/comptia-security/","Related credential","CompTIA Security+"],["/projects/infrastructure-operations/","Next project","Infrastructure operations"]])}`
    },

    "project-operations": {
      title: "Enterprise Infrastructure Operations",
      eyebrow: "Operational case study",
      headline: "Turning repeated tickets into <em>systems intelligence.</em>",
      lede: "This case study connects Microsoft 365, Active Directory, endpoints, mobile devices, printers, connectivity, escalation, documentation, and continuity into one operational view.",
      voice: "The infrastructure operations case study shows how recurring service incidents can reveal deeper identity, endpoint, configuration, documentation, ownership, and continuity problems.",
      actions: [["/projects/","All projects","primary"],["/experience/shelby-county-government/","Related experience","secondary"]],
      content: `${detail(`
        <h2>Operational premise</h2><p>A ticket queue is more than a work list. It is a stream of evidence about where users, technology, process, ownership, and documentation fail to align.</p>
        <h3>Signal-to-improvement workflow</h3><ol><li>Classify the incident accurately instead of using an overly broad category.</li><li>Capture the affected user, device, location, service, time, and recent change.</li><li>Identify repeat patterns across accounts, models, departments, or sites.</li><li>Determine whether the cause belongs to training, configuration, lifecycle, capacity, access, vendor ownership, or infrastructure.</li><li>Convert the pattern into a documented corrective action with an owner and validation step.</li></ol>
        <h3>Examples</h3><ul><li>Repeated account lockouts may indicate cached credentials, stale sessions, service-account design, or user confusion.</li><li>Frequent printer tickets may reveal driver inconsistency, naming problems, hardware lifecycle issues, or unclear ownership.</li><li>Recurring VPN failures may involve identity, MFA, client configuration, DNS, firewall policy, or network reachability.</li><li>Endpoint incidents concentrated on one model or image may justify a controlled remediation rather than repeated manual repair.</li></ul>
        <h3>Enterprise controls</h3><ul><li>Clear severity and escalation criteria.</li><li>Known ownership for systems and services.</li><li>Repeatable documentation and change records.</li><li>Monitoring and metrics that distinguish volume from impact.</li><li>Post-incident review for high-impact or recurring failures.</li></ul>
      `,`<h3>Case-study profile</h3><dl><div><dt>Primary domain</dt><dd>IT operations</dd></div><div><dt>Inputs</dt><dd>Incidents, requests, patterns, escalations</dd></div><div><dt>Outputs</dt><dd>Documentation, root-cause hypotheses, corrective action</dd></div><div><dt>Business objective</dt><dd>Reliability and continuity</dd></div></dl>`)}
      ${nextLinks([["/experience/shelby-county-government/","Operational context","Public-sector support"],["/capabilities/","Capability map","Transferable skills"]])}`
    },

    credentials: {
      title: "Credentials & Education",
      eyebrow: "Verified milestones",
      headline: "Validated fundamentals, <em>applied through practice.</em>",
      lede: "Current certification cycles are distinguished from earlier credentials. Public pages intentionally omit certification numbers and verification codes.",
      voice: "Current credentials include CompTIA CySA Plus, Security Plus, Network Plus, and ISC2 Certified in Cybersecurity. Earlier milestones include CompTIA A Plus and IT Fundamentals Plus, along with a bachelor's and associate degree.",
      actions: [["/credentials/comptia-cysa/","Open CySA+","primary"],["/education/university-of-memphis/","View education","secondary"]],
      content: `${heroCards([
        {title:"CompTIA CySA+",text:"Earned May 10, 2025. Current certification cycle through May 10, 2028.",tags:["CS0-003","Security analytics","Current"],href:"/credentials/comptia-cysa/",status:"Current",statusClass:"status current"},
        {title:"CompTIA Security+",text:"SY0-701 certification earned November 17, 2024. Current through November 17, 2027.",tags:["SY0-701","Security foundations","Current"],href:"/credentials/comptia-security/",status:"Current",statusClass:"status current"},
        {title:"CompTIA Network+",text:"Earned December 15, 2023. Current certification cycle through December 15, 2026.",tags:["N10-008","Networking","Current"],href:"/credentials/comptia-network/",status:"Current",statusClass:"status current"},
        {title:"ISC2 Certified in Cybersecurity",text:"Certified since 2024. Current cycle through January 31, 2027.",tags:["CC","Cybersecurity","Current"],href:"/credentials/isc2-cc/",status:"Current",statusClass:"status current"},
        {title:"CompTIA A+",text:"Earned April 20, 2018. The certificate supplied reflects a prior cycle ending April 20, 2021.",tags:["Endpoint foundations","Prior cycle"],href:"/credentials/comptia-a/",status:"Prior cycle",statusClass:"status prior"},
        {title:"CompTIA IT Fundamentals+",text:"Earned August 16, 2017 as the first formal technology credential in the progression.",tags:["IT foundations","Earned"],href:"/credentials/comptia-itf/",status:"Earned",statusClass:"status earned"},
        {title:"B.B.A. in Management Information Systems",text:"University of Memphis, completed in 2026.",tags:["Business","Information systems","2026"],href:"/education/university-of-memphis/",wide:true},
        {title:"Associate of Science",text:"Southwest Tennessee Community College, awarded August 11, 2022.",tags:["Associate degree","2022"],href:"/education/southwest-tennessee/"}
      ])}`
    },

    "credential-cysa": {
      title: "CompTIA CySA+",
      eyebrow: "Current certification · CS0-003",
      headline: "Security analytics and <em>defensive operations.</em>",
      lede: "Earned May 10, 2025, with the supplied certification document showing an expiration date of May 10, 2028.",
      voice: "Langston earned the CompTIA Cybersecurity Analyst Plus certification on May tenth, 2025. The current cycle runs through May tenth, 2028.",
      actions: [["/credentials/","All credentials","primary"],["/projects/wireless-security/","Related research","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>CySA+ validates knowledge across security operations, vulnerability management, incident response, threat intelligence, detection, analysis, and communication.</p><h3>Portfolio relevance</h3><ul><li>Supports the move from general support into defensive security and security-minded administration.</li><li>Provides a framework for analyzing events, prioritizing vulnerabilities, documenting incidents, and recommending mitigations.</li><li>Connects directly to the wireless security research and the logging, monitoring, and response roadmap for Eora Lab.</li></ul><div class="callout"><strong>Evidence standard</strong><p>The certification establishes a baseline. The portfolio must still demonstrate practical reasoning, tooling, documentation, and judgment.</p></div>`,`<span class="status current">Current</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>CompTIA</dd></div><div><dt>Exam</dt><dd>CS0-003</dd></div><div><dt>Earned</dt><dd>May 10, 2025</dd></div><div><dt>Cycle end</dt><dd>May 10, 2028</dd></div><div><dt>Focus</dt><dd>Security analytics and defensive operations</dd></div></dl>`)}${nextLinks([["/credentials/comptia-security/","Next credential","CompTIA Security+"],["/projects/eora-lab/","Applied context","Eora Enterprise Lab"]])}`
    },

    "credential-security": {
      title: "CompTIA Security+",
      eyebrow: "Current certification · SY0-701",
      headline: "Security foundations renewed through <em>current objectives.</em>",
      lede: "The current Security+ credential was earned November 17, 2024 and is valid through November 17, 2027. An earlier SY0-501 cycle was earned March 18, 2020.",
      voice: "Langston holds a current CompTIA Security Plus certification based on the SY0-701 exam, earned November seventeenth, 2024 and valid through November seventeenth, 2027.",
      actions: [["/credentials/","All credentials","primary"],["/projects/healthcare-identity/","Related project","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>Security+ covers threats, vulnerabilities, architecture, operations, incident response, identity, cryptography, risk, governance, and secure implementation fundamentals.</p><h3>Progression</h3><p>The earlier SY0-501 certification was earned in 2020. The newer SY0-701 certification demonstrates continued study and renewal rather than relying solely on the original cycle.</p><h3>Portfolio relevance</h3><ul><li>Least privilege and group-based access in Eora Lab.</li><li>MFA, identity lifecycle, privileged access, and auditability in the healthcare identity project.</li><li>Authorization, defensive controls, and risk framing in wireless security research.</li></ul>`,`<span class="status current">Current</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>CompTIA</dd></div><div><dt>Current exam</dt><dd>SY0-701</dd></div><div><dt>Current earned</dt><dd>November 17, 2024</dd></div><div><dt>Cycle end</dt><dd>November 17, 2027</dd></div><div><dt>Earlier cycle</dt><dd>SY0-501 · March 18, 2020</dd></div></dl>`)}${nextLinks([["/credentials/comptia-network/","Next credential","CompTIA Network+"],["/projects/healthcare-identity/","Applied context","Healthcare identity design"]])}`
    },

    "credential-network": {
      title: "CompTIA Network+",
      eyebrow: "Current certification · N10-008",
      headline: "Network foundations for <em>systems and security work.</em>",
      lede: "Earned December 15, 2023, with the supplied certification document showing an expiration date of December 15, 2026.",
      voice: "Langston earned CompTIA Network Plus on December fifteenth, 2023. The supplied credential is current through December fifteenth, 2026.",
      actions: [["/credentials/","All credentials","primary"],["/projects/eora-lab/","Network design context","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>Network+ covers addressing, routing, switching, wireless, services, operations, monitoring, troubleshooting, security, and documentation.</p><h3>Portfolio relevance</h3><ul><li>Ten modeled DHCP scopes in Eora Lab.</li><li>DNS records, service aliases, routing assumptions, clinic segmentation, and firewall planning.</li><li>Troubleshooting experience involving DNS, VPN, firewall, wireless, and general connectivity.</li></ul><div class="callout"><strong>Architecture discipline</strong><p>Creating several subnets is not the same as designing a network. A complete design must define routing, VLAN boundaries, firewall policy, management access, monitoring, redundancy, and failure behavior.</p></div>`,`<span class="status current">Current</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>CompTIA</dd></div><div><dt>Exam</dt><dd>N10-008</dd></div><div><dt>Earned</dt><dd>December 15, 2023</dd></div><div><dt>Cycle end</dt><dd>December 15, 2026</dd></div><div><dt>Focus</dt><dd>Network operations and troubleshooting</dd></div></dl>`)}${nextLinks([["/credentials/isc2-cc/","Next credential","ISC2 Certified in Cybersecurity"],["/projects/eora-lab/","Applied context","Eora network and services"]])}`
    },

    "credential-a": {
      title: "CompTIA A+",
      eyebrow: "Foundational credential · Prior cycle",
      headline: "The endpoint foundation that started <em>before the first full-time IT role.</em>",
      lede: "Earned April 20, 2018. The supplied certificate reflects an expiration date of April 20, 2021, so this page labels it honestly as a prior certification cycle.",
      voice: "Langston earned CompTIA A Plus on April twentieth, 2018. The supplied certificate reflects a prior cycle that ended April twentieth, 2021.",
      actions: [["/credentials/","All credentials","primary"],["/experience/alliance-healthcare-services/","Early career context","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>A+ covers endpoint hardware, operating systems, troubleshooting, networking basics, security, mobile devices, operational procedures, and customer support.</p><h3>Career relevance</h3><p>The credential was earned shortly before the beginning of the long-term healthcare IT role. It represents the technical and troubleshooting foundation that later expanded into networking, security, identity, and systems work.</p><div class="callout"><strong>Status clarity</strong><p>The portfolio does not present the supplied 2018–2021 certificate as current. The knowledge and career milestone remain relevant, but the certification cycle shown on the document has ended.</p></div>`,`<span class="status prior">Prior cycle</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>CompTIA</dd></div><div><dt>Earned</dt><dd>April 20, 2018</dd></div><div><dt>Documented cycle end</dt><dd>April 20, 2021</dd></div><div><dt>Focus</dt><dd>Endpoint and support foundations</dd></div></dl>`)}${nextLinks([["/credentials/comptia-itf/","Earlier credential","CompTIA IT Fundamentals+"],["/experience/alliance-healthcare-services/","Applied context","Healthcare IT role"]])}`
    },

    "credential-itf": {
      title: "CompTIA IT Fundamentals+",
      eyebrow: "Foundational credential · 2017",
      headline: "The first formal milestone in a <em>long technical progression.</em>",
      lede: "Earned August 16, 2017, before high-school graduation and before the start of the professional IT career.",
      voice: "Langston earned CompTIA IT Fundamentals Plus on August sixteenth, 2017, making it the first formal certification milestone in the portfolio.",
      actions: [["/credentials/","All credentials","primary"],["/education/southwest-tennessee/","Education progression","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>IT Fundamentals+ introduces computing concepts, infrastructure, applications, software development, database fundamentals, security, and common IT practices.</p><h3>Progression value</h3><p>This credential is not presented as an advanced qualification. Its significance is chronological: it marks the beginning of a progression that later included A+, professional healthcare IT experience, an associate degree, Network+, Security+, ISC2 CC, CySA+, and a bachelor's degree in MIS.</p>`,`<span class="status earned">Earned</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>CompTIA</dd></div><div><dt>Earned</dt><dd>August 16, 2017</dd></div><div><dt>Focus</dt><dd>Information technology fundamentals</dd></div><div><dt>Career stage</dt><dd>Pre-professional foundation</dd></div></dl>`)}${nextLinks([["/credentials/comptia-a/","Next milestone","CompTIA A+"],["/education/southwest-tennessee/","Education milestone","Associate of Science"]])}`
    },

    "credential-isc2": {
      title: "ISC2 Certified in Cybersecurity",
      eyebrow: "Current certification · CC",
      headline: "A governance-aware foundation for <em>responsible security practice.</em>",
      lede: "Certified since 2024. The supplied certificate shows a certification cycle from February 1, 2024 through January 31, 2027.",
      voice: "Langston has held the ISC2 Certified in Cybersecurity credential since 2024. The current certificate cycle runs through January thirty-first, 2027.",
      actions: [["/credentials/","All credentials","primary"],["/projects/healthcare-identity/","Related security design","secondary"]],
      content: `${detail(`<h2>Credential scope</h2><p>ISC2 CC introduces security principles, business continuity, disaster recovery, access controls, network security, security operations, risk, and professional ethics.</p><h3>Portfolio relevance</h3><ul><li>Reinforces that security decisions must support business continuity rather than exist in isolation.</li><li>Supports access-control and governance reasoning in the healthcare identity project.</li><li>Provides an ethics-centered complement to the more technical CompTIA security pathway.</li></ul>`,`<span class="status current">Current</span><h3>Credential record</h3><dl><div><dt>Issuer</dt><dd>ISC2</dd></div><div><dt>Credential</dt><dd>Certified in Cybersecurity</dd></div><div><dt>Certified since</dt><dd>2024</dd></div><div><dt>Cycle</dt><dd>Feb. 1, 2024 – Jan. 31, 2027</dd></div></dl>`)}${nextLinks([["/credentials/comptia-cysa/","Advanced security milestone","CompTIA CySA+"],["/projects/healthcare-identity/","Applied context","Healthcare identity design"]])}`
    },

    "education-mis": {
      title: "University of Memphis",
      eyebrow: "B.B.A. · Management Information Systems · 2026",
      headline: "Connecting technology decisions to <em>business operations.</em>",
      lede: "The Management Information Systems degree adds business analysis, organizational context, systems thinking, and management perspective to the technical support and certification foundation.",
      voice: "Langston completed a Bachelor of Business Administration in Management Information Systems at the University of Memphis in 2026.",
      actions: [["/credentials/","Credentials and education","primary"],["/recruiter/","Recruiter view","secondary"]],
      content: `${detail(`<h2>Degree value</h2><p>Management Information Systems sits between business operations and technology delivery. The degree complements hands-on experience by emphasizing how systems support processes, users, controls, decision-making, projects, and organizational goals.</p><h3>Portfolio connection</h3><ul><li>Eora Lab frames configuration decisions around a modeled healthcare organization rather than isolated technical exercises.</li><li>The recruiter view translates technical work into operational value.</li><li>Identity, security, and infrastructure decisions are evaluated through risk, continuity, governance, and stakeholder impact.</li></ul><div class="callout"><strong>Professional objective</strong><p>Use the degree and technical experience together to move from resolving individual incidents toward designing and administering the systems that prevent them.</p></div>`,`<h3>Education record</h3><dl><div><dt>Institution</dt><dd>University of Memphis</dd></div><div><dt>Degree</dt><dd>Bachelor of Business Administration</dd></div><div><dt>Major</dt><dd>Management Information Systems</dd></div><div><dt>Completion</dt><dd>2026</dd></div><div><dt>Location</dt><dd>Memphis, Tennessee</dd></div></dl>`)}${nextLinks([["/education/southwest-tennessee/","Previous degree","Associate of Science"],["/projects/eora-lab/","Applied systems work","Eora Enterprise Lab"]])}`
    },

    "education-as": {
      title: "Southwest Tennessee Community College",
      eyebrow: "Associate of Science · 2022",
      headline: "A completed foundation for <em>continued academic progression.</em>",
      lede: "The diploma records an Associate of Science awarded August 11, 2022 by Southwest Tennessee Community College.",
      voice: "Langston earned an Associate of Science from Southwest Tennessee Community College on August eleventh, 2022.",
      actions: [["/credentials/","Credentials and education","primary"],["/education/university-of-memphis/","Bachelor's degree","secondary"]],
      content: `${detail(`<h2>Education milestone</h2><p>The associate degree represents persistence through the early professional career and served as the academic bridge to the University of Memphis Management Information Systems program.</p><h3>Career context</h3><p>The degree was completed while the professional foundation was already being built through healthcare IT work. That combination matters: academic progression did not occur in isolation from real operational experience.</p>`,`<h3>Education record</h3><dl><div><dt>Institution</dt><dd>Southwest Tennessee Community College</dd></div><div><dt>Degree</dt><dd>Associate of Science</dd></div><div><dt>Awarded</dt><dd>August 11, 2022</dd></div><div><dt>Location</dt><dd>Memphis, Tennessee</dd></div></dl>`)}${nextLinks([["/education/university-of-memphis/","Next degree","B.B.A. in MIS"],["/experience/alliance-healthcare-services/","Concurrent career foundation","Healthcare IT experience"]])}`
    },

    capabilities: {
      title: "Capability Map",
      eyebrow: "Technical and operational value",
      headline: "Where support experience becomes <em>infrastructure capability.</em>",
      lede: "The strongest value lies at the intersection of identity, endpoints, Microsoft services, networks, documentation, security controls, and operational continuity.",
      voice: "The capability map covers systems and identity, endpoint operations, networking, security-minded administration, healthcare information technology, documentation, and automation.",
      actions: [["/projects/eora-lab/","See capabilities applied","primary"],["/contact/","Discuss a role","secondary"]],
      content: `${heroCards([
        {title:"Systems & Identity",text:"Active Directory, Microsoft 365, user lifecycle, groups, permissions, Group Policy, access troubleshooting, and role-based design.",tags:["AD DS","M365","IAM","GPO"],href:"/projects/eora-lab/",wide:true},
        {title:"Endpoint Operations",text:"Windows endpoints, mobile devices, printers, deployment, field support, escalation, continuity, and lifecycle awareness.",tags:["Windows","Mobile","Deployment"],href:"/experience/"},
        {title:"Networks & Services",text:"TCP/IP, DNS, DHCP, VPN, wireless, firewall troubleshooting, segmentation concepts, and technical documentation.",tags:["DNS","DHCP","VPN","Wireless"],href:"/credentials/comptia-network/"},
        {title:"Security-Minded Administration",text:"Least privilege, MFA, role-based access, auditability, incident triage, vulnerability awareness, and defensible change decisions.",tags:["RBAC","MFA","CySA+"],href:"/credentials/comptia-cysa/",wide:true},
        {title:"Healthcare IT",text:"Clinical workflow awareness, HIPAA-regulated environments, Citrix thin clients, applications, access, printers, and patient-facing continuity dependencies.",tags:["HIPAA","Clinical workflows","Citrix"],href:"/experience/alliance-healthcare-services/"},
        {title:"Documentation & Automation",text:"Repeatable procedures, handoffs, PowerShell scripting, bulk account operations, inventory exports, naming standards, and implementation guides.",tags:["PowerShell","Runbooks","Standards"],href:"/projects/eora-lab/"}
      ])}`
    },

    about: {
      title: "About Eora Labs",
      eyebrow: "Operating philosophy",
      headline: "Look for the system <em>behind the symptom.</em>",
      lede: "Eora Labs is not a claim of production-scale architecture ownership. It is a transparent record of professional experience, technical study, lab implementation, decisions, limitations, and growth.",
      voice: "Eora Labs documents a progression from frontline information technology support toward systems administration, identity, endpoint administration, and security operations. The portfolio emphasizes transparent scope and continuous improvement.",
      actions: [["/recruiter/","Recruiter view","primary"],["/contact/","Contact","secondary"]],
      content: `${detail(`<h2>Why the portfolio exists</h2><p>Certifications and job titles compress experience into labels. A portfolio can show the work underneath: how a problem was framed, what assumptions were made, what was implemented, where the design is weak, and what would be required for an enterprise-ready result.</p><h3>Standards used here</h3><ul class="check-list"><li>Do not present lab configuration as production experience.</li><li>Distinguish current certification cycles from prior ones.</li><li>Document limitations and single points of failure.</li><li>Connect technical controls to business and user consequences.</li><li>Prefer repeatable designs over one-off fixes.</li><li>Explain why a decision was made, not only which button was clicked.</li></ul><h3>Career objective</h3><p>Advance into a role with greater responsibility for systems, identity, endpoint administration, healthcare infrastructure, or defensive security operations while continuing to deepen architecture, automation, cloud, and operational maturity.</p>`,`<h3>Portfolio principles</h3><dl><div><dt>Evidence</dt><dd>Projects, records, implementation details</dd></div><div><dt>Integrity</dt><dd>Accurate scope and status</dd></div><div><dt>Architecture</dt><dd>Business problem before configuration</dd></div><div><dt>Security</dt><dd>Least privilege and defensible controls</dd></div><div><dt>Growth</dt><dd>Document weaknesses and improve them</dd></div></dl>`)}${nextLinks([["/projects/","Technical evidence","Browse all projects"],["/credentials/","Verified milestones","Credentials and education"]])}`
    },

    contact: {
      title: "Contact",
      eyebrow: "Professional opportunities",
      headline: "Let's discuss systems people can <em>rely on.</em>",
      lede: "Target roles include systems administration, identity and access administration, endpoint administration, cybersecurity operations, healthcare IT, and infrastructure support.",
      voice: "Use this page to contact Langston Brown about systems administration, identity, endpoint administration, cybersecurity operations, healthcare information technology, or infrastructure support opportunities.",
      actions: [["mailto:langston.brown03@gmail.com","Email Langston","primary"],["https://www.linkedin.com/in/k0326/","LinkedIn","secondary"],["https://github.com/Shield-12","GitHub","secondary"]],
      content: `${detail(`<h2>Start a professional conversation</h2><p>The most useful outreach includes the role title, organization, location or remote expectations, compensation range, reporting structure, core technologies, and the problems the team needs the position to solve.</p><h3>Best-fit discussions</h3><ul class="check-list"><li>Systems or junior systems administration</li><li>Identity and access administration</li><li>Endpoint or Microsoft 365 administration</li><li>Healthcare information technology</li><li>Cybersecurity operations or security-minded infrastructure support</li><li>Technical projects where documentation and repeatability matter</li></ul><div class="card-actions"><a class="button primary" href="mailto:langston.brown03@gmail.com">langston.brown03@gmail.com</a><a class="button secondary" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/k0326/">LinkedIn profile</a></div>`,`<span class="status current">Open to opportunities</span><h3>Professional focus</h3><dl><div><dt>Location</dt><dd>Memphis, Tennessee</dd></div><div><dt>Primary paths</dt><dd>Systems · IAM · Endpoint · Security</dd></div><div><dt>Industry preference</dt><dd>Healthcare and enterprise IT</dd></div><div><dt>Portfolio</dt><dd>eoralabs.com</dd></div></dl>`)}${nextLinks([["/recruiter/","Candidate summary","Recruiter briefing"],["/projects/eora-lab/","Flagship evidence","Eora Enterprise Lab"]])}`
    },

    notfound: {
      title: "Page Not Found",
      eyebrow: "404 · Route unavailable",
      headline: "That node is not part of the <em>current environment.</em>",
      lede: "The requested page may have moved or the address may be incomplete.",
      voice: "The requested page was not found. Return to the Eora Labs home page or open the projects directory.",
      actions: [["/","Return home","primary"],["/projects/","Open projects","secondary"]],
      content: `<section class="section"><div class="inner"><blockquote class="quote reveal">Route resolution failed. No production systems were harmed.</blockquote></div></section>`
    }
  };
})();
