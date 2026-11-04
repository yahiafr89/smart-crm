import { lang, make, status, inputField } from './frontend-operations.js';
import { updateProspect } from './prospects.js';

// Writes go directly to Supabase with the end-user JWT and MUST be enforced by RLS.
// If Mohcine chooses an API-only write policy, replace this adapter, not its UI.
const EDITABLE = Object.freeze(['first_name','last_name','company','email','phone','notes','next_follow_up']);
const FIELDS = [
  ['first_name','Prénom','First name',{required:true,maxLength:120}],
  ['last_name','Nom','Last name',{required:true,maxLength:120}],
  ['company','Société','Company',{maxLength:200}],
  ['email','E-mail','Email',{required:true,type:'email',maxLength:250}],
  ['phone','Téléphone','Phone',{maxLength:50}],
  ['notes','Notes','Notes',{maxLength:2000}],
  ['next_follow_up','Prochaine relance','Next follow-up',{type:'datetime-local',maxLength:40}]
];
export function createProspectEditor(supabase, prospect, onSaved) {
  const section=make('section'); section.className='sci-card';section.style.gridColumn='1/-1';
  const heading=make('h2',lang('Modifier le prospect','Edit prospect'));
  const notice=make('p',lang('Les modifications sont soumises à vos autorisations Supabase.','Changes are subject to your Supabase permissions.'));
  const form=make('form');form.className='sci-form';
  const values={};
  for (const [name,fr,en,opts] of FIELDS) {
    let value=prospect[name] ?? '';
    if (name==='next_follow_up' && value) { const date=new Date(value); value=Number.isNaN(date.getTime())?'':`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}T${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`; }
    if(name==='notes') {
      const wrapper=make('label');wrapper.className='sci-field';wrapper.append(make('span',lang(fr,en)));
      const field=document.createElement('textarea');field.name=name;field.maxLength=opts.maxLength;field.rows=3;field.value=String(value);wrapper.append(field);form.append(wrapper);values[name]=field;
    } else values[name]=inputField(form,fr,en,name,{...opts,value});
  }
  const controls=make('div');controls.className='sci-actions';
  const submit=make('button',lang('Enregistrer les modifications','Save changes'),'btn-primary');submit.type='submit';
  const cancel=make('button',lang('Annuler','Cancel'),'sci-secondary');cancel.type='button';
  const feedback=make('p');feedback.setAttribute('aria-live','polite');
  controls.append(submit,cancel);form.append(controls,feedback);section.append(heading,notice,form);
  cancel.addEventListener('click',()=>section.remove());
  form.addEventListener('submit',async e=>{
    e.preventDefault(); if (!form.reportValidity()) return;
    const changes={};
    for (const key of EDITABLE) {
      let value=values[key].value.trim();
      if(key==='next_follow_up') value=value ? new Date(value).toISOString() : null;
      if(key==='email')value=value.toLowerCase();
      const old=prospect[key]??null;
      if(key==='next_follow_up') { if ((old?new Date(old).getTime():null)!==(value?new Date(value).getTime():null)) changes[key]=value; }
      else if (value!==String(old??''))changes[key]=value;
    }
    if(!Object.keys(changes).length){status(feedback,lang('Aucun changement.','No changes.'));return;}
    submit.disabled=true;status(feedback,lang('Enregistrement…','Saving…'));
    try {await updateProspect(supabase,prospect.id,changes,EDITABLE);status(feedback,lang('Enregistré. Actualisation…','Saved. Refreshing…'));await onSaved();}
    catch(error){console.error('Prospect update error',error);status(feedback,lang('Modification refusée ou indisponible. Vérifiez vos droits.','Update denied or unavailable. Check permissions.'),true);submit.disabled=false;}
  });
  return section;
}
export function appendProspectEditor(supabase, prospect, onSaved, content) {
  // The readonly detail already has a status widget. Editing is an additional panel.
  const opener=make('button',lang('Modifier les informations','Edit details'),'sci-secondary');opener.type='button';
  opener.style.gridColumn='1/-1';
  opener.addEventListener('click',()=>{
    opener.replaceWith(createProspectEditor(supabase, prospect, onSaved));
  });
  content.append(opener);
}
