#!/usr/bin/env python3
"""Portfolio-only Smart CRM front-end alignment; safe & repeatable with backup."""
from pathlib import Path
import argparse, datetime, shutil, sys, tempfile, subprocess

ROOT=Path.cwd().resolve(); HERE=Path(__file__).resolve().parent
PATCH=['JS/api/auth-page.js','JS/api/prospect-detail-readonly.js','JS/api/administration-page.js','JS/api/commerciaux-page.js','JS/script.js']
COPY=['JS/api/prospect-editor.js','docs/PORTFOLIO_ALIGNMENT.md']
MARK='/* SMARTCRM-PORTFOLIO-ALIGNMENT-1 */'

def replace_once(s,old,new,rel):
    n=s.count(old)
    if n==1:return s.replace(old,new,1)
    if n==0 and new in s:return s
    raise RuntimeError(f'{rel}: signature manquante/ambiguë ({n}): {old[:75]}')

def update(rel,src):
    if MARK in src:return src
    s=src
    if rel.endswith('auth-page.js'):
        s=replace_once(s,"import { installAccountRecovery } from './account-recovery.js';\n",'',rel)
        s=replace_once(s,'  installAccountRecovery(supabase);\n','',rel)
        s=replace_once(s,"  if (page !== 'login.html') return;\n  const form = document.getElementById('login-form');", "  if (page !== 'login.html') return;\n  // Portfolio uses pre-created test accounts; recovery is out of scope.\n  document.querySelector('.forgot-password-link')?.remove();\n  const form = document.getElementById('login-form');",rel)
        s=MARK+'\n'+s
    elif rel.endswith('administration-page.js'):
        s=replace_once(s,"import { appendAdministrationOperations } from './management-operations.js';\n",'',rel)
        s=replace_once(s,'  appendAdministrationOperations(supabase, root, load);\n','',rel)
        s=MARK+'\n'+s
    elif rel.endswith('commerciaux-page.js'):
        s=replace_once(s,"import { appendCommerciauxOperations } from './management-operations.js';\n",'',rel)
        s=replace_once(s,'  appendCommerciauxOperations(supabase, root, load);\n','',rel)
        s=MARK+'\n'+s
    elif rel.endswith('prospect-detail-readonly.js'):
        if "import { appendProspectEditor } from './prospect-editor.js';" not in s:
            raise RuntimeError('Existing prospect editor integration missing; previous package not installed as expected.')
        if '    appendProspectEditor(supabase, record, load, content);' not in s:
            raise RuntimeError('Prospect editor mount not found.')
        s=MARK+'\n'+s
    elif rel=='JS/script.js':
        old='''let currentLanguage =
    localStorage.getItem(
        "smartcrm-language"
    ) || "fr";'''
        s=replace_once(s,old,'let currentLanguage = "en";',rel)
        old='''    currentLanguage =
        language;


    localStorage.setItem('''
        s=replace_once(s,old,'''    // Portfolio demo is English-only, regardless of stored language preferences.
    language = "en";
    currentLanguage = language;

    localStorage.setItem(''',rel)
        s=replace_once(s, '        initializeLanguageButtons();', "        document.querySelectorAll('.language-selector').forEach(el => el.remove());", rel)
        s=MARK+'\n'+s
    return s

def check_node(path,source):
    if not path.endswith('.js'):return
    p=subprocess.run(['node','--input-type=module','--check'],input=source,text=True,capture_output=True)
    if p.returncode:raise RuntimeError(f'JS syntax check failed ({path}): {p.stderr[:1000]}')

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    if not (ROOT/'login.html').exists() or not (ROOT/'JS/api/auth-page.js').exists():
        sys.exit('ERROR: open Terminal at Smart CRM project root (with login.html).')
    staged={}
    try:
        for rel in PATCH:
            target=ROOT/rel
            if not target.is_file():raise RuntimeError(f'Missing: {rel}')
            before=target.read_text(encoding='utf-8');after=update(rel,before)
            check_node(rel,after)
            if after!=before:staged[rel]=after.encode('utf-8')
        for rel in COPY:
            source=HERE/rel
            if not source.is_file():raise RuntimeError(f'Incomplete ZIP: {rel}')
            target=ROOT/rel
            if target.is_file() and target.read_bytes()==source.read_bytes():continue
            if target.is_file() and rel=='docs/PORTFOLIO_ALIGNMENT.md':
                raise RuntimeError(f'Document already differs: {rel}; refusing overwrite')
            if rel=='JS/api/prospect-editor.js' and not target.is_file():
                raise RuntimeError('Previous frontend package editor missing; installation order unexpected')
            staged[rel]=source.read_bytes()
        # Ensure no phantom management service imports on the active pages.
        def final_content(rel):return staged.get(rel,(ROOT/rel).read_bytes()).decode('utf-8')
        for rel in ['JS/api/administration-page.js','JS/api/commerciaux-page.js','JS/api/auth-page.js']:
            content=final_content(rel)
            for forbidden in ['appendAdministrationOperations(', 'appendCommerciauxOperations(', 'installAccountRecovery(']:
                if forbidden in content:raise RuntimeError(f'Out-of-scope operation still active: {forbidden}')
        if args.check:
            print('PREFLIGHT OK. To update:',', '.join(staged) or 'nothing');return
        if not staged:
            print('ALREADY ALIGNED. No changes.');return
        backup=Path.home()/'SmartCRM-Backups'/ROOT.name/('portfolio-'+datetime.datetime.now().strftime('%Y%m%d-%H%M%S-%f'))
        backup.mkdir(parents=True,exist_ok=False)
        originals={}
        try:
            for rel in staged:
                t=ROOT/rel; originals[rel]=t.read_bytes() if t.exists() else None
                if originals[rel] is not None:
                    b=backup/rel;b.parent.mkdir(parents=True,exist_ok=True);b.write_bytes(originals[rel])
            for rel,data in staged.items():
                t=ROOT/rel;t.parent.mkdir(parents=True,exist_ok=True)
                with tempfile.NamedTemporaryFile(dir=t.parent,delete=False) as f:
                    tmp=Path(f.name);f.write(data)
                tmp.replace(t)
        except Exception:
            for rel,data in originals.items():
                t=ROOT/rel
                if data is None:t.unlink(missing_ok=True)
                else:t.write_bytes(data)
            raise
        print('SUCCESS — portfolio alignment applied.')
        print('Modified:',', '.join(staged))
        print('Backup:',backup)
        print('No backend endpoint, account or GitHub change made.')
    except Exception as error:
        sys.exit('STOP — no new changes (or restored): '+str(error))

if __name__=='__main__':main()
