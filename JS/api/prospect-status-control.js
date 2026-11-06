import { STATUS_TRANSITIONS, changeProspectStatus } from './prospects.js';
import { config } from '../config/config.js';

// UI convenience only. n8n must independently validate identity, access and transitions.
export function createProspectStatusControl(supabase, prospect, onSaved) {
  const french = () => document.documentElement.lang !== 'en';
  const tr = (fr, en) => french() ? fr : en;
  const container = document.createElement('section');
  container.style.cssText = 'grid-column:1/-1;padding:20px;border:1px solid #dbe3ee;border-radius:16px;background:#fff;color:#14213d;';
  const heading = document.createElement('h2'); heading.style.cssText='font-size:18px;margin:0 0 12px;';
  const label = document.createElement('label'); label.htmlFor='prospect-new-status'; label.style.cssText='display:block;font-weight:600;margin-bottom:8px;';
  const select = document.createElement('select'); select.id='prospect-new-status'; select.style.cssText='min-height:42px;padding:8px 12px;max-width:100%;border:1px solid #cbd5e1;border-radius:10px;';
  const button = document.createElement('button'); button.type='button'; button.className='btn-primary'; button.style.cssText='margin-left:12px;min-height:42px;';
  const feedback = document.createElement('p'); feedback.setAttribute('role','status'); feedback.setAttribute('aria-live','polite');
  const choices = STATUS_TRANSITIONS[prospect.status] || [];
  for (const choice of choices) { const option=document.createElement('option'); option.value=choice; option.textContent=({new:tr('Nouveau','New'),contacted:tr('Contacté','Contacted'),qualified:tr('Qualifié','Qualified'),proposal_sent:tr('Proposition envoyée','Proposal sent'),negotiation:tr('Négociation','Negotiation'),won:tr('Gagné','Won'),lost:tr('Perdu','Lost'),archived:tr('Archivé','Archived')})[choice] || choice; select.append(option); }
  const configured = Boolean(config.n8nPublicBaseUrl && /^https:\/\//i.test(config.n8nPublicBaseUrl));
  select.disabled=!configured || !choices.length;
  button.disabled=select.disabled;
  function translate() {
    heading.textContent=tr('Changer le statut','Change status');
    label.textContent=tr('Nouveau statut','New status');
    button.textContent=tr('Enregistrer','Save');
    for (const option of select.options) option.textContent=({new:tr('Nouveau','New'),contacted:tr('Contacté','Contacted'),qualified:tr('Qualifié','Qualified'),proposal_sent:tr('Proposition envoyée','Proposal sent'),negotiation:tr('Négociation','Negotiation'),won:tr('Gagné','Won'),lost:tr('Perdu','Lost'),archived:tr('Archivé','Archived')})[option.value] || option.value;
    if (!configured) feedback.textContent=tr('Adresse HTTPS n8n non configurée dans JS/config/config.js.','HTTPS n8n URL not configured in JS/config/config.js.');
    else if (!choices.length) feedback.textContent=tr('Aucune transition disponible pour ce statut.','No available transition for this status.');
  }
  button.addEventListener('click', async () => {
    if (!choices.includes(select.value) || button.disabled) return;
    const confirmed=window.confirm(tr(`Confirmer le changement de statut vers « ${select.value} » ?`,`Confirm status change to “${select.value}”?`));
    if (!confirmed) return;
    button.disabled=true; select.disabled=true;
    feedback.textContent=tr('Enregistrement en cours…','Saving…');
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const token=data?.session?.access_token;
      if (!token) throw new Error('Authentication required');
      await changeProspectStatus(config,token,prospect.id,prospect.status,select.value);
      feedback.textContent=tr('Demande acceptée. Actualisation de la fiche…','Request accepted. Refreshing prospect…');
      await onSaved();
    } catch (error) {
      if (Number(error?.status) === 409) { console.warn('CRM-02 conflict: refreshing prospect'); await onSaved(); return; }
      console.error('Status change failed',error);
      feedback.textContent=tr('Échec du changement de statut : ','Status change failed: ') + (error?.message || tr('Vérifiez vos droits et la connexion.','Check permissions and connection.'));
      button.disabled=false;select.disabled=false;
    }
  });
  translate();
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  container.append(heading,label,select,button,feedback);
  return container;
}
