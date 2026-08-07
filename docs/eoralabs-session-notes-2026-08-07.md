# EoraLabs Session Notes — August 7, 2026

**Environment:** EORA.COMMAND  
**Platform:** Windows Server 2025 / GitHub Pages  
**Status:** Working notes / living record  
**Updated:** August 7, 2026

## Purpose

I captured this note to preserve the practical engineering decisions made during the August 7, 2026 EoraLabs working session. The goal was not to archive a full chat transcript. The goal was to record the durable technical decisions, documentation standards, and next actions that matter for the portfolio and lab.

## Portfolio direction

EoraLabs should read primarily as my engineering record, not as a third-person biography. The site should explain what I built, what I configured, what I verified, what remains in progress, and what I learned.

I will still keep my name where it functions as identity, authorship, branding, contact metadata, or page title. The narrative body copy should use first person where appropriate.

## Current lab topology

The current EORA.COMMAND lab is being documented as a constrained but deliberate Windows Server lab environment.

- `EORA-COMMAND-00` / `EORA-COMMAND-001` serves as the primary domain controller role in the lab.
- `EORA-FS01` represents the file-server workload.
- Two domain-joined user client systems are planned for future validation.

Because the lab is running on notebook hardware, some services are temporarily consolidated. I am documenting that limitation rather than pretending the environment is production-resilient.

## Identity baseline documented

I documented the Active Directory password and account lockout baseline as part of the broader security build record.

Current captured password-policy evidence includes:

- Enforce password history: 2 passwords remembered.
- Maximum password age: 90 days.
- Minimum password age: 30 days.
- Minimum password length: Not Defined.
- Minimum password length audit: 12 characters.
- Password complexity requirements: Enabled.
- Reversible password encryption: Disabled.

Current captured account-lockout evidence includes:

- Account lockout threshold: 5 invalid logon attempts.
- Account lockout duration: 30 minutes.
- Reset account lockout counter after: 30 minutes.
- Administrator account lockout: Enabled.

## Important lesson from testing

A standard user logon attempt against the domain controller returned a message indicating that the account was not allowed to log on to that device. I am documenting that as a role-separation lesson, not as a failed user-profile validation.

Standard users should validate authentication behavior from domain-joined client systems. They should not log directly into the domain controller during normal testing.

## Documentation standard

The site and repository should not overclaim. I will distinguish between:

- settings that were configured,
- settings that were exported as evidence,
- settings that were verified as effective,
- and settings that still require endpoint or user-client validation.

The guiding rule remains:

> If I do not log it, it did not happen.

## GitHub and deployment record

During the session, I used a branch-and-pull-request workflow to stage the Active Directory identity-baseline documentation and first-person site updates. After review, the changes were merged into `main` so the live GitHub Pages site could reflect the deployed portfolio direction.

## Next validation steps

1. Confirm the intended Group Policy scope and link location before claiming domain-wide enforcement.
2. Run `gpupdate /force` where appropriate.
3. Verify effective domain policy with `net accounts /domain`.
4. Create two domain-joined client systems.
5. Test password and lockout behavior from a client machine, not from the domain controller.
6. Export supporting evidence and update the documentation after validation.

## Portfolio takeaway

This session strengthened the portfolio by connecting real lab work to professional engineering behavior: make the change, record the evidence, document the limitation, explain the trade-off, and avoid claiming validation before it is complete.
