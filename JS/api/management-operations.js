import { secureOperation, lang, make, status, inputField } from './frontend-operations.js';

function block(titleFr,titleEn,roleNeeded) {
  const el=make('section');el.className='sci-card';
  el.append(make('h2',lang(titleFr,titleEn)));
  const helper=make('p',lang('Toute action est validée et journalisée par le backend.','Every action is authorized and audited by the backend.'));
  el.append(helper);return el;
}
function operationForm(host, supabase, { titleFr, titleEn, endpoint, operation, fields, refresh }) {
  const details=document.createElement('details');details.className='sci-details';
  details.append(make('summary',lang(titleFr,titleEn)));
  const form=make('form');form.className='sci-form';const nodes={};
  for(const f of fields){
    if(f.options){const wrapper=make('label');wrapper.className='sci-field';wrapper.append(make('span',lang(f.fr,f.en)));
      const select=document.createElement('select');select.name=f.name;
      for (const [value,labelFr,labelEn] of f.options){const opt=document.createElement('option');opt.value=value;opt.textContent=lang(labelFr,labelEn);select.append(opt);}
      wrapper.append(select);form.append(wrapper);nodes[f.name]=select;
    } else nodes[f.name]=inputField(form,f.fr,f.en,f.name,{required:!!f.required,maxLength:f.maxLength||200,type:f.type||'text'});
  }
  const button=make('button',lang('Confirmer','Confirm'),'btn-primary');button.type='submit';
  const feedback=make('p');feedback.setAttribute('aria-live','polite');form.append(button,feedback);details.append(form);host.append(details);
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const body={operation};for (const [key,node] of Object.entries(nodes))body[key]=node.value.trim();
    if (!window.confirm(lang('Confirmer cette opération sensible ?','Confirm this sensitive operation?')))return;
    button.disabled=true;status(feedback,lang('Traitement en cours…','Processing…'));
    try {await secureOperation(supabase,endpoint,body);status(feedback,lang('Opération réussie.','Operation successful.'));form.reset();await refresh?.();}
    catch(error){console.error('Secure management operation failed',error);status(feedback,lang('Opération non effectuée : ','Operation not completed: ')+error.message,true);}
    finally{button.disabled=false;}
  });
}
const ROLE_OPTIONS=[['commercial','Commercial','Sales representative'],['manager','Manager','Manager'],['administrator','Administrateur','Administrator']];
export function appendAdministrationOperations(supabase, root, refresh) {
  if(root.querySelector('.sci-admin-panel'))return;
  const panel=block('Gestion sécurisée des comptes','Secure account management');panel.classList.add('sci-admin-panel');
  operationForm(panel,supabase,{titleFr:'Inviter un utilisateur',titleEn:'Invite user',endpoint:'/webhook/crm/admin/users',operation:'invite',refresh,
    fields:[{name:'email',fr:'E-mail',en:'Email',type:'email',required:true},{name:'full_name',fr:'Nom complet',en:'Full name',required:true},{name:'role',fr:'Rôle',en:'Role',options:ROLE_OPTIONS}]});
  operationForm(panel,supabase,{titleFr:'Changer un rôle',titleEn:'Change role',endpoint:'/webhook/crm/admin/users',operation:'change_role',refresh,
    fields:[{name:'email',fr:'E-mail du compte',en:'Account email',type:'email',required:true},{name:'role',fr:'Nouveau rôle',en:'New role',options:ROLE_OPTIONS}]});
  operationForm(panel,supabase,{titleFr:'Désactiver ou réactiver un compte',titleEn:'Disable or enable account',endpoint:'/webhook/crm/admin/users',operation:'set_active',refresh,
    fields:[{name:'email',fr:'E-mail du compte',en:'Account email',type:'email',required:true},{name:'active',fr:'État',en:'Status',options:[['false','Désactivé','Disabled'],['true','Actif','Active']]}]});
  root.append(panel);
}
export function appendCommerciauxOperations(supabase, root, refresh) {
  if(root.querySelector('.sci-sales-panel'))return;
  // The front-end role only controls UX; backend MUST enforce authorization.
  const role=document.documentElement.dataset.authRole;
  if(!['administrator','manager'].includes(role))return;
  const panel=block('Affectations commerciales','Sales assignments');panel.classList.add('sci-sales-panel');
  operationForm(panel,supabase,{titleFr:'Affecter ou réaffecter un prospect',titleEn:'Assign or reassign a prospect',endpoint:'/webhook/crm/commercials',operation:'assign_prospect',refresh,
    fields:[{name:'prospect_id',fr:'Identifiant du prospect',en:'Prospect ID',required:true,maxLength:32},{name:'commercial_id',fr:'Identifiant du commercial',en:'Salesperson ID',required:true,maxLength:80}]});
  if(role==='administrator') {
    operationForm(panel,supabase,{titleFr:'Modifier le nom affiché d’un commercial',titleEn:'Update salesperson display name',endpoint:'/webhook/crm/commercials',operation:'update_commercial',refresh,
      fields:[{name:'commercial_id',fr:'Identifiant du commercial',en:'Salesperson ID',required:true,maxLength:80},{name:'display_name',fr:'Nom affiché',en:'Display name',required:true,maxLength:150}]});
  }
  root.append(panel);
}
