import { getDashboard } from './dashboard.js';
import { createAssistantPanel } from './assistant-panel.js';

// Dashboard reads only the authenticated, RLS-scoped Supabase RPC response.
// No demo values, direct table queries, or client-side role overrides.
export function mountDashboardConnected(supabase, main) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a,b) => fr() ? a : b;
  const root = document.createElement('section');
  root.className = 'crm-connected-dashboard';
  root.innerHTML = `<style>
    .crm-connected-dashboard{max-width:1240px;margin:0 auto;padding:clamp(18px,3vw,36px);color:#14213d;font-family:inherit}
    .crm-connected-dashboard *{box-sizing:border-box}
    .crm-connected-dashboard .cd-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:24px}
    .crm-connected-dashboard h1{font-size:clamp(26px,3vw,36px);line-height:1.2;margin:0 0 7px;font-weight:800;letter-spacing:-.035em}
    .crm-connected-dashboard .cd-muted{color:#64748b;font-size:14px;margin:0}
    .crm-connected-dashboard .cd-period{display:flex;align-items:end;gap:10px;flex-wrap:wrap}
    .crm-connected-dashboard .cd-period label{display:grid;gap:6px;font-size:12px;font-weight:700;color:#475569}
    .crm-connected-dashboard input[type=date]{height:40px;border:1px solid #d8e2f0;border-radius:10px;padding:0 10px;background:#fff;color:#14213d;max-width:160px}
    .crm-connected-dashboard button.cd-refresh{height:40px;padding:0 18px;border:0;border-radius:10px;background:#1677ff;color:white;font-weight:700;cursor:pointer}
    .crm-connected-dashboard button:disabled{opacity:.6;cursor:wait}
    .crm-connected-dashboard .cd-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}
    .crm-connected-dashboard .cd-card{background:#fff;border:1px solid #e0e7f2;border-radius:17px;box-shadow:0 6px 20px rgba(20,33,61,.035);padding:20px;min-width:0}
    .crm-connected-dashboard .cd-kpi-label{font-size:13px;color:#64748b;font-weight:650;margin:0 0 14px}
    .crm-connected-dashboard .cd-kpi-number{font-size:clamp(25px,3vw,36px);font-weight:800;letter-spacing:-.04em;line-height:1.1;font-variant-numeric:tabular-nums}
    .crm-connected-dashboard .cd-kpi-accent{width:32px;height:4px;border-radius:4px;background:linear-gradient(90deg,#1878ff,#8065e9);margin-top:18px}
    .crm-connected-dashboard .cd-layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,1fr);gap:18px;margin-bottom:18px}
    .crm-connected-dashboard h2{font-size:18px;font-weight:750;letter-spacing:-.02em;margin:0 0 6px}
    .crm-connected-dashboard .cd-chart{margin-top:20px;display:grid;gap:14px}
    .crm-connected-dashboard .cd-bar-row{display:grid;grid-template-columns:minmax(105px,1fr) minmax(80px,2.5fr) 38px;gap:12px;align-items:center;font-size:13px}
    .crm-connected-dashboard .cd-bar-label{overflow-wrap:anywhere;color:#475569}
    .crm-connected-dashboard .cd-track{height:12px;background:#eef2fa;border-radius:20px;overflow:hidden}
    .crm-connected-dashboard .cd-fill{height:100%;background:linear-gradient(90deg,#1677ff,#7768ed);border-radius:20px;min-width:0}
    .crm-connected-dashboard .cd-bar-count{text-align:right;font-weight:750;font-variant-numeric:tabular-nums}
    .crm-connected-dashboard .cd-insights{display:grid;gap:12px;margin-top:18px}
    .crm-connected-dashboard .cd-insight{padding:14px 15px;border-radius:12px;background:#f6f8fd;display:flex;align-items:center;justify-content:space-between;gap:12px}
    .crm-connected-dashboard .cd-insight strong{font-size:20px;font-variant-numeric:tabular-nums}
    .crm-connected-dashboard .cd-status{font-size:13px;min-height:20px;margin:0 0 12px;color:#475569}
    .crm-connected-dashboard .cd-error{color:#b42318}
    .crm-connected-dashboard .cd-assistant{margin-top:18px}
    .crm-connected-dashboard .cd-assistant>section{max-width:none!important}
    @media(max-width:950px){.crm-connected-dashboard .cd-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.crm-connected-dashboard .cd-layout{grid-template-columns:1fr}}
    @media(max-width:520px){.crm-connected-dashboard .cd-kpis{grid-template-columns:1fr 1fr;gap:10px}.crm-connected-dashboard .cd-card{padding:15px}.crm-connected-dashboard .cd-bar-row{grid-template-columns:100px minmax(0,1fr) 28px;gap:8px}}
  </style>`;
  const top=document.createElement('div');top.className='cd-top';
  const heading=document.createElement('div');const title=document.createElement('h1');const description=document.createElement('p');description.className='cd-muted';heading.append(title,description);
  const form=document.createElement('form');form.className='cd-period';
  const startLabel=document.createElement('label');const endLabel=document.createElement('label');
  const startText=document.createElement('span');const endText=document.createElement('span');
  const start=document.createElement('input');const end=document.createElement('input');start.type=end.type='date';start.required=end.required=true;
  // Use local calendar dates, not UTC, to avoid off-by-one dates in Morocco.
  const localDate=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const now=new Date();end.value=localDate(now);start.value=localDate(new Date(now.getFullYear(),now.getMonth(),1));
  startLabel.append(startText,start);endLabel.append(endText,end);
  const refresh=document.createElement('button');refresh.type='submit';refresh.className='cd-refresh';form.append(startLabel,endLabel,refresh);
  top.append(heading,form);
  const status=document.createElement('p');status.className='cd-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const kpis=document.createElement('div');kpis.className='cd-kpis';
  const layout=document.createElement('div');layout.className='cd-layout';
  const chartCard=document.createElement('div');chartCard.className='cd-card';const chartTitle=document.createElement('h2');const chartDesc=document.createElement('p');chartDesc.className='cd-muted';const chart=document.createElement('div');chart.className='cd-chart';chartCard.append(chartTitle,chartDesc,chart);
  const insightCard=document.createElement('div');insightCard.className='cd-card';const insightTitle=document.createElement('h2');const insightDesc=document.createElement('p');insightDesc.className='cd-muted';const insights=document.createElement('div');insights.className='cd-insights';insightCard.append(insightTitle,insightDesc,insights);layout.append(chartCard,insightCard);
  const assistantWrap=document.createElement('div');assistantWrap.className='cd-assistant';
  const assistant=createAssistantPanel(supabase,{getPeriod:()=>({start_date:start.value,end_date:end.value})});assistantWrap.append(assistant);
  root.append(top,status,kpis,layout,assistantWrap);main.replaceChildren(root);
  const statuses={new:['Nouveau','New'],contacted:['Contacté','Contacted'],qualified:['Qualifié','Qualified'],proposal_sent:['Proposition envoyée','Proposal sent'],negotiation:['Négociation','Negotiation'],won:['Gagné','Won'],lost:['Perdu','Lost'],archived:['Archivé','Archived']};
  let data=null;let loading=false;let failed=false;let lastError='';let request=0;
  const metric=(key)=>{const n=Number(data?.summary?.[key] ?? data?.totals?.[key] ?? data?.metrics?.[key]);return Number.isFinite(n)&&n>=0?n:null;};
  const num=v=>v==null?'—':new Intl.NumberFormat(fr()?'fr-FR':'en-GB').format(v);
  const make=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!=null)el.textContent=text;return el;};
  function render(){
    title.textContent=tr('Vue d’ensemble','Overview');description.textContent=tr('Statistiques réelles · Accès contrôlé par Supabase','Live statistics · Access controlled by Supabase');
    startText.textContent=tr('Du','From');endText.textContent=tr('Au','To');refresh.textContent=tr('Actualiser','Refresh');refresh.disabled=loading;
    chartTitle.textContent=tr('Pipeline commercial','Sales pipeline');chartDesc.textContent=tr('Répartition des prospects par statut','Prospect distribution by status');
    insightTitle.textContent=tr('Points d’attention','Needs attention');insightDesc.textContent=tr('Indicateurs calculés par le serveur','Server-calculated indicators');
    status.textContent=loading?tr('Chargement des données…','Loading data…'):failed?tr('Données indisponibles : ','Data unavailable: ')+lastError:data?tr('Données actualisées depuis Supabase.','Data updated from Supabase.'):' ';
    status.classList.toggle('cd-error',failed);
    kpis.replaceChildren();
    const cards=[['total_prospects','Total prospects','Total prospects'],['open_prospects','Prospects ouverts','Open prospects'],['won_prospects','Prospects gagnés','Won prospects'],['overdue_follow_ups','Relances en retard','Overdue follow-ups']];
    for(const [key,frLabel,enLabel] of cards){const card=make('article','cd-card');card.append(make('p','cd-kpi-label',tr(frLabel,enLabel)),make('div','cd-kpi-number',num(metric(key))),make('div','cd-kpi-accent'));kpis.append(card);}
    chart.replaceChildren();
    const rows=Array.isArray(data?.by_status)?data.by_status.filter(x=>x&&typeof x.status==='string'&&Number.isFinite(Number(x.count))&&Number(x.count)>=0):[];
    const max=Math.max(1,...rows.map(x=>Number(x.count)));
    if(!rows.length)chart.append(make('p','cd-muted',data?tr('Aucune répartition disponible.','No status breakdown available.'):tr('En attente des données.','Waiting for data.')));
    for(const row of rows){const item=make('div','cd-bar-row');const label=make('span','cd-bar-label',statuses[row.status]?tr(...statuses[row.status]):row.status);const track=make('div','cd-track');const fill=make('div','cd-fill');fill.style.width=`${Math.max(0,Math.min(100,Number(row.count)/max*100))}%`;track.append(fill);item.append(label,track,make('strong','cd-bar-count',num(Number(row.count))));chart.append(item);}
    insights.replaceChildren();
    const items=[['unassigned_prospects','Non affectés','Unassigned'],['uncontacted_prospects','Non contactés','Not contacted'],['overdue_follow_ups','Relances en retard','Overdue follow-ups']];
    for(const [key,frLabel,enLabel] of items){const item=make('div','cd-insight');item.append(make('span','',tr(frLabel,enLabel)),make('strong','',num(metric(key))));insights.append(item);}
  }
  async function load(event){event?.preventDefault();const current=++request;loading=true;failed=false;render();try{const response=await getDashboard(supabase,start.value,end.value);if(current!==request)return;data=response;failed=false;}catch(error){if(current!==request)return;console.error('Dashboard RPC failed',error);data=null;failed=true;lastError=error?.message||tr('Erreur réseau ou autorisation','Network or permission error');}finally{if(current===request){loading=false;render();}}}
  form.addEventListener('submit',load);
  const observer=new MutationObserver(()=>{if(root.isConnected)render();else observer.disconnect();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();load();
}
