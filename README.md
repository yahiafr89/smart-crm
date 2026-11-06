# Smart CRM Portfolio — Clients + Conversion (Front-end only)

This pack ADDS the CRM-04 client directory without creating clients from the browser and adds an **all-time** lead-to-client conversion card. It uses existing Supabase Auth and RLS. No new webhook and no changes to Mohcine's backend.

## Install on Mac (VS Code terminal in the Smart CRM project directory)

1. Download and unzip `SMARTCRM_CLIENTS_CONVERSION.zip` to Downloads.
2. Run `python3 ~/Downloads/SMARTCRM_CLIENTS_CONVERSION/installer.py` (assuming Finder extracted that folder name).
3. Reload Live Server. Open **Clients** in the sidebar, then **Dashboard**.

The installer refuses incompatible existing files. It saves originals in `~/SmartCRM-Backups/clients-.../`, checks JS syntax, does not commit or push, and can be run twice.

## What is installed

- `clients.html` — read-only Clients page, all roles, existing CRM sidebar.
- `JS/api/clients-page.js` — real Supabase data, 20 rows per page, refresh, client-side search on loaded page, errors and empty states; does not fabricate client records.
- `JS/api/conversion-card.js` — live count-based **all-time** conversion rate.
- Patches `JS/api/auth-page.js` to protect Clients, mount page, and mount conversion KPI.
- Adds **Clients** navigation link to the four existing CRM HTML pages.

## Important functional definition / backend contract

- Administrator and manager see all clients; commercial sees only their clients **if and only if existing Supabase RLS on `clients` enforces this**. Front-end must not simulate RLS. If policy is absent, do not demonstrate access until Mohcine fixes it.
- `clients` records are written by CRM-04 on status `won`. No manual client creation.
- Conversion KPI = count of *visible clients* ÷ count of *visible prospects* × 100, using Supabase `head:true,count:'exact'` under the signed-in JWT. It is **all-time**, not bound to the Dashboard period. It assumes clients originate from converted prospects and each converted prospect yields one client. If this assumption is untrue, the metric needs a verified database RPC instead.
- The table uses `.select('*')` via the existing `JS/api/clients.js` adapter because actual client field names are not fully established. It displays names/company/email/phone when present, without inventing data. Limit SELECT permissions to public columns with appropriate RLS.
- No CSV export, account management, new services, or write operations.

## Files to synchronize into ChatGPT Project after installation

`clients.html`, `JS/api/clients-page.js`, `JS/api/conversion-card.js`, `JS/api/auth-page.js`, `dashboard.html`, `prospects.html`, `commerciaux.html`, `administration.html`.

## Validation boundaries

Automated checks verify JS syntax and patch application, not actual Supabase client data or policy behavior. Test data access under the three existing roles and the counts before making a public portfolio demo.
