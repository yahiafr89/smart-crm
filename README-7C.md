# Smart CRM — 7C: Supabase Auth test integration

## Scope
Auth-only test build. Retains original login design and FR/EN. Connects email/password sign-in to Supabase Auth and verifies the `users` business profile. Uses actual Auth session and signOut. Private pages intentionally display a **not connected yet** placeholder instead of demo figures or forms. This is NOT a production CRM and must not be deployed to customers.

## Installation
Back up your current project / create a Git branch first. Copy `login.html`, `dashboard.html`, `prospects.html`, `commerciaux.html`, `administration.html`, `JS/script.js`, `JS/api/auth-page.js`, `JS/api/auth.js`, and `JS/config/config.js` to their respective locations. Keep existing CSS and all other files. Use VS Code Live Server with internet access (SDK imported from esm.sh).

## Tests
1. Log in with a real Supabase Auth account (not demo credentials).
2. Check FR/EN on login and on the authenticated screen.
3. Verify each of the four users can authenticate and their role is displayed.
4. Verify administrator can open administration.html; manager/commercial cannot.
5. Verify sign out and access denial after sign out.
6. Verify there are NO demo figures or editable demo forms in connected mode.
7. Check browser console for Auth/RLS/CORS errors. Test real RLS separately with Mohcine; hiding UI does not enforce security.

## Notes
- `JS/config/config.js` contains only public Supabase URL and publishable key; NEVER put service_role, PostgreSQL credentials or n8n secrets there.
- Supabase manages session persistence; do not build your own token store.
- Do not silently fall back to demo on network failure.
- This test build is intentionally limited to auth; prospects, dashboard, clients, status transitions, assistant and admin mutations are not connected yet.
- If a role is not found in `public.users` or profile read is denied by RLS, sign-in is rejected.
