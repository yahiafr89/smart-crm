# SMART CRM — Portfolio frontend alignment (corrective patch)

**Purpose:** align the previously installed `SMARTCRM_FRONTEND_INTEGRATION_COMPLETE` package with Mohcine's authoritative backend specification. This package is NOT a production-ready release.

## Install (Mac, VS Code terminal at project root)

1. Unzip in Downloads.
2. Preview: `python3 ~/Downloads/SMARTCRM_PORTFOLIO_ALIGNMENT/installer.py --check`
3. Apply: `python3 ~/Downloads/SMARTCRM_PORTFOLIO_ALIGNMENT/installer.py`
4. Review: `git diff --stat` and `git status`.

The script makes a backup under `~/SmartCRM-Backups/<project>/portfolio-...` and **does not commit or push**. It stops on unexpected local file versions.

## What changes
- Removes UI wiring to fictional `/webhook/crm/admin/users`, `/webhook/crm/commercials` and integrated password recovery.
- Keeps user directory and commercial directory read-only.
- Replaces prospect editor with role-aware RLS-backed field editing, sending changed fields only.
- Manager/admin can reassign to a salesperson ID from active, accessible `commercials`; never an Auth user ID.
- Forces English translations across pages using existing translation engine; existing visual design stays untouched.
- Leaves CRM-01 to CRM-06 integrations and status transitions unchanged.

## Notes
- A current salesperson marked inactive but already assigned stays visible as the current value so users don't accidentally change it. New assignment is restricted to active accessible entries.
- If `commercials` doesn't expose `is_active` or `active`, the reassignment control is disabled. Confirm the existing field name with Mohcine rather than inventing an endpoint.
- Previous helper files (account-recovery.js, management-operations.js, frontend-operations.js) may remain on disk but are not imported by active pages; do not delete them until the wider project is checked.
- Existing markdown rendering and dashboard semantics weren't rewritten. Inspect these separately if actual UI differs from agreed contracts.
- Test with the four pre-created demo accounts and non-sensitive fictitious data; manual backend tests are still necessary.
