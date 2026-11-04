/** Administrator-only UI. Authorization of database reads remains enforced by Supabase RLS. */
export function mountAdministrationConnected(supabase, main) {
  const fr = () => document.documentElement.lang !== 'en';
  const t = (a,b) => fr() ? a : b;
  const root = document.createElement('section');
  root.className = 'administration-page';
  root.style.cssText = 'max-width:1200px;margin:0 auto;padding:clamp(18px,3vw,34px);color:#152446;';
  const heading = document.createElement('h1');
  const intro = document.createElement('p');
  const panel = document.createElement('div');
  panel.style.cssText = 'padding:24px;background:#fff;border:1px solid #dfe7f2;border-radius:20px;box-shadow:0 12px 35px rgba(15,23,42,.04);';
  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin:20px 0;';
  const search = document.createElement('input');
  search.type='search'; search.autocomplete='off';
  search.style.cssText='min-width:220px;flex:1;padding:12px;border:1px solid #dce4f1;border-radius:12px;';
  const refresh=document.createElement('button');refresh.type='button';refresh.className='btn-primary';
  toolbar.append(search,refresh);
  const status=document.createElement('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const wrap=document.createElement('div');wrap.className='table-container';wrap.style.cssText='overflow-x:auto;';
  const table=document.createElement('table');table.style.width='100%';
  const thead=document.createElement('thead'),tbody=document.createElement('tbody');table.append(thead,tbody);wrap.append(table);
  const note=document.createElement('p');note.style.cssText='font-size:13px;color:#64748b;margin-top:18px;';
  panel.append(toolbar,status,wrap,note);root.append(heading,intro,panel);main.replaceChildren(root);
  let rows=[],error=null,loading=true;
  const roles={administrator:['Administrateur','Administrator'],manager:['Manager','Manager'],commercial:['Commercial','Sales representative']};
  function render(){
    heading.textContent=t('Administration','Administration');
    intro.textContent=t('Utilisateurs autorisés et rôles enregistrés dans Supabase.','Authorized users and roles from Supabase.');
    search.placeholder=t('Rechercher un utilisateur…','Search users…');search.setAttribute('aria-label',search.placeholder);
    refresh.textContent=t('Actualiser','Refresh');
    note.textContent=t('Gestion des comptes en lecture seule. La création, la suppression et la modification des permissions nécessitent des endpoints backend sécurisés.','Read-only account management. Creating, deleting or changing permissions requires secure backend endpoints.');
    status.textContent=loading?t('Chargement…','Loading…'):error?t('Lecture impossible. Vérifiez les droits RLS de la table users.','Unable to load. Check users table RLS permissions.'):t(`${rows.length} compte(s) accessible(s) (maximum 200 affichés)`,`${rows.length} accessible account(s) (up to 200 shown)`);
    const tr=document.createElement('tr');(fr()?['Utilisateur','E-mail','Rôle']:['User','Email','Role']).forEach(v=>{const th=document.createElement('th');th.textContent=v;tr.append(th);});thead.replaceChildren(tr);
    tbody.replaceChildren();
    const term=search.value.trim().toLocaleLowerCase();
    const filtered=rows.filter(r=>[r.full_name,r.email,r.role].some(v=>String(v??'').toLocaleLowerCase().includes(term)));
    if(!filtered.length){const r=document.createElement('tr'),c=document.createElement('td');c.colSpan=3;c.textContent=error?'—':t('Aucun utilisateur à afficher.','No users to display.');r.append(c);tbody.append(r);return;}
    for(const user of filtered){const tr=document.createElement('tr');const values=[user.full_name||'—',user.email||'—',roles[user.role]?.[fr()?0:1]||String(user.role||'—')];for(const v of values){const td=document.createElement('td');td.textContent=v;td.style.overflowWrap='anywhere';tr.append(td);}tbody.append(tr);}
  }
  async function load(){loading=true;error=null;refresh.disabled=true;render();try{
    const result=await supabase.from('users').select('full_name,email,role').order('full_name',{ascending:true}).limit(200);
    if(result.error)throw result.error;
    rows=Array.isArray(result.data)?result.data:[];
  }catch(e){console.error('Administration users unavailable',e);rows=[];error=e;}finally{loading=false;refresh.disabled=false;render();}}
  search.addEventListener('input',render);refresh.addEventListener('click',load);
  const observer=new MutationObserver(()=>{if(root.isConnected)render();else observer.disconnect();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  load();
}
