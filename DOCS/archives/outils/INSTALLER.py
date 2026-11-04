#!/usr/bin/env python3
"""Patch ciblé des fichiers existants sans les écraser avec d'anciennes versions."""
from pathlib import Path
root = Path(__file__).resolve().parent
project = root.parent
api = project / 'JS' / 'api'
source = root / 'JS' / 'api' / 'prospect-status-control.js'
detail = api / 'prospect-detail-readonly.js'
prospects = api / 'prospects.js'
if not detail.exists() or not prospects.exists():
    raise SystemExit('ERREUR : placer le dossier smartcrm-crm02 à la racine du projet Smart CRM avant de lancer INSTALLER.py')
a = detail.read_text(encoding='utf-8')
b = prospects.read_text(encoding='utf-8')
import_line = "import { createProspectStatusControl } from './prospect-status-control.js';\n"
needle = "import { getProspect } from './prospects.js';\n"
anchor = '      card.append(label,value); content.append(card);\n    }\n'
if import_line not in a:
    if needle not in a: raise SystemExit('Version de la fiche non reconnue : aucun fichier modifié.')
    a = a.replace(needle,needle+import_line,1)
addition = "    content.append(createProspectStatusControl(supabase, record, load));\n"
if addition not in a:
    if anchor not in a: raise SystemExit('Version de la fiche non reconnue : aucun fichier modifié.')
    a=a.replace(anchor,anchor+'\n'+addition,1)
# Existing prospects.js references these utilities but lacks imports.
imports = "import { postJson, webhookUrl } from './client.js';\n"
if imports not in b:
    b=imports+b
if source.exists():
    (api / source.name).write_bytes(source.read_bytes())
detail.write_text(a,encoding='utf-8')
prospects.write_text(b,encoding='utf-8')
print('OK : module ajouté, fiche et appels API mis à jour. Aucune autre page modifiée.')
