// All-time stock conversion: accessible clients / accessible prospects.
// This is intentionally independent of the dashboard's selected-date RPC.
export function mountConversionCard(supabase, main) {
  const dashboard = main.querySelector('.crm-connected-dashboard');
  if (!dashboard || dashboard.querySelector('.crm-conversion-card')) return;
  const section = document.createElement('section');
  section.className = 'crm-conversion-card';
  section.style.cssText='margin:18px 0;padding:20px 24px;background:#fff;border:1px solid #e0e7f2;border-radius:17px;box-shadow:0 6px 20px rgba(20,33,61,.04);color:#14213d;';
  const heading=document.createElement('h2');heading.textContent='Lead-to-client conversion · All time';
  heading.style.cssText='font-size:18px;margin:0 0 8px';
  const number=document.createElement('strong');number.style.cssText='font-size:32px;display:block;font-variant-numeric:tabular-nums';number.textContent='—';
  const description=document.createElement('p');description.style.cssText='font-size:13px;color:#64748b;margin:8px 0 12px';
  description.textContent='Accessible clients ÷ accessible prospects. All-time indicator, not limited to the selected dashboard dates.';
  const feedback=document.createElement('p');feedback.style.cssText='font-size:13px;color:#64748b';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
  const button=document.createElement('button');button.type='button';button.textContent='Refresh conversion';button.style.cssText='border:1px solid #d9e4f4;padding:9px 12px;border-radius:9px;background:#f7faff;color:#2563eb;cursor:pointer';
  section.append(heading,number,description,feedback,button);
  const kpis=dashboard.querySelector('.cd-kpis'); if(kpis) kpis.insertAdjacentElement('afterend',section);else dashboard.prepend(section);
  async function load(){button.disabled=true;number.textContent='—';feedback.textContent='Loading actual counts…';try{
    const [prospect,client]=await Promise.all([
      supabase.from('prospects').select('id',{count:'exact',head:true}),
      supabase.from('clients').select('id',{count:'exact',head:true})
    ]);
    if(prospect.error)throw prospect.error;if(client.error)throw client.error;
    const denominator=prospect.count,numerator=client.count;
    if(!Number.isInteger(denominator)||!Number.isInteger(numerator))throw new Error('Counts unavailable');
    if(denominator===0){number.textContent='—';feedback.textContent='No accessible prospects. Conversion cannot be calculated.';}
    else {number.textContent=`${(numerator/denominator*100).toFixed(1)}%`;feedback.textContent=`${numerator} client(s) / ${denominator} prospect(s) in your RLS scope.`;
      if(numerator>denominator)feedback.textContent+=' Client count exceeds prospects; verify client origin and the reporting definition.';
    }
  }catch(error){console.error('Conversion metric unavailable',error);feedback.textContent='Conversion unavailable. Check database permissions and connectivity. No estimated value is shown.';}
  finally{button.disabled=false;}}
  button.addEventListener('click',load);load();
}
