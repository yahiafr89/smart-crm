import { askAssistant } from './assistant.js';
import { config } from '../config/config.js';

// CRM-06: render untrusted Markdown through DOM text nodes only; never parse response HTML.
const mdNode = (tag, text) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; return node; };
function renderInline(target, source) {
  const text = String(source);
  // Escaped Markdown markers, code spans, emphasis and strong; HTML remains literal text.
  const pattern = /(\\[\\`*_~|])|(`+)([\s\S]*?)\2|(\*\*|__)(.+?)\4|(\*|_)([^\n]+?)\6|(~~)(.+?)\8/g;
  let index = 0; let match;
  while ((match = pattern.exec(text))) {
    if (match.index > index) target.append(document.createTextNode(text.slice(index, match.index)));
    if (match[1]) target.append(document.createTextNode(match[1].slice(1)));
    else if (match[2]) target.append(mdNode('code', match[3]));
    else if (match[4]) { const node = mdNode('strong'); renderInline(node, match[5]); target.append(node); }
    else if (match[6]) { const node = mdNode('em'); renderInline(node, match[7]); target.append(node); }
    else if (match[8]) { const node = mdNode('del'); renderInline(node, match[9]); target.append(node); }
    index = pattern.lastIndex;
  }
  if (index < text.length) target.append(document.createTextNode(text.slice(index)));
}
function splitCells(line) {
  let s = line.trim(); if (s.startsWith('|')) s = s.slice(1); if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  const cells = []; let current = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i+1] === '|') { current += '|'; i++; }
    else if (s[i] === '|') { cells.push(current.trim()); current = ''; }
    else current += s[i];
  }
  cells.push(current.trim()); return cells;
}
const separatorCell = s => /^:?-{3,}:?$/.test(s.trim());
function isTable(lines, i) {
  if (i+1 >= lines.length || !lines[i].includes('|') || !lines[i+1].includes('|')) return false;
  const headers = splitCells(lines[i]); const separators = splitCells(lines[i+1]);
  return headers.length >= 2 && headers.length === separators.length && separators.every(separatorCell);
}
function renderMarkdown(container, markdown) {
  container.replaceChildren();
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      const code = []; const mark = fence[1][0]; const len = fence[1].length; i++;
      while (i < lines.length && !new RegExp('^\\s{0,3}'+(mark === '`' ? '`' : '~')+'{'+len+',}\\s*$').test(lines[i])) code.push(lines[i++]);
      if (i < lines.length) i++;
      const pre = mdNode('pre'); pre.append(mdNode('code', code.join('\n'))); container.append(pre); continue;
    }
    if (isTable(lines,i)) {
      const headers = splitCells(lines[i]); const align = splitCells(lines[i+1]);
      const scroller = mdNode('div'); scroller.className = 'crm-ai-table-scroll'; scroller.tabIndex = 0;
      scroller.setAttribute('role','region'); scroller.setAttribute('aria-label','Tableau de la réponse IA');
      const table = mdNode('table'); const head = mdNode('thead'); const hrow = mdNode('tr');
      headers.forEach((cell,j)=>{ const th=mdNode('th'); th.scope='col'; th.style.textAlign=align[j].startsWith(':')&&align[j].endsWith(':')?'center':align[j].endsWith(':')?'right':'left'; renderInline(th,cell); hrow.append(th); });
      head.append(hrow); table.append(head); const body = mdNode('tbody'); i+=2;
      while (i<lines.length && lines[i].trim() && lines[i].includes('|')) {
        const cells=splitCells(lines[i]); const row=mdNode('tr');
        headers.forEach((_,j)=>{const td=mdNode('td'); renderInline(td,cells[j]??''); row.append(td);});
        body.append(row); i++;
      }
      table.append(body); scroller.append(table); container.append(scroller); continue;
    }
    const heading=line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (heading) { const h=mdNode('h'+Math.min(heading[1].length+2,6)); renderInline(h,heading[2].replace(/\s+#+\s*$/,'')); container.append(h); i++; continue; }
    if (/^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { container.append(mdNode('hr')); i++; continue; }
    const listMatch=line.match(/^\s{0,3}([-+*]|\d+[.)])\s+(.+)$/);
    if (listMatch) {
      const ordered=/\d/.test(listMatch[1]); const list=mdNode(ordered?'ol':'ul');
      if(ordered)list.start=Number.parseInt(listMatch[1],10);
      while(i<lines.length) {
        const m=lines[i].match(/^\s{0,3}([-+*]|\d+[.)])\s+(.+)$/);
        if(!m || /\d/.test(m[1])!==ordered)break;
        const li=mdNode('li'); renderInline(li,m[2]); i++;
        while(i<lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-+*]|\d+[.)])\s+/.test(lines[i])) { li.append(document.createTextNode(' '+lines[i].trim())); i++; }
        list.append(li);
      }
      container.append(list); continue;
    }
    if (/^\s{0,3}>\s?/.test(line)) {
      const quote=mdNode('blockquote'); const parts=[];
      while(i<lines.length && /^\s{0,3}>\s?/.test(lines[i]))parts.push(lines[i++].replace(/^\s{0,3}>\s?/,''));
      renderInline(quote,parts.join('\n')); container.append(quote); continue;
    }
    const paragraph=[];
    while(i<lines.length && lines[i].trim() && (paragraph.length===0 || !isTable(lines,i)) && !/^\s{0,3}(?:#{1,6}\s|`{3,}|~{3,}|>\s?|[-+*]\s+|\d+[.)]\s+)/.test(lines[i])) paragraph.push(lines[i++]);
    if(!paragraph.length){paragraph.push(lines[i++]);}
    const p=mdNode('p'); paragraph.forEach((part,j)=>{if(j)p.append(mdNode('br'));renderInline(p,part);});container.append(p);
  }
}

export function createAssistantPanel(supabase, { prospectId = null, getPeriod = null } = {}) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a,b) => fr() ? a : b;
  const box = document.createElement('section');
  box.className='crm-ai-panel';
  box.style.cssText = 'grid-column:1/-1;padding:24px;border:1px solid #dbe3ee;border-radius:16px;background:#fff;min-width:0;max-width:100%;';
  const style=mdNode('style'); style.textContent=`
    .crm-ai-panel .crm-ai-answer{display:block;max-height:none!important;height:auto!important;overflow:visible!important;white-space:normal;overflow-wrap:anywhere;line-height:1.65;min-width:0}
    .crm-ai-panel .crm-ai-answer p{margin:12px 0}.crm-ai-panel .crm-ai-answer ul,.crm-ai-panel .crm-ai-answer ol{margin:12px 0;padding-left:25px}
    .crm-ai-panel .crm-ai-answer li{margin:5px 0}.crm-ai-panel .crm-ai-answer h3,.crm-ai-panel .crm-ai-answer h4,.crm-ai-panel .crm-ai-answer h5,.crm-ai-panel .crm-ai-answer h6{margin:20px 0 8px}
    .crm-ai-panel .crm-ai-table-scroll{max-width:100%;overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;margin:16px 0;border:1px solid #dbe3ee;border-radius:12px}
    .crm-ai-panel .crm-ai-table-scroll table{width:max-content;min-width:100%;border-collapse:collapse;table-layout:auto;font-size:14px}
    .crm-ai-panel .crm-ai-table-scroll th,.crm-ai-panel .crm-ai-table-scroll td{border-bottom:1px solid #e2e8f0;padding:11px 14px;vertical-align:top;white-space:normal;overflow-wrap:break-word;min-width:110px}
    .crm-ai-panel .crm-ai-table-scroll th{background:#f3f7ff;color:#1d3557;font-weight:700}
    .crm-ai-panel .crm-ai-answer pre{overflow-x:auto;white-space:pre;padding:14px;background:#f3f7ff;border-radius:10px}
    .crm-ai-panel .crm-ai-answer code{background:#f3f7ff;border-radius:4px;padding:1px 4px}.crm-ai-panel .crm-ai-answer pre code{padding:0}
    .crm-ai-panel .crm-ai-answer blockquote{border-left:3px solid #60a5fa;padding-left:14px;margin:14px 0;color:#475569}
    .crm-ai-panel .crm-ai-raw{white-space:pre-wrap;overflow-wrap:anywhere;max-height:none;overflow:visible}
    .crm-ai-panel .crm-ai-table-scroll:focus-visible,.crm-ai-panel button:focus-visible{outline:3px solid #60a5fa;outline-offset:2px}
  `;
  const heading = mdNode('h2'); heading.style.cssText='margin:0 0 10px;font-size:20px;';
  const description = mdNode('p');
  const actions = mdNode('div'); actions.style.cssText='display:flex;flex-wrap:wrap;gap:10px;margin:14px 0;';
  const messageLabel = mdNode('label'); messageLabel.htmlFor='crm-ai-message-'+(prospectId??'dashboard');
  const message = mdNode('textarea'); message.id=messageLabel.htmlFor; message.maxLength=2000; message.rows=3;
  message.style.cssText='display:block;width:100%;max-width:700px;box-sizing:border-box;padding:10px;border:1px solid #cbd5e1;border-radius:10px;';
  const status = mdNode('p'); status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
  const answer = mdNode('div'); answer.className='crm-ai-answer';
  const rawDetails=mdNode('details'); const rawSummary=mdNode('summary');
  const rawAnswer=mdNode('pre');rawAnswer.className='crm-ai-raw';
  const copy=mdNode('button');copy.type='button';copy.className='btn-secondary';
  copy.style.cssText='margin:10px 0;';
  let originalAnswer='';
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(originalAnswer);copy.textContent=tr('Copié','Copied');}catch(e){console.warn('Copy unavailable',e);copy.textContent=tr('Copie indisponible','Copy unavailable');}});
  rawDetails.append(rawSummary,copy,rawAnswer);
  const evidence = mdNode('details'); const summary = mdNode('summary');
  const evidenceBody = mdNode('pre'); evidenceBody.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;';
  evidence.append(summary,evidenceBody);
  let pending = false;
  const button = (action, french, english, params) => {
    const b=mdNode('button'); b.type='button'; b.className='btn-secondary';
    b.dataset.fr=french; b.dataset.en=english; b.dataset.action=action;
    b.addEventListener('click',async()=>{
      if(pending)return;
      pending=true; for(const item of actions.querySelectorAll('button')) item.disabled=true;
      status.textContent=tr('Demande en cours…','Request in progress…');answer.replaceChildren();originalAnswer='';rawAnswer.textContent='';evidenceBody.textContent='';evidence.hidden=true;rawDetails.hidden=true;
      try {
        const {data,error}=await supabase.auth.getSession(); if(error)throw error;
        const token=data?.session?.access_token; if(!token)throw new Error('Authentication required.');
        const payload={action,...params(),message:message.value.trim()};
        const result=await askAssistant(config,token,payload);
        if(!result || result.success !== true || result.action !== action)throw new Error('Unexpected assistant response.');
        originalAnswer=typeof result.answer==='string'?result.answer:JSON.stringify(result.answer??'',null,2);
        renderMarkdown(answer,originalAnswer);
        rawAnswer.textContent=originalAnswer;
        rawDetails.hidden=false;
        const details={prospect_ids:result.prospect_ids,generated_at:result.generated_at,evidence:result.evidence,read_only:result.read_only};
        evidenceBody.textContent=JSON.stringify(details,null,2);
        evidence.hidden=false;
        // Diagnostic: compare the exact network answer with the full raw view, including line 6.
        const networkLines=originalAnswer.replace(/\r\n?/g,'\n').split('\n');
        console.info('CRM-06 answer integrity', {characters:originalAnswer.length,lines:networkLines.length,line6:networkLines[5]??null,rawMatchesNetwork:rawAnswer.textContent===originalAnswer});
        status.textContent=tr('Réponse complète affichée. Aucune action automatique effectuée.','Complete response displayed. No automatic action performed.');
      } catch(error){console.error('CRM-06 request failed',error);status.textContent=tr('Assistant indisponible : ','Assistant unavailable: ')+(error?.message||'Error');}
      finally{pending=false;for(const item of actions.querySelectorAll('button'))item.disabled=false;}
    });actions.append(b);
  };
  if(prospectId!==null){
    button('summarize_prospect','Résumer le prospect','Summarize prospect',()=>({prospect_id:prospectId}));
    button('draft_followup','Rédiger une relance','Draft follow-up',()=>({prospect_id:prospectId}));
  }else{
    const limitLabel=mdNode('label'); const limit=mdNode('input');limit.type='number';limit.min='1';limit.max='20';limit.value='10';limit.style.width='70px';
    limitLabel.append(document.createTextNode('Limit (1–20): '),limit);actions.append(limitLabel);
    button('prioritize_followups','Prioriser les relances','Prioritize follow-ups',()=>({limit:Number(limit.value)}));
    button('explain_dashboard','Expliquer le tableau de bord','Explain dashboard',()=>getPeriod?getPeriod():{});
  }
  function translate(){heading.textContent=tr('Assistant IA · CRM-06','AI Assistant · CRM-06');description.textContent=tr('Lecture seule : résumé, priorités, analyse et brouillons. Aucune relance n’est envoyée automatiquement.','Read-only: summaries, priorities, analysis and drafts. No follow-up is sent automatically.');messageLabel.textContent=tr('Instructions facultatives (2 000 caractères maximum)','Optional instructions (2,000 characters maximum)');summary.textContent=tr('Sources et métadonnées','Evidence and metadata');rawSummary.textContent=tr('Réponse brute intégrale (vérification)','Full raw answer (verification)');if(!copy.textContent||['Copier la réponse','Copy answer'].includes(copy.textContent))copy.textContent=tr('Copier la réponse','Copy answer');for(const b of actions.querySelectorAll('button'))b.textContent=fr()?b.dataset.fr:b.dataset.en;}
  box.append(style,heading,description,actions,messageLabel,message,status,answer,rawDetails,evidence);evidence.hidden=true;rawDetails.hidden=true;
  translate();const observer=new MutationObserver(()=>{if(box.isConnected)translate();else observer.disconnect();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  return box;
}
