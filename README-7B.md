# Smart CRM — 7B: Backend integration scaffolding

## Scope
New files only. Existing HTML, CSS and `JS/script.js` are NOT replaced or modified. This scaffolding is NOT yet imported by any page, so the existing demo stays functional. No API calls run merely by adding these files.

## Install
Copy `JS/api/` and `JS/config/config.example.js` into the existing project's `JS/` directory. Copy `.env.example` to the project root for documentation. Do not rename the sample to an active config yet.

## Environment for static HTML/JS
A plain static site cannot read `.env` automatically. Before connected mode, decide how to inject public config at build/deploy time (e.g. Vite), or serve a generated public config file. The published Supabase publishable key is allowed in a browser; RLS and backend authorization remain mandatory. Never expose privileged secrets. Add local config to `.gitignore` when introduced.

## Pending validation with Mohcine
- Supabase URL and publishable key; n8n public ngrok base URL and CORS behavior.
- Exact `users`, `prospects`, `clients` tables/columns, and RLS grants.
- Supabase JS SDK import strategy and version for static site.
- RPC response schema and date semantics; CRM-02 and CRM-06 response bodies.
- Status conflict/error mapping, profile and role mapping.
- Confirm `POST /webhook/crm/lead-intake` public response contract.

## Next step (7C)
Connect login to Supabase Auth, replace demo access guards and clear account-specific caches on logout/account change. Integrate one page at a time. All UI strings must become English before release. Never silently fall back to demo data on API errors.

## Running
Continue using VS Code Live Server for the existing demo. ES modules are loaded only when explicitly imported in a future integration step.
