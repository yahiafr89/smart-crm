/** Connected team directory. Supabase RLS is the sole data-access authority. */
export function mountCommerciauxConnected(supabase, main) {
  const fr = () => document.documentElement.lang !== 'en';
  const t = (a,b) => fr() ? a : b;
  const root = document.createElement('section');
  root.className = 'salespeople-page';
  root.style.cssText = 'max-width:1200px;margin:0 auto;padding:clamp(18px,3vw,34px);color:#152446;';
  const title=document.createElement('h1');
  const intro=document.createElement('p');
  const toolbar=document.createElement('div');
  toolbar.style.cssText='display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:22px 0;';
  const search=document.createElement('input');search.type='search';search.autocomplete='off';search.style.cssText='flex:1;min-width:220px;max-width:460px;padding:12px;border:1px solid #dce4f1;border-radius:12px;background:#fff;';
  const refresh=document.createElement('button');refresh.type='button';refresh.className='btn-primary';
  toolbar.append(search,refresh);
  const info=document.createElement('p');info.setAttribute('role','status');info.setAttribute('aria-live','polite');
  const tableWrap=document.createElement('div');tableWrap.className='table-container';tableWrap.style.cssText='border:1px solid #e2e8f0;border-radius:18px;background:#fff;overflow-x:auto;box-shadow:0 12px 35px rgba(15,23,42,.04);';
  const table=document.createElement('table');table.style.width='100%';
  const head=document.createElement('thead'), body=document.createElement('tbody');table.append(head,body);tableWrap.append(table);
  const note=document.createElement('p');note.style.cssText='margin-top:16px;color:#64748b;font-size:13px;';
  root.append(title,intro,toolbar,info,tableWrap,note);main.replaceChildren(root);
  let rows=[], error=null, loading=true;
  function render(){
    title.textContent=t('Équipe commerciale','Sales team');
    intro.textContent=t('Annuaire connecté à Supabase. Les données visibles dépendent de vos autorisations.','Connected Supabase directory. Visible records depend on your permissions.');
    search.placeholder=t('Rechercher un commercial…','Search salespeople…');search.setAttribute('aria-label',search.placeholder);
    refresh.textContent=t('Actualiser','Refresh');
    note.textContent=t('Création de comptes et modification des rôles désactivées en attendant la validation des opérations sécurisées côté backend.','Account creation and role changes are disabled pending secure backend approval.');
    info.textContent=loading?t('Chargement des commerciaux…','Loading salespeople…'):error?t('Impossible de charger les commerciaux. Vérifiez les autorisations Supabase.','Unable to load salespeople. Check Supabase permissions.'):t(`${rows.length} commercial(aux) accessible(s)`,`${rows.length} accessible salesperson(s)`);
    const names=fr()?['Commercial','Identifiant']:['Salesperson','Identifier'];
    const tr=document.createElement('tr');names.forEach(s=>{const th=document.createElement('th');th.textContent=s;tr.append(th);});head.replaceChildren(tr);
    body.replaceChildren();const term=search.value.trim().toLocaleLowerCase();const filtered=rows.filter(r=>String(r.display_name||'').toLocaleLowerCase().includes(term));
    if(!filtered.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=2;td.textContent=error?'—':t('Aucun résultat','No results');tr.append(td);body.append(tr);return;}
    for(const r of filtered){const tr=document.createElement('tr'),name=document.createElement('td'),id=document.createElement('td');name.textContent=r.display_name||'—';id.textContent=String(r.id??'—');id.style.cssText='color:#64748b;overflow-wrap:anywhere;';tr.append(name,id);body.append(tr);}
  }
  async function load(){loading=true;error=null;render();refresh.disabled=true;try{
    const {data,error:dbError}=await supabase.from('commercials').select('id,display_name').order('display_name',{ascending:true}).limit(200);
    if(dbError)throw dbError;rows=Array.isArray(data)?data:[];
  }catch(e){console.error('Commercials directory unavailable',e);rows=[];error=e;}finally{loading=false;refresh.disabled=false;render();}}
  search.addEventListener('input',render);refresh.addEventListener('click',load);
  const observer=new MutationObserver(()=>{if(root.isConnected)render();else observer.disconnect();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load();
}
