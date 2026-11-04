import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const pages=['index.html','about.html','services.html','contact.html','login.html','dashboard.html','prospects.html','commerciaux.html','administration.html'];
const required=['CSS/style.css','JS/script.js','JS/api/auth-page.js','JS/api/prospects-readonly.js','JS/api/dashboard-page.js','JS/api/administration-page.js','JS/api/commerciaux-page.js'];
let failures=0, warnings=0;
const fail=s=>{console.error('ÉCHEC:',s);failures++;};
const warn=s=>{console.warn('À VÉRIFIER:',s);warnings++;};
for(const file of [...pages,...required])if(!fs.existsSync(file))fail('Fichier manquant : '+file);
for(const page of pages){if(!fs.existsSync(page))continue;const html=fs.readFileSync(page,'utf8');
  if(!/<html\b[^>]*lang=/i.test(html))warn(page+' : attribut lang absent');
  for(const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)){const ref=match[1];if(/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)||ref.startsWith('//'))continue;const clean=ref.split(/[?#]/)[0];if(!clean)continue;const target=path.resolve(path.dirname(page),decodeURIComponent(clean));if(!fs.existsSync(target))warn(page+' : ressource non trouvée '+ref);}
}
function walk(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):x.name.endsWith('.js')?[path.join(dir,x.name)]:[]);}
for(const js of walk('JS')){try{execFileSync(process.execPath,['--input-type=module','--check'],{input:fs.readFileSync(js,'utf8'),stdio:'pipe'});}catch{fail('Syntaxe JS : '+js);}}
console.log(`Audit statique terminé : ${failures} échec(s), ${warnings} avertissement(s).`);
process.exitCode=failures?1:0;
