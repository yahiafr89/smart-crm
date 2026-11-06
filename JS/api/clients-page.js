import { listClients } from './clients.js';

// Portfolio read-only directory. Supabase RLS must enforce each user's visibility.
export function mountClientsConnected(supabase, main) {
  const root = document.createElement('section');
  root.className = 'crm-clients-live';
  root.innerHTML = `<style>
  .crm-clients-live{max-width:1240px;margin:0 auto;padding:clamp(16px,3vw,36px);color:#172746}
  .crm-clients-live *{box-sizing:border-box}
  .crm-clients-live h1{margin:0 0 6px;font-size:clamp(27px,3vw,36px)}
  .crm-clients-live .cl-muted{color:#64748b;font-size:14px}
  .crm-clients-live .cl-panel{margin-top:24px;background:#fff;border:1px solid #e0e8f4;border-radius:20px;padding:clamp(16px,2.5vw,28px);box-shadow:0 8px 35px rgba(17,37,73,.04)}
  .crm-clients-live .cl-toolbar{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px}
  .crm-clients-live input{flex:1;min-width:200px;min-height:44px;border:1px solid #d7e0ed;border-radius:12px;padding:10px 14px;font:inherit}
  .crm-clients-live button{min-height:42px;border:1px solid #d4e0f0;border-radius:11px;padding:9px 15px;background:#f8faff;color:#1d4ed8;font-weight:650;cursor:pointer}
  .crm-clients-live button:disabled{opacity:.5;cursor:not-allowed}
  .crm-clients-live .cl-scroll{width:100%;overflow:auto;border:1px solid #e7edf6;border-radius:14px}
  .crm-clients-live table{width:100%;min-width:650px;border-collapse:collapse;text-align:left}
  .crm-clients-live th{background:#f5f8fd;color:#64748b;font-size:12px;letter-spacing:.03em;text-transform:uppercase;padding:14px}
  .crm-clients-live td{padding:15px 14px;border-top:1px solid #edf1f7;font-size:14px;overflow-wrap:anywhere}
  .crm-clients-live .cl-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:18px}
  .crm-clients-live .cl-error{color:#b42318}
  </style>
  <header><h1>Clients</h1><p class="cl-muted">Clients created automatically when prospects are won. Read-only · Visibility enforced by Supabase RLS.</p></header>
  <div class="cl-panel"><div class="cl-toolbar"><input type="search" aria-label="Search clients on current page" placeholder="Search this page…"><button type="button" class="cl-refresh">Refresh</button></div>
  <p class="cl-muted cl-status" role="status" aria-live="polite"></p>
  <div class="cl-scroll"><table><thead><tr><th>Client</th><th>Company</th><th>Email</th><th>Phone</th><th>Created</th></tr></thead><tbody></tbody></table></div>
  <div class="cl-foot"><span class="cl-muted cl-count"></span><div><button class="cl-prev" type="button">Previous</button> <span class="cl-page"></span> <button class="cl-next" type="button">Next</button></div></div></div>`;
  main.replaceChildren(root);
  const q = s => root.querySelector(s);
  const body = q('tbody'), status = q('.cl-status'), countLabel=q('.cl-count');
  const search=q('input'), refresh=q('.cl-refresh'), prev=q('.cl-prev'),next=q('.cl-next'), pageLabel=q('.cl-page');
  const size=20; let page=1, count=0, rows=[], busy=false, failed=false, sequence=0;
  const first=(obj, keys)=> {for(const k of keys){const val=obj?.[k];if(val!==null&&val!==undefined&&String(val).trim()!=='') return String(val);}return '—';};
  const cell = (row,value)=>{const el=document.createElement('td');el.textContent=value;row.append(el);};
  function render(){
    body.replaceChildren(); const term=search.value.trim().toLocaleLowerCase();
    const visible=rows.filter(r=>Object.values(r).some(v=>v!=null&&String(v).toLocaleLowerCase().includes(term)));
    if(!visible.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=5;td.textContent=busy?'Loading clients…':failed?'Unable to load clients. Check Supabase access and network.':term?'No matching clients on this page.':'No clients available.';tr.append(td);body.append(tr);}
    else for(const client of visible){
      const tr=document.createElement('tr');
      const name=first(client,['full_name','display_name','name','client_name']);
      const composed=[client.first_name,client.last_name].filter(Boolean).join(' ').trim();
      cell(tr,name!=='—'?name:composed||'—');
      cell(tr,first(client,['company','company_name','business_name']));
      cell(tr,first(client,['email','contact_email']));
      cell(tr,first(client,['phone','contact_phone']));
      const d=client.created_at?new Date(client.created_at):null;
      cell(tr,d&&!Number.isNaN(d.getTime())?d.toLocaleDateString('en-GB'):'—');body.append(tr);
    }
    const pages=Math.max(1,Math.ceil(count/size));pageLabel.textContent=`${page} / ${pages}`;
    prev.disabled=busy||page===1;next.disabled=busy||page>=pages;refresh.disabled=busy;
    countLabel.textContent=failed?'Data unavailable':`${count} accessible client(s) · ${size} per page`;
    status.textContent=busy?'Loading…':failed?'Request failed. No demonstration data is substituted.':'Read-only · Results follow your existing database permissions.';
    status.classList.toggle('cl-error',failed);
  }
  async function load(){const request=++sequence;busy=true;failed=false;rows=[];render();try{
    const result=await listClients(supabase,{page,pageSize:size});if(request!==sequence)return;
    rows=Array.isArray(result.data)?result.data:[];count=Number(result.count)||0;
  }catch(error){if(request!==sequence)return;console.error('Client directory failed',error);failed=true;rows=[];count=0;}
  finally{if(request===sequence){busy=false;render();}}}
  search.addEventListener('input',render);refresh.addEventListener('click',load);
  prev.addEventListener('click',()=>{if(page>1){page--;search.value='';load();}});
  next.addEventListener('click',()=>{if(page*size<count){page++;search.value='';load();}});
  render();load();
}
