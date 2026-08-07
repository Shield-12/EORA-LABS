# Active Directory Password and Account Lockout Baseline

**Environment:** EORA.COMMAND  
**Platform:** Windows Server 2025  
**Status:** In progress / validation pending  
**Updated:** August 7, 2026

## What I changed

I began hardening the Eora Enterprise Lab by documenting the current Active Directory password and account lockout settings. This work belongs with the security telemetry baseline because authentication policy directly affects identity security, brute-force resistance, audit interpretation, and service-desk workflow.

The lab currently includes:

- `EORA-COMMAND-00` / `EORA-COMMAND-001` as the primary domain controller role in the lab environment.
- `EORA-FS01` as the file-server workload.
- Two domain-joined user client systems planned for future validation.

Because this environment is running on notebook hardware, several services are temporarily consolidated. I am documenting that constraint explicitly instead of presenting the lab as a production-resilient design.

## Password policy evidence

Exported policy settings captured from Group Policy Management:

| Policy | Setting |
|---|---:|
| Enforce password history | 2 passwords remembered |
| Maximum password age | 90 days |
| Minimum password age | 30 days |
| Minimum password length | Not Defined |
| Minimum password length audit | 12 characters |
| Password must meet complexity requirements | Enabled |
| Relax minimum password length limits | Not Defined |
| Store passwords using reversible encryption | Disabled |

## Account lockout policy evidence

Exported account lockout settings captured from Group Policy Management:

| Policy | Setting |
|---|---:|
| Account lockout duration | 30 minutes |
| Account lockout threshold | 5 invalid logon attempts |
| Allow Administrator account lockout | Enabled |
| Reset account lockout counter after | 30 minutes |

## Engineering rationale

I selected a five-attempt lockout threshold to balance brute-force resistance with normal user error. Three failed attempts can create unnecessary service-desk volume when users mistype or forget a password, while a much higher threshold gives an attacker more room to guess credentials. A 30-minute lockout duration limits repeated attempts while still allowing normal users to retry after a short waiting period.

I kept reversible encryption disabled because storing passwords in a reversible form weakens credential security and should only be considered for a documented legacy compatibility requirement.

I documented password length auditing separately from enforced minimum length so I can observe whether candidate passwords meet a 12-character target before deciding whether to enforce that value across the domain. This keeps the lab change deliberate instead of blindly enabling controls without measuring user impact.

## Important correction discovered during testing

While testing with a standard user account, I attempted logon against the domain controller and received a message indicating the account was not allowed to log on to that device. That result is expected in a properly restricted environment: ordinary users should authenticate to domain-joined client systems, not directly to a domain controller.

I am documenting this as a design lesson rather than treating it as a failure. The next validation step is to test the same identity policy from domain-joined client machines.

## Validation plan

1. Confirm the intended GPO scope and link location.
2. Run `gpupdate /force` on the domain controller and future client systems.
3. Verify effective policy with `net accounts /domain`.
4. Create or use a controlled test user account.
5. Test password complexity behavior.
6. Test account lockout behavior from a domain-joined client, not from the domain controller.
7. Capture screenshots and exported policy reports as implementation evidence.
8. Update this page after workstation validation is complete.

## Current limitation

This documentation does not yet claim completed end-user workstation validation. Two user client systems are still planned. Until that testing is complete, this should be treated as a documented configuration and rationale record, not a finished production-style authentication control validation.

## Portfolio takeaway

This change shows how I approach identity hardening: define the threat, choose a defensible control, document the trade-off, test from the correct system role, and preserve evidence for future review.
