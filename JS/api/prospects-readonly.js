import { listProspects } from './prospects.js';

export function mountProspectsReadOnly(supabase, main) {
  const fr = () => document.documentElement.lang !== 'en';
  const tr = (a,b) => fr() ? a : b;
  main.replaceChildren();
  const section = document.createElement('section');
  section.className = 'prospects-page';
  const heading = document.createElement('h1');
  const intro = document.createElement('p');
  const controls = document.createElement('div');
  controls.className = 'prospects-toolbar';
  const search = document.createElement('input');
  search.type = 'search'; search.id = 'real-prospect-search'; search.autocomplete = 'off';
  search.setAttribute('aria-label','Search prospects');
  const status = document.createElement('select');
  status.id = 'real-prospect-status'; status.setAttribute('aria-label','Filter by status');
  const statuses = ['', 'new','contacted','qualified','proposal_sent','negotiation','won','lost','archived'];
  for (const value of statuses) { const opt = document.createElement('option'); opt.value=value; opt.textContent=value || 'All statuses'; status.append(opt); }
  controls.append(search,status);
  const info = document.createElement('p'); info.setAttribute('role','status'); info.setAttribute('aria-live','polite');
  const tableWrap = document.createElement('div'); tableWrap.className='table-container';
  const table = document.createElement('table');
  const thead = document.createElement('thead'); const tbody = document.createElement('tbody');
  table.append(thead,tbody); tableWrap.append(table);
  const pager = document.createElement('div'); pager.style.cssText='display:flex;align-items:center;gap:16px;margin-top:20px;';
  const prev = document.createElement('button'); const next = document.createElement('button');
  prev.type='button'; next.type='button'; prev.className='btn-secondary'; next.className='btn-secondary';
  const counter = document.createElement('span'); pager.append(prev,counter,next);
  section.append(heading,intro,controls,info,tableWrap,pager); main.append(section);
  let page=1, count=0, busy=false, requestId=0, rows=[], searchTimer;
  const size=20;
  const labels = () => {
    heading.textContent=tr('Prospects réels','Live prospects');
    intro.textContent=tr('Lecture seule · accès contrôlé par Supabase RLS','Read-only · access controlled by Supabase RLS');
    search.placeholder=tr('Rechercher par nom, société ou e-mail','Search name, company or email');
    status.options[0].textContent=tr('Tous les statuts','All statuses');
    prev.textContent=tr('Précédent','Previous'); next.textContent=tr('Suivant','Next');
    const names=fr()?['Prénom','Nom','Société','E-mail','Téléphone','Statut','Priorité','Création']:['First name','Last name','Company','Email','Phone','Status','Priority','Created'];
    thead.replaceChildren(); const hr=document.createElement('tr');
    names.forEach(name=>{const th=document.createElement('th');th.textContent=name;hr.append(th);});thead.append(hr);
    counter.textContent=`${page} / ${Math.max(1,Math.ceil(count/size))}`;
    prev.disabled=busy||page<=1; next.disabled=busy||page*size>=count;
  };
  const render = () => {
    labels(); tbody.replaceChildren();
    if (!rows.length) { const row=document.createElement('tr'); const cell=document.createElement('td');cell.colSpan=8;cell.textContent=tr('Aucun prospect pour ces critères.','No prospects match these filters.');row.append(cell);tbody.append(row);return; }
    rows.forEach(item=>{
      const row=document.createElement('tr');
      const vals=[item.first_name,item.last_name,item.company,item.email,item.phone,item.status,item.priority,item.created_at?new Date(item.created_at).toLocaleDateString(fr()?'fr-FR':'en-GB'):''];
      vals.forEach(value=>{const cell=document.createElement('td');cell.textContent=value==null||value===''?'—':String(value);row.append(cell);});
      tbody.append(row);
    });
  };
  async function load(){
    const id=++requestId;busy=true; labels();info.textContent=tr('Chargement…','Loading…');
    try{
      const result=await listProspects(supabase,{page,pageSize:size,search:search.value.trim(),status:status.value});
      if(id!==requestId)return;
      rows=result.data||[];count=result.count||0;
      info.textContent=tr(`${count} prospect(s) accessible(s)`,`${count} accessible prospect(s)`);
      render();
    }catch(error){
      if(id!==requestId)return;
      console.error('Prospects read error',error);rows=[];count=0;tbody.replaceChildren();
      info.textContent=tr('Impossible de charger les prospects. Vérifiez votre connexion ou vos autorisations.','Unable to load prospects. Check your connection or permissions.');
    }finally{if(id===requestId){busy=false;labels();}}
  }
  search.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{page=1;load();},350);});
  status.addEventListener('change',()=>{page=1;load();});
  prev.addEventListener('click',()=>{if(!busy&&page>1){page--;load();}});
  next.addEventListener('click',()=>{if(!busy&&page*size<count){page++;load();}});
  new MutationObserver(()=>render()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load();
}
