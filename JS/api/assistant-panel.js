import { askAssistant } from './assistant.js';
import { config } from '../config/config.js';

// CRM-06: each request is independent; this UI never writes to the database.
export function createAssistantPanel(supabase, { prospectId = null, getPeriod = null } = {}) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a,b) => fr() ? a : b;
  const box = document.createElement('section');
  box.style.cssText = 'grid-column:1/-1;padding:24px;border:1px solid #dbe3ee;border-radius:16px;background:#fff;min-width:0;';
  const heading = document.createElement('h2'); heading.style.cssText='margin:0 0 10px;font-size:20px;';
  const description = document.createElement('p');
  const actions = document.createElement('div'); actions.style.cssText='display:flex;flex-wrap:wrap;gap:10px;margin:14px 0;';
  const messageLabel = document.createElement('label'); messageLabel.htmlFor='crm-ai-message-'+(prospectId??'dashboard');
  const message = document.createElement('textarea'); message.id=messageLabel.htmlFor; message.maxLength=2000; message.rows=3;
  message.style.cssText='display:block;width:100%;max-width:700px;box-sizing:border-box;padding:10px;border:1px solid #cbd5e1;border-radius:10px;';
  const status = document.createElement('p'); status.setAttribute('role','status'); status.setAttribute('aria-live','polite');
  const answer = document.createElement('div'); answer.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.6;';
  const evidence = document.createElement('details'); const summary = document.createElement('summary');
  const evidenceBody = document.createElement('pre'); evidenceBody.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;';
  evidence.append(summary,evidenceBody);
  let pending = false;
  const button = (action, french, english, params) => {
    const b=document.createElement('button'); b.type='button'; b.className='btn-secondary';
    b.dataset.fr=french; b.dataset.en=english; b.dataset.action=action;
    b.addEventListener('click',async()=>{
      if(pending)return;
      pending=true; for(const item of actions.querySelectorAll('button')) item.disabled=true;
      status.textContent=tr('Demande en cours…','Request in progress…');answer.textContent='';evidenceBody.textContent='';evidence.hidden=true;
      try {
        const {data,error}=await supabase.auth.getSession(); if(error)throw error;
        const token=data?.session?.access_token; if(!token)throw new Error('Authentication required.');
        const payload={action,...params(),message:message.value.trim()};
        const result=await askAssistant(config,token,payload);
        if(!result || result.success !== true || result.action !== action)throw new Error('Unexpected assistant response.');
        answer.textContent=typeof result.answer==='string'?result.answer:JSON.stringify(result.answer??'',null,2);
        const details={prospect_ids:result.prospect_ids,generated_at:result.generated_at,evidence:result.evidence,read_only:result.read_only};
        evidenceBody.textContent=JSON.stringify(details,null,2);
        evidence.hidden=false;
        status.textContent=tr('Réponse reçue. Aucune action automatique effectuée.','Response received. No automatic action performed.');
      } catch(error){console.error('CRM-06 request failed',error);status.textContent=tr('Assistant indisponible : ','Assistant unavailable: ')+(error?.message||'Error');}
      finally{pending=false;for(const item of actions.querySelectorAll('button'))item.disabled=false;}
    });actions.append(b);
  };
  if(prospectId!==null){
    button('summarize_prospect','Résumer le prospect','Summarize prospect',()=>({prospect_id:prospectId}));
    button('draft_followup','Rédiger une relance','Draft follow-up',()=>({prospect_id:prospectId}));
  }else{
    const limitLabel=document.createElement('label'); const limit=document.createElement('input');limit.type='number';limit.min='1';limit.max='20';limit.value='10';limit.style.width='70px';
    limitLabel.append(document.createTextNode('Limit (1–20): '),limit);actions.append(limitLabel);
    button('prioritize_followups','Prioriser les relances','Prioritize follow-ups',()=>({limit:Number(limit.value)}));
    button('explain_dashboard','Expliquer le tableau de bord','Explain dashboard',()=>getPeriod?getPeriod():{});
  }
  function translate(){heading.textContent=tr('Assistant IA · CRM-06','AI Assistant · CRM-06');description.textContent=tr('Lecture seule : résumé, priorités, analyse et brouillons. Aucune relance n’est envoyée automatiquement.','Read-only: summaries, priorities, analysis and drafts. No follow-up is sent automatically.');messageLabel.textContent=tr('Instructions facultatives (2 000 caractères maximum)','Optional instructions (2,000 characters maximum)');summary.textContent=tr('Sources et métadonnées','Evidence and metadata');for(const b of actions.querySelectorAll('button'))b.textContent=fr()?b.dataset.fr:b.dataset.en;}
  box.append(heading,description,actions,messageLabel,message,status,answer,evidence);evidence.hidden=true;
  translate();new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  return box;
}
