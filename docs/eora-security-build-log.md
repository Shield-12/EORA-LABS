# Eora Security Monitoring Build Log

**Environment:** EORA.COMMAND  
**Platform:** Windows Server 2025  
**Status:** Active build  
**Updated:** August 7, 2026

## What I built

Started the security-monitoring layer of the Eora Enterprise Lab on `EORA-COMMAND-001`.

### SEC-001 — Centralized event collection foundation

- Configured Windows Event Collector (`Wecsvc`).
- Verified Windows Remote Management (`WinRM`) is running.
- Verified the `ForwardedEvents` event channel is enabled and ready for subscriptions.

### SEC-002 — Security telemetry baseline

Captured the server's current security posture before changing policy:

- Microsoft Defender Antivirus, antispyware, real-time protection, behavior monitoring, IOAV protection, and Network Inspection System were enabled.
- PowerShell Operational logging was enabled with 1,085 existing events.
- Microsoft Defender Operational logging was enabled with 4,299 existing events.
- Windows Defender Firewall Operational logging was enabled with 1,690 existing events.
- Windows Firewall was enabled for Domain, Private, and Public profiles.
- Advanced Audit Policy was inventoried with `auditpol` to identify existing coverage and telemetry gaps.

Notable audit gaps identified for later policy work include Process Creation, Sensitive Privilege Use, Directory Service Changes, Group Membership, and selected policy-change events.

### SEC-003 — Active Directory password and lockout baseline

Documented the first identity-security hardening pass for the EORA.COMMAND domain lab.

Captured password policy evidence:

- Enforce password history: 2 passwords remembered.
- Maximum password age: 90 days.
- Minimum password age: 30 days.
- Minimum password length audit: 12 characters.
- Password complexity requirements: Enabled.
- Reversible password encryption: Disabled.

Captured account lockout policy evidence:

- Account lockout threshold: 5 invalid logon attempts.
- Account lockout duration: 30 minutes.
- Reset account lockout counter: 30 minutes.
- Administrator account lockout: Enabled.

During testing, a standard user account was blocked from logging directly onto the domain controller. I am documenting that as a correct role-separation lesson: ordinary users should validate authentication behavior from domain-joined client systems, not directly from a domain controller.

Detailed documentation is maintained in [`docs/eora-active-directory-password-policy.md`](./eora-active-directory-password-policy.md).

### SEC-004 — Session notes and portfolio documentation standard

Published working notes from the August 7, 2026 build session to preserve the project direction, lab topology, documentation standard, and next validation steps.

The note captures several durable decisions:

- EoraLabs should read primarily as a first-person engineering record.
- The lab topology should be documented truthfully as a notebook-hosted environment with temporary service consolidation.
- The domain controller logon message should be treated as a role-separation lesson, not as failed user validation.
- Unfinished work should be marked as in progress until validated from domain-joined client systems.

Detailed notes are maintained in [`docs/eoralabs-session-notes-2026-08-07.md`](./eoralabs-session-notes-2026-08-07.md).

## Why this matters

The objective is to move from inspecting logs independently on individual Windows systems toward centralized, repeatable security monitoring. Future phases will use Group Policy to standardize auditing and Windows Event Forwarding to deliver selected endpoint/server events to a central collector.

The identity baseline also connects authentication policy to security operations. Password and lockout controls influence brute-force resistance, account lockout events, service-desk workflow, and the quality of future telemetry.

The session notes preserve project reasoning, not just configuration outputs. That makes the portfolio stronger because reviewers can see the engineering judgment behind the lab decisions.

## Next

1. Confirm the intended GPO scope and link location before claiming domain-wide enforcement.
2. Verify the effective domain policy with `net accounts /domain`.
3. Create two domain-joined client systems for user logon testing.
4. Review the existing `EORA - Baseline Security Policy` GPO before creating overlapping policy.
5. Define an Advanced Audit Policy baseline.
6. Configure Windows Firewall connection logging where appropriate.
7. Create and validate the first Windows Event Forwarding subscription.
8. Document before/after evidence and troubleshooting results.

> This is a lab implementation. Services are temporarily consolidated on the domain controller because of hardware and connectivity constraints; a production design would separate security/management workloads where appropriate.
