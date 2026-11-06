Smart CRM - Add missing Edit details button to prospect detail.
1. Unzip in Downloads.
2. Open project root in VS Code terminal.
3. python3 ~/Downloads/SMARTCRM_EDIT_BUTTON_FIX/install.py
4. Open Prospects > View details and hard refresh (Cmd+Shift+R).
Patch only JS/api/prospect-detail-readonly.js; add JS/api/prospect-editor.js only if absent.
No changes to Supabase, n8n or other project files. Existing target backed up in DOCS/backups.
