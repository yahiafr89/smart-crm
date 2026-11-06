/** Smart CRM portfolio: role-aware edit UI. RLS remains authoritative. */
import { updateProspect } from './prospects.js';

const COMMON = ['notes', 'next_follow_up'];
const MANAGER = ['first_name', 'last_name', 'company', 'email', 'phone', 'qualification', 'priority', 'reason', 'recommended_action', 'assigned_commercial_id'];
const DEFINITIONS = {
  first_name: ['First name', 'text', 120], last_name: ['Last name', 'text', 120],
  company: ['Company', 'text', 200], email: ['Email', 'email', 250], phone: ['Phone', 'tel', 50],
  qualification: ['AI qualification', 'text', 500], priority: ['Priority', 'text', 100],
  reason: ['Analysis / summary', 'textarea', 4000],
  recommended_action: ['Recommended action', 'textarea', 4000],
  notes: ['Notes', 'textarea', 4000], next_follow_up: ['Next follow-up', 'datetime-local', 0]
};
function element(tag, text, className) {
  const node=document.createElement(tag);
  if (text !== undefined) node.textContent=text;
  if (className) node.className=className;
  return node;
}
function formatLocalDate(value) {
  if (!value) return '';
  const d=new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function normalizeDate(value) {
  if (!value) return null;
  const date=new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error('Invalid follow-up date.');
  return date.toISOString();
}
function setMessage(node,text,isError=false) {
  node.textContent=text;node.setAttribute('role',isError?'alert':'status');
}
async function eligibleCommercials(supabase) {
  // Read through the current JWT and RLS. Backend may expose `is_active` or `active`.
  const {data,error}=await supabase.from('commercials').select('*').order('display_name',{ascending:true}).limit(200);
  if(error)throw error;
  const all=Array.isArray(data)?data:[];
  const hasFlag=all.length>0 && all.every(row=>typeof row.is_active==='boolean'||typeof row.active==='boolean');
  return {rows:hasFlag?all.filter(row=>row.is_active===true||row.active===true):[],hasFlag};
}

export function createProspectEditor(supabase,prospect,onSaved) {
  const role=document.documentElement.dataset.authRole;
  const manager=role==='manager'||role==='administrator';
  const allowed=manager?[...COMMON,...MANAGER]:role==='commercial'?[...COMMON]:[];
  const section=element('section',undefined,'sci-card');section.style.gridColumn='1/-1';
  section.append(element('h2','Edit prospect'));
  const form=element('form',undefined,'sci-form');
  const inputs=new Map();
  const fields=allowed.filter(key=>key!=='assigned_commercial_id');
  for(const key of fields) {
    const [label,type,maxLength]=DEFINITIONS[key];
    const wrapper=element('label',undefined,'sci-field');wrapper.append(element('span',label));
    const node=document.createElement(type==='textarea'?'textarea':'input');
    if(type!=='textarea')node.type=type;
    else node.rows=3;
    node.name=key;
    if(maxLength)node.maxLength=maxLength;
    node.value=key==='next_follow_up'?formatLocalDate(prospect[key]):String(prospect[key]??'');
    wrapper.append(node);form.append(wrapper);inputs.set(key,node);
  }
  if(manager) {
    const wrapper=element('label',undefined,'sci-field');wrapper.append(element('span','Assigned salesperson'));
    const select=document.createElement('select');select.name='assigned_commercial_id';select.disabled=true;
    const loading=element('option','Loading active salespeople…');loading.value='';select.append(loading);
    wrapper.append(select);form.append(wrapper);inputs.set('assigned_commercial_id',select);
    eligibleCommercials(supabase).then(({rows,hasFlag})=>{
      select.replaceChildren();
      if(!hasFlag){const option=element('option','Active salesperson field not exposed; reassignment unavailable');option.value='';select.append(option);return;}
      const unassigned=element('option','Unassigned');unassigned.value='';select.append(unassigned);
      for(const row of rows){const o=element('option',row.display_name||String(row.id));o.value=String(row.id);select.append(o);}
      const current=String(prospect.assigned_commercial_id??'');
      if(current && !rows.some(row=>String(row.id)===current)) {
        const keep=element('option',`Current assignment (${current}) — not eligible for new assignment`);
        keep.value=current;select.append(keep);
      }
      select.value=current;select.disabled=false;
    }).catch(error=>{
      console.error('Salesperson selection unavailable',error);
      select.replaceChildren(element('option','Cannot load eligible salespeople'));
    });
  }
  const actions=element('div',undefined,'sci-actions');
  const submit=element('button','Save changes','btn-primary');submit.type='submit';
  const cancel=element('button','Cancel','sci-secondary');cancel.type='button';
  const feedback=element('p');feedback.setAttribute('aria-live','polite');
  actions.append(submit,cancel);form.append(actions,feedback);section.append(form);
  cancel.addEventListener('click',()=>section.remove());
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const changes={};
    try {
      for(const [key,node] of inputs) {
        if(node.disabled)continue;
        let value=node.value.trim();
        if(key==='next_follow_up') {
          value=normalizeDate(value);
          const prior=prospect[key]?new Date(prospect[key]).getTime():null;
          const next=value?new Date(value).getTime():null;
          if(prior!==next)changes[key]=value;
        } else if(key==='assigned_commercial_id') {
          const prior=String(prospect[key]??'');
          if(value!==prior)changes[key]=value||null;
        } else {
          if(key==='email')value=value.toLowerCase();
          if(value!==String(prospect[key]??''))changes[key]=value;
        }
      }
    } catch(error){setMessage(feedback,error.message,true);return;}
    if(!Object.keys(changes).length){setMessage(feedback,'No changes to save.');return;}
    submit.disabled=true;setMessage(feedback,'Saving…');
    try {
      await updateProspect(supabase,prospect.id,changes,allowed);
      setMessage(feedback,'Saved. Refreshing record…');
      await onSaved();
    } catch(error) {
      console.error('Prospect update rejected',error);
      setMessage(feedback,error?.message||'Update denied or unavailable.',true);
      submit.disabled=false;
    }
  });
  return section;
}
export function appendProspectEditor(supabase,prospect,onSaved,content) {
  const role=document.documentElement.dataset.authRole;
  if(!['commercial','manager','administrator'].includes(role))return;
  const opener=element('button','Edit details','sci-secondary');opener.type='button';
  opener.style.gridColumn='1/-1';
  opener.addEventListener('click',()=>opener.replaceWith(createProspectEditor(supabase,prospect,onSaved)));
  content.append(opener);
}
