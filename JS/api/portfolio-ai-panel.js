/** Smart CRM — Portfolio AI assistant. Existing CRM-06 endpoint only. */
import { askAssistant } from './assistant.js';
import { config } from '../config/config.js';

const make = (tag, cls = '', label = '') => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (label) el.textContent = label;
  return el;
};
const escapeChars = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline = text => escapeChars(text).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
/* Safe Markdown subset. The only HTML is generated from escaped text. */
function markdown(root, raw) {
  root.replaceChildren();
  const lines = String(raw).replace(/\r\n?/g,'\n').split('\n');
  const split = line => line.trim().replace(/^\||\|$/g,'').split(/(?<!\\)\|/).map(s=>s.replace(/\\\|/g,'|').trim());
  let i=0;
  while(i<lines.length){
    const line=lines[i]; if(!line.trim()){i++;continue;}
    if(i+1<lines.length && line.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i+1])){
      const headers=split(lines[i]), rows=[];i+=2;
      while(i<lines.length && lines[i].includes('|')&&lines[i].trim()){rows.push(split(lines[i++]));}
      const wrap=make('div','crm-portfolio-ai-table-scroll'),table=make('table'),head=make('thead'),body=make('tbody'),tr=make('tr');
      for(const x of headers){const th=make('th');th.textContent=x;tr.append(th);}head.append(tr);table.append(head);
      for(const values of rows){const row=make('tr');for(let j=0;j<headers.length;j++){const cell=make('td');cell.textContent=values[j]??'';row.append(cell);}body.append(row);}table.append(body);wrap.append(table);root.append(wrap);continue;
    }
    if(/^#{1,6} /.test(line)){const match=line.match(/^(#{1,6})\s+(.+)/),h=make('h'+Math.min(4,match[1].length+1));h.textContent=match[2];root.append(h);i++;continue;}
    if(/^\s*[-*+]\s+/.test(line)||/^\s*\d+[.)]\s+/.test(line)){
      const ordered=/^\s*\d+[.)]/.test(line);const list=make(ordered?'ol':'ul');
      while(i<lines.length && (ordered?/^\s*\d+[.)]\s+/:/^\s*[-*+]\s+/).test(lines[i])){const li=make('li');li.textContent=lines[i++].replace(/^\s*(?:[-*+]|\d+[.)])\s+/,'');list.append(li);}root.append(list);continue;
    }
    if(/^```/.test(line)){i++;const code=[];while(i<lines.length&&!/^```/.test(lines[i]))code.push(lines[i++]);if(i<lines.length)i++;const pre=make('pre'),element=make('code');element.textContent=code.join('\n');pre.append(element);root.append(pre);continue;}
    const p=make('p');const parts=[];
    while(i<lines.length && lines[i].trim() && !/^\s*(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|```)/.test(lines[i]) && !(i+1<lines.length && /^\s*\|?\s*:?-{3,}:?/.test(lines[i+1]) && lines[i].includes('|')))parts.push(lines[i++]);
    if(!parts.length){parts.push(lines[i++]);}
    p.innerHTML=parts.map(inline).join('<br>');root.append(p);
  }
}
export function createPortfolioAIPanel(supabase,{prospectId=null,getPeriod=null}={}){
  const fr=()=>document.documentElement.lang!=='en',t=(a,b)=>fr()?a:b;
  const root=make('section','crm-portfolio-ai');root.style.cssText='position:fixed;right:22px;bottom:20px;z-index:21000;font-family:inherit;';
  const launch=make('button','crm-portfolio-ai-launch');launch.type='button';launch.setAttribute('aria-expanded','false');
  const panel=make('div','crm-portfolio-ai-window');panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');
  const top=make('div','crm-portfolio-ai-top'),heading=make('h2'),close=make('button','crm-portfolio-ai-close','×');close.type='button';close.setAttribute('aria-label','Close');top.append(heading,close);
  const desc=make('p','crm-portfolio-ai-note'),actions=make('div','crm-portfolio-ai-actions'),status=make('p','crm-portfolio-ai-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const answer=make('div','crm-portfolio-ai-answer'),evidence=make('details'),summary=make('summary'),evidencePre=make('pre');evidence.append(summary,evidencePre);evidence.hidden=true;
  const copy=make('button','crm-portfolio-ai-copy');copy.type='button';copy.hidden=true;
  let currentAnswer='',busy=false;
  const entries=prospectId!==null?[
    ['summarize_prospect','Résumer ce prospect','Summarize this prospect',()=>({prospect_id:Number(prospectId)})],
    ['draft_followup','Rédiger une relance','Draft follow-up',()=>({prospect_id:Number(prospectId)})]
  ]:[
    ['prioritize_followups','Prioriser les relances','Prioritize follow-ups',()=>({})],
    ['explain_dashboard','Expliquer le tableau de bord','Explain dashboard',()=>getPeriod?getPeriod():{}]
  ];
  function translate(){launch.textContent=t('✦ Demander à l’IA','✦ Ask AI');heading.textContent=t('Assistant IA','AI Assistant');desc.textContent=t('Consultation et brouillons uniquement. Aucun message n’est envoyé.','Read-only insights and drafts. No message is sent.');summary.textContent=t('Sources et métadonnées','Evidence and metadata');copy.textContent=t('Copier la réponse','Copy answer');for(const b of actions.children)b.textContent=t(b.dataset.fr,b.dataset.en);}
  for(const [action,frLabel,enLabel,params] of entries){const button=make('button');button.type='button';button.dataset.fr=frLabel;button.dataset.en=enLabel;button.addEventListener('click',async()=>{
    if(busy)return;busy=true;for(const x of actions.children)x.disabled=true;status.textContent=t('Chargement…','Loading…');answer.replaceChildren();evidence.hidden=true;copy.hidden=true;
    try{
      const {data,error}=await supabase.auth.getSession();if(error)throw error;
      const token=data?.session?.access_token;if(!token)throw Object.assign(new Error('Session expired.'),{status:401});
      const result=await askAssistant(config,token,{action,...params()});
      if(!result||result.success!==true||result.action!==action||typeof result.answer!=='string')throw new Error('Invalid AI response.');
      currentAnswer=result.answer;markdown(answer,currentAnswer);copy.hidden=false;
      evidencePre.textContent=JSON.stringify({evidence:result.evidence,prospect_ids:result.prospect_ids,generated_at:result.generated_at,read_only:result.read_only},null,2);evidence.hidden=false;
      status.textContent=t('Réponse reçue.','Answer received.');
    }catch(error){console.error('CRM-06 error',error);const s=Number(error.status||0);status.textContent=s===401?t('Session expirée : reconnectez-vous.','Session expired: sign in again.'):s===403||s===404?t('Accès refusé.','Access denied.'):s===503?t('Service IA indisponible.','AI service unavailable.'):t('Assistant indisponible : ','Assistant unavailable: ')+(error.message||'Network error');}
    finally{busy=false;for(const x of actions.children)x.disabled=false;}
  });actions.append(button);}
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentAnswer);status.textContent=t('Copié.','Copied.');}catch{status.textContent=t('Copie indisponible.','Copy unavailable.');}});
  function show(open){panel.hidden=!open;launch.setAttribute('aria-expanded',String(open));if(open)close.focus();else launch.focus();}
  launch.addEventListener('click',()=>show(panel.hidden));close.addEventListener('click',()=>show(false));
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)show(false);});
  panel.append(top,desc,actions,status,answer,copy,evidence);root.append(launch,panel);translate();
  const observer=new MutationObserver(()=>{if(!root.isConnected){observer.disconnect();return;}translate();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  return root;
}
