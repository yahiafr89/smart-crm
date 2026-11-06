import { createAssistantPanel } from './assistant-panel.js';
import { getProspect } from './prospects.js';
import { loadCommercialNames, commercialLabel } from './commercial-labels.js';
import { createProspectStatusControl } from './prospect-status-control.js';

// Prospect detail: reads via Supabase RLS; status writes go only through authenticated n8n.
export function mountProspectDetailReadOnly(supabase, main, rawId) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a, b) => fr() ? a : b;
  const id = String(rawId ?? '');
  main.replaceChildren();
  const section = document.createElement('section');
  section.className = 'prospects-page';
  section.style.cssText = 'width:100%;max-width:1100px;margin:0 auto;padding:clamp(16px,3vw,32px);box-sizing:border-box;';
  const back = document.createElement('a');
  back.href = 'prospects.html';
  back.style.cssText = 'display:inline-flex;margin-bottom:20px;color:#2563eb;font-weight:600;';
  const title = document.createElement('h1');
  title.style.cssText = 'overflow-wrap:anywhere;margin:0 0 8px;';
  const subtitle = document.createElement('p');
  const content = document.createElement('div');
  content.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px;margin-top:24px;';
  section.append(back, title, subtitle, content);
  main.append(section);
  let record = null, state = 'loading';
  let commercialNames = new Map();
  const fields = [
    ['first_name','Prénom','First name'], ['last_name','Nom','Last name'],
    ['company','Société','Company'], ['email','E-mail','Email'],
    ['phone','Téléphone','Phone'], ['message','Message','Message'],
    ['status','Statut','Status'], ['priority','Priorité','Priority'],
    ['qualification','Qualification IA','AI qualification'],
    ['reason','Motif / résumé','Reason / summary'],
    ['recommended_action','Action recommandée','Recommended action'],
    ['notes','Notes','Notes'], ['created_at','Création','Created'],
    ['updated_at','Dernière mise à jour','Last updated'],
    ['first_contact_date','Premier contact','First contact'],
    ['last_status_change','Dernier changement de statut','Last status change'],
    ['next_follow_up','Prochain suivi','Next follow-up'],
    ['assigned_commercial_id','Commercial affecté','Assigned salesperson']
  ];
  const dates = new Set(['created_at','updated_at','first_contact_date','last_status_change','next_follow_up']);
  function render() {
    back.textContent = tr('← Retour aux prospects','← Back to prospects');
    content.replaceChildren();
    if (state === 'loading') {
      title.textContent = tr('Chargement de la fiche…','Loading prospect…');
      subtitle.textContent = tr('Vérification des données autorisées.','Checking permitted data.');
      return;
    }
    if (state !== 'ready') {
      title.textContent = tr('Fiche indisponible','Prospect unavailable');
      subtitle.textContent = state === 'invalid'
        ? tr('Identifiant de prospect invalide.','Invalid prospect ID.')
        : state === 'missing'
          ? tr('Prospect introuvable ou non accessible avec votre compte.','Prospect not found or not accessible to your account.')
          : tr('Impossible de charger cette fiche. Vérifiez votre connexion puis réessayez.','Unable to load this prospect. Check your connection and try again.');
      if (state === 'error') {
        const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'btn-primary';
        retry.textContent = tr('Réessayer','Retry'); retry.addEventListener('click', load); content.append(retry);
      }
      return;
    }
    title.textContent = [record.first_name, record.last_name].filter(Boolean).join(' ') || tr('Prospect sans nom','Unnamed prospect');
    subtitle.textContent = tr(`Fiche n° ${record.id} · Modification du statut autorisée selon vos droits`,`Prospect #${record.id} · Status changes subject to your permissions`);
    for (const [key, labelFr, labelEn] of fields) {
      const card = document.createElement('div');
      card.style.cssText = 'min-width:0;padding:20px;border:1px solid #dbe3ee;border-radius:16px;background:#fff;box-shadow:0 4px 16px rgba(15,23,42,.04);';
      const label = document.createElement('div'); label.style.cssText = 'font-size:13px;color:#64748b;font-weight:600;margin-bottom:8px;';
      label.textContent = tr(labelFr,labelEn);
      const value = document.createElement('div'); value.style.cssText = 'font-size:15px;color:#14213d;white-space:pre-wrap;overflow-wrap:anywhere;';
      const raw = key === 'assigned_commercial_id'
        ? commercialLabel(record.assigned_commercial_id, commercialNames, fr())
        : record[key];
      if (raw === null || raw === undefined || raw === '') value.textContent = '—';
      else if (dates.has(key)) {
        const d = new Date(raw); value.textContent = Number.isNaN(d.getTime()) ? String(raw) : d.toLocaleString(fr()?'fr-FR':'en-GB');
      } else value.textContent = String(raw);
      card.append(label,value); content.append(card);
    }
    content.append(createProspectStatusControl(supabase, record, load));
    if (Number.isSafeInteger(Number(record.id)) && Number(record.id) > 0) content.append(createAssistantPanel(supabase, { prospectId: Number(record.id) }));
  }
  async function load() {
    if (!/^[1-9]\d*$/.test(id)) { state = 'invalid'; render(); return; }
    state = 'loading'; render();
    try {
      record = await getProspect(supabase,id);
      commercialNames = new Map();
      try {
        commercialNames = await loadCommercialNames(supabase, [record.assigned_commercial_id]);
      } catch (error) {
        console.warn('Commercial name lookup unavailable', error);
      }
      state = 'ready';
    } catch (error) {
      console.error('Prospect detail failed', error);
      state = error?.code === 'PGRST116' ? 'missing' : 'error';
    }
    render();
  }
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load();
}
