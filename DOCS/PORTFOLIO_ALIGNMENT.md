# Smart CRM — Fiverr / Upwork portfolio alignment

## Scope
A functional **English-language portfolio demonstration** using existing Supabase Auth, PostgreSQL/RLS and n8n CRM-01 to CRM-06. Four pre-existing Auth users (two salespeople, one manager, one administrator). No production launch or new privileged workflow creation.

## Operations retained
- Sign-in/sign-out, persistent Supabase session, real business profile and roles.
- Prospect reads by RLS and authenticated, whitelist-constrained edits.
- Salesperson: own prospects, edit `notes` and `next_follow_up` only.
- Manager/administrator: all prospects; additionally edit first/last name, company, email, phone, qualification, priority, reason, recommended_action and assignment.
- Assignment uses `commercials.id` and Supabase JWT/RLS; eligible salesperson list must expose an `active` or `is_active` boolean. If neither is exposed, dropdown remains disabled rather than guessing.
- Status changes ONLY via `POST /webhook/crm-02-status-management` with `{id,new_status}` and Bearer JWT.
- Dashboard via `get_crm_dashboard`, AI via CRM-06 existing four actions.
- Users and commercial directory read-only. No invitation/password-recovery/account mutation routes.
- Clients created by PostgreSQL CRM-04 on Won; no duplicate browser-side creation.

## Backend assumptions to confirm without changing rules
1. `prospects` columns `qualification`, `priority`, `reason`, `recommended_action`, `notes`, `next_follow_up`, `assigned_commercial_id` exist and are editable according to existing RLS.
2. `commercials` exposes an active marker (`active` or `is_active`). A missing marker disables reassignment in the UI and should be mapped to the *existing* column, not implemented as a new endpoint.
3. `get_crm_dashboard` response has agreed period/current fields and dashboard labels must reflect actual semantics.
4. Production-style password reset is OUT OF SCOPE for portfolio.
5. The actual browser origin is allowed by n8n CORS policy. ngrok can remain for portfolio if stable during the demo.

## In-scope manual demo
Sign in -> role-scoped prospects -> allowed edits -> status transition -> dashboard -> won/client conversion -> AI assistant. Use fictitious records; never paste secrets or credentials into screenshots.

## Known limitations
- No back-end live service was called by this package. Script validation cannot assert successful network/RLS behaviour.
- The previous package's helper files may remain in the project unused; the installer disables their import points rather than deleting potentially user-modified files.
- This package does not rebuild the CRM, modify Supabase SQL, or implement a production release.
