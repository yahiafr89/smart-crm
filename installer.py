#!/usr/bin/env python3
"""Smart CRM front-end additions. Preflight + automatic backup + atomic restore on error."""
from pathlib import Path
from datetime import datetime
import argparse, shutil, sys, subprocess, tempfile, hashlib

HERE=Path(__file__).resolve().parent
ROOT=Path.cwd().resolve()
NEW=['JS/api/frontend-operations.js','JS/api/prospect-editor.js','JS/api/account-recovery.js','JS/api/management-operations.js','JS/api/frontend-enhancements.css','docs/CONTRAT_BACKEND_MOHCINE.md']
TARGETS=['JS/api/auth-page.js','JS/api/prospect-detail-readonly.js','JS/api/administration-page.js','JS/api/commerciaux-page.js']
MARK='/* SMARTCRM-FRONTEND-RELEASE-1 */'

def one(s, old, new, label):
    if s.count(old)!=1:raise ValueError(f'{label}: point d\'intégration introuvable ou ambigu ({s.count(old)}). Aucune modification.')
    return s.replace(old,new,1)

def transform(path, s):
    if MARK in s: return s
    if path=='JS/api/auth-page.js':
        s=one(s,"import { signIn, signOut, getBusinessProfile } from './auth.js';",
              "import { signIn, signOut, getBusinessProfile } from './auth.js';\n"+
              "import { installAccountRecovery } from './account-recovery.js';\n"+MARK,'auth imports')
        s=one(s,'const supabase = createClient(config.supabaseUrl, config.supabasePublishableKey);',
              "const supabase = createClient(config.supabaseUrl, config.supabasePublishableKey);\n"+
              "if (config.mode === 'connected' && !document.querySelector('link[data-sci-css]')) {\n"+
              "  const css=document.createElement('link');css.rel='stylesheet';css.href='JS/api/frontend-enhancements.css';css.dataset.sciCss='1';document.head.append(css);\n}\n",'auth CSS')
        s=one(s,"  if (page !== 'login.html') return;\n  const form = document.getElementById('login-form');",
              "  if (page !== 'login.html') return;\n  installAccountRecovery(supabase);\n  const form = document.getElementById('login-form');",'auth recovery')
    elif path=='JS/api/prospect-detail-readonly.js':
        s=one(s,"import { createProspectStatusControl } from './prospect-status-control.js';",
              "import { createProspectStatusControl } from './prospect-status-control.js';\n"+
              "import { appendProspectEditor } from './prospect-editor.js';\n"+MARK,'prospect imports')
        s=one(s,'    content.append(createProspectStatusControl(supabase, record, load));',
              '    content.append(createProspectStatusControl(supabase, record, load));\n    appendProspectEditor(supabase, record, load, content);','prospect editor mount')
    elif path=='JS/api/administration-page.js':
        s="import { appendAdministrationOperations } from './management-operations.js';\n"+MARK+'\n'+s
        ix=s.rfind('  load();')
        if ix<0 or s.count('  load();')!=1:raise ValueError('administration: appel load() ambigu')
        s=s[:ix]+'  appendAdministrationOperations(supabase, root, load);\n'+s[ix:]
    elif path=='JS/api/commerciaux-page.js':
        s="import { appendCommerciauxOperations } from './management-operations.js';\n"+MARK+'\n'+s
        ix=s.rfind('  load();')
        if ix<0 or s.count('  load();')!=1:raise ValueError('commerciaux: appel load() ambigu')
        s=s[:ix]+'  appendCommerciauxOperations(supabase, root, load);\n'+s[ix:]
    return s

def main():
    p=argparse.ArgumentParser();p.add_argument('--check',action='store_true',help='prévisualisation seule');args=p.parse_args()
    if not (ROOT/'login.html').is_file() or not (ROOT/'JS/api/auth-page.js').is_file():
        sys.exit('ERREUR : ouvrir le terminal à la racine du projet Smart CRM (dossier avec login.html).')
    updates={}
    try:
        for rel in TARGETS:
            f=ROOT/rel
            if not f.is_file():raise ValueError(f'Fichier existant manquant: {rel}')
            before=f.read_text(encoding='utf-8');after=transform(rel,before)
            if after!=before:updates[rel]=after
        for rel in NEW:
            src=HERE/rel;dest=ROOT/rel
            if not src.is_file():raise ValueError('ZIP incomplet: '+rel)
            if dest.exists() and dest.read_bytes()!=src.read_bytes():
                raise ValueError(f'Le fichier {rel} existe avec un contenu différent. Aucun remplacement automatique.')
        for rel in ['JS/api/auth-page.js','JS/api/prospect-detail-readonly.js']:
            current=updates.get(rel,(ROOT/rel).read_text(encoding='utf-8'))
            if MARK not in current:raise ValueError('Intégration partielle détectée: '+rel)
        print('Pré-vérification OK :',len(updates),'fichiers existants à adapter,',len(NEW),'fichiers à ajouter.')
        if args.check:print('MODE --check : aucun fichier modifié.');return
    except Exception as ex:
        sys.exit('ARRÊT SANS MODIFICATION : '+str(ex))
    modified=list(updates)+[r for r in NEW if not (ROOT/r).exists()]
    if not modified:print('DÉJÀ INSTALLÉ : aucune modification.');return
    backup=Path.home()/'SmartCRM-Backups'/ROOT.name/('frontend-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
    backup.mkdir(parents=True,exist_ok=False)
    originals={}
    try:
        for rel in modified:
            dst=ROOT/rel;originals[rel]=dst.read_bytes() if dst.exists() else None
            if originals[rel] is not None:
                target=backup/rel;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(originals[rel])
        for rel,data in updates.items():
            dst=ROOT/rel;dst.write_text(data,encoding='utf-8')
        for rel in NEW:
            dst=ROOT/rel
            if not dst.exists():dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(HERE/rel,dst)
        # Validation without external dependencies: confirms all integration markers, references and assets.
        for rel in TARGETS:
            if MARK not in (ROOT/rel).read_text(encoding='utf-8'):
                raise ValueError('Intégration non confirmée: '+rel)
        for rel in NEW:
            if not (ROOT/rel).is_file():raise ValueError('Fichier ajouté introuvable: '+rel)
    except Exception as ex:
        for rel,old in originals.items():
            target=ROOT/rel
            if old is None:target.unlink(missing_ok=True)
            else:target.write_bytes(old)
        sys.exit('ERREUR : modifications annulées automatiquement : '+str(ex))
    print('INSTALLATION TERMINÉE avec succès.')
    print('Sauvegarde des fichiers remplacés :',backup)
    print('Fichiers modifiés :',', '.join(updates) if updates else '(aucun, installation déjà partielle)')
    print('Nouveaux fichiers :',', '.join(r for r in NEW if originals.get(r) is None))
    print('Contrat Mohcine : docs/CONTRAT_BACKEND_MOHCINE.md')
    print('IMPORTANT : tester les fonctionnalités; les opérations admin/commerciaux attendent les endpoints backend.')

if __name__=='__main__':main()
