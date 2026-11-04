import { listProspects } from './prospects.js';

/** CRM prospects view: server-side pagination and RLS-backed read-only list. */
export function mountProspectsReadOnly(supabase, main) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a, b) => fr() ? a : b;
  const statusNames = {
    new:['Nouveau','New'], contacted:['Contacté','Contacted'], qualified:['Qualifié','Qualified'],
    proposal_sent:['Proposition envoyée','Proposal sent'], negotiation:['Négociation','Negotiation'],
    won:['Gagné','Won'], lost:['Perdu','Lost'], archived:['Archivé','Archived']
  };
  const el = (tag, className = '', text = '') => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  main.replaceChildren();
  const section = el('section', 'crm-prospects-live');
  const style = el('style');
  style.textContent = `
    .crm-prospects-live{max-width:1240px;margin:0 auto;padding:clamp(18px,3vw,38px);color:#172746}
    .cpl-head{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:22px}
    .cpl-head h1{font-size:clamp(26px,3vw,34px);margin:0 0 6px;font-weight:750}
    .cpl-head p{margin:0;color:#64748b}
    .cpl-panel{background:#fff;border:1px solid #e0e8f4;border-radius:20px;padding:clamp(16px,2.5vw,26px);box-shadow:0 8px 35px rgba(17,37,73,.035)}
    .cpl-tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:18px}
    .cpl-tools input,.cpl-tools select{min-height:44px;border:1px solid #d7e0ed;border-radius:12px;background:white;color:#172746;padding:10px 13px;font:inherit}
    .cpl-tools input{flex:2 1 230px;min-width:0}.cpl-tools select{flex:1 1 190px}
    .cpl-btn{min-height:44px;border:1px solid #d6e1f2;border-radius:12px;padding:9px 16px;background:#f8faff;color:#1d4ed8;font:inherit;font-weight:650;cursor:pointer}
    .cpl-btn:hover:not(:disabled){background:#edf4ff}.cpl-btn:disabled{opacity:.45;cursor:not-allowed}
    .cpl-table-scroll{width:100%;overflow-x:auto;border:1px solid #e7edf6;border-radius:14px}
    .cpl-table{width:100%;border-collapse:collapse;text-align:left;min-width:840px}
    .cpl-table th{background:#f5f8fd;color:#62718b;font-size:12px;letter-spacing:.035em;text-transform:uppercase;padding:14px 15px;white-space:nowrap}
    .cpl-table td{padding:16px 15px;border-top:1px solid #edf1f7;vertical-align:middle;font-size:14px;overflow-wrap:anywhere}
    .cpl-table tbody tr:hover{background:#f8fbff}.cpl-name{font-weight:700;color:#14284e}
    .cpl-pill{display:inline-block;border-radius:99px;padding:5px 10px;background:#eef2ff;color:#4f46e5;font-size:12px;font-weight:700;white-space:nowrap}
    .cpl-pill[data-status="won"]{background:#e7f8ef;color:#166534}.cpl-pill[data-status="lost"]{background:#fef0f0;color:#b91c1c}
    .cpl-pill[data-status="new"]{background:#e8f2ff;color:#1d4ed8}.cpl-pill[data-status="archived"]{background:#f1f5f9;color:#64748b}
    .cpl-open{font-weight:700;color:#2563eb;text-decoration:none;white-space:nowrap}.cpl-open:hover{text-decoration:underline}
    .cpl-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}
    .cpl-info{font-size:13px;color:#64748b}.cpl-pagination{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .cpl-empty{text-align:center;color:#64748b;padding:32px!important}
    @media(max-width:650px){.cpl-head{align-items:flex-start}.cpl-tools>*{width:100%;flex-basis:100%!important}.cpl-panel{padding:14px}.crm-prospects-live{padding:16px}}
  `;
  const header = el('div', 'cpl-head');
  const headerText = el('div');
  const title = el('h1'); const intro = el('p'); headerText.append(title, intro);
  const refresh = el('button','cpl-btn'); refresh.type='button'; header.append(headerText,refresh);
  const panel = el('div','cpl-panel'); const toolbar = el('div','cpl-tools');
  const search = el('input');search.type='search';search.autocomplete='off';search.maxLength=80;
  const filter = el('select');
  for(const value of ['', ...Object.keys(statusNames)]){const opt=el('option');opt.value=value;filter.append(opt);}
  toolbar.append(search,filter);
  const wrap=el('div','cpl-table-scroll');const table=el('table','cpl-table');
  const thead=el('thead');const tbody=el('tbody');table.append(thead,tbody);wrap.append(table);
  const foot=el('div','cpl-foot');const info=el('p','cpl-info');info.setAttribute('role','status');info.setAttribute('aria-live','polite');
  const pager=el('div','cpl-pagination');const prev=el('button','cpl-btn');const next=el('button','cpl-btn');prev.type=next.type='button';const counter=el('span','cpl-info');pager.append(prev,counter,next);foot.append(info,pager);
  panel.append(toolbar,wrap,foot);section.append(style,header,panel);main.append(section);
  let page=1,count=0,rows=[],busy=false,seq=0,timer,failed=false;
  const size=20;
  const names = () => fr()?['Prospect','Société','E-mail','Téléphone','Statut','Priorité','Création','Fiche']:['Prospect','Company','Email','Phone','Status','Priority','Created','Details'];
  const statusText = value => statusNames[value]?.[fr()?0:1] || value || '—';
  function render(){
    title.textContent=tr('Prospects','Prospects');
    intro.textContent=tr('Données en temps réel, selon vos autorisations.','Live data, subject to your permissions.');
    refresh.textContent=tr('Actualiser','Refresh');
    search.placeholder=tr('Rechercher un nom, une société ou un e-mail','Search name, company or email');
    search.setAttribute('aria-label',search.placeholder);
    filter.setAttribute('aria-label',tr('Filtrer par statut','Filter by status'));
    [...filter.options].forEach(opt=>{opt.textContent=opt.value?statusText(opt.value):tr('Tous les statuts','All statuses');});
    prev.textContent=tr('Précédent','Previous');next.textContent=tr('Suivant','Next');
    const headers=el('tr');names().forEach(name=>headers.append(el('th','',name)));thead.replaceChildren(headers);
    tbody.replaceChildren();
    if(!rows.length){const row=el('tr');const cell=el('td','cpl-empty',failed?tr('Chargement impossible. Vérifiez la connexion et les autorisations.','Unable to load. Check connection and permissions.'):busy?tr('Chargement…','Loading…'):tr('Aucun prospect pour ces filtres.','No matching prospects.'));cell.colSpan=8;row.append(cell);tbody.append(row);}
    else for(const item of rows){
      const row=el('tr');const fullName=[item.first_name,item.last_name].filter(Boolean).join(' ')||'—';
      const fields=[fullName,item.company,item.email,item.phone,item.status,item.priority,item.created_at];
      fields.forEach((value,i)=>{const td=el('td');
        if(i===0)td.append(el('span','cpl-name',String(value)));
        else if(i===4){const pill=el('span','cpl-pill',statusText(value));pill.dataset.status=value||'';td.append(pill);}
        else if(i===6){const date=value?new Date(value):null;td.textContent=date&&!Number.isNaN(date.getTime())?date.toLocaleDateString(fr()?'fr-FR':'en-GB'):'—';}
        else td.textContent=value==null||value===''?'—':String(value);
        row.append(td);
      });
      const td=el('td');const link=el('a','cpl-open',tr('Voir la fiche','View details'));
      link.href=`prospects.html?id=${encodeURIComponent(String(item.id))}`;td.append(link);row.append(td);tbody.append(row);
    }
    const pages=Math.max(1,Math.ceil(count/size));counter.textContent=`${page} / ${pages}`;
    prev.disabled=busy||page<=1;next.disabled=busy||page>=pages;refresh.disabled=busy;
    if(failed)info.textContent=tr('Impossible de charger les prospects.','Unable to load prospects.');
    else if(busy)info.textContent=tr('Chargement des prospects…','Loading prospects…');
    else info.textContent=tr(`${count} prospect(s) accessible(s)`,`${count} accessible prospect(s)`);
  }
  async function load(){
    const current=++seq;busy=true;failed=false;render();
    try{
      const result=await listProspects(supabase,{page,pageSize:size,search:search.value.trim(),status:filter.value});
      if(current!==seq)return;
      rows=result.data||[];count=result.count||0;
    }catch(error){if(current!==seq)return;console.error('Prospects load failed',error);rows=[];count=0;failed=true;}
    finally{if(current===seq){busy=false;render();}}
  }
  search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{page=1;load();},350);});
  filter.addEventListener('change',()=>{page=1;load();});
  refresh.addEventListener('click',load);
  prev.addEventListener('click',()=>{if(!busy&&page>1){page--;load();}});
  next.addEventListener('click',()=>{if(!busy&&page*size<count){page++;load();}});
  const observer=new MutationObserver(render);observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load();
}
