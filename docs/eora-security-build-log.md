# Eora Security Monitoring Build Log

**Environment:** EORA.COMMAND  
**Platform:** Windows Server 2025  
**Status:** Active build  
**Updated:** July 30, 2026

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

## Why this matters

The objective is to move from inspecting logs independently on individual Windows systems toward centralized, repeatable security monitoring. Future phases will use Group Policy to standardize auditing and Windows Event Forwarding to deliver selected endpoint/server events to a central collector.

## Next

1. Review the existing `EORA - Baseline Security Policy` GPO before creating overlapping policy.
2. Define an Advanced Audit Policy baseline.
3. Configure Windows Firewall connection logging where appropriate.
4. Create and validate the first Windows Event Forwarding subscription.
5. Document before/after evidence and troubleshooting results.

> This is a lab implementation. Services are temporarily consolidated on the domain controller because of hardware and connectivity constraints; a production design would separate security/management workloads where appropriate.
