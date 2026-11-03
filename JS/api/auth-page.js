import { mountProspectsReadOnly } from './prospects-readonly.js';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.10';
import { config } from '../config/config.js';
import { signIn, signOut, getBusinessProfile } from './auth.js';

const privatePages = new Set(['dashboard.html', 'prospects.html', 'commerciaux.html', 'administration.html']);
const page = location.pathname.split('/').pop();
const roles = new Set(['commercial', 'manager', 'administrator']);
const supabase = createClient(config.supabaseUrl, config.supabasePublishableKey);
const isFrench = () => document.documentElement.lang !== 'en';
const t = (fr, en) => isFrench() ? fr : en;
const clearLegacy = () => {
  for (const key of ['smartcrm-demo-session']) sessionStorage.removeItem(key);
  for (const key of ['smartcrm-demo-role', 'smartcrm-prospects', 'smartcrm-salespeople']) localStorage.removeItem(key);
};
function errorText(message) {
  const el = document.getElementById('login-error');
  if (el) { el.textContent = message; el.hidden = false; el.setAttribute('role', 'alert'); }
}
async function profileForAuthenticatedUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    if ([400, 401, 403].includes(Number(error.status)) || /invalid.*(jwt|token)|jwt.*expired|session.*missing|auth session missing/i.test(error.message || '')) return null;
    throw error;
  }
  if (!data?.user) return null;
  const profile = await getBusinessProfile(supabase, data.user.id);
  if (!roles.has(profile?.role)) throw new Error('Business role unavailable');
  return profile;
}
function showUnavailablePage(profile) {
  document.documentElement.dataset.authRole = profile.role;
  const roleLabel = { commercial: 'Sales representative', manager: 'Manager', administrator: 'Administrator' }[profile.role];
  const meta = document.querySelector('.crm-user-meta');
  if (meta) {
    meta.replaceChildren();
    const name = document.createElement('strong');
    name.textContent = profile.full_name || profile.name || profile.email || roleLabel;
    const role = document.createElement('span'); role.textContent = roleLabel;
    meta.append(name, role);
  }
  // Disable legacy demo UI until each screen is wired to Supabase.
  const main = document.querySelector('main');
  if (main) {
    main.replaceChildren();
    const section = document.createElement('section');
    section.style.cssText = 'max-width:680px;margin:48px auto;padding:32px;border-radius:20px;border:1px solid #cbd5e1;background:#fff;color:#14213d;';
    const title = document.createElement('h1');
    const description = document.createElement('p');
    const render = () => {
      title.textContent = t('Connexion sécurisée active', 'Secure sign-in active');
      description.textContent = t('Cette page sera connectée aux données Supabase dans la prochaine étape. Les données de démonstration sont désactivées.', 'This page will be connected to Supabase data in the next step. Demo data is disabled.');
    };
    render();
    new MutationObserver(render).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
    section.append(title, description); main.append(section);
  }
  const nav = document.querySelector('.crm-sidebar-nav');
  if (nav) {
    if (profile.role !== 'administrator') nav.querySelector('a[href="administration.html"]')?.remove();
    if (profile.role === 'commercial') nav.querySelector('a[href="commerciaux.html"]')?.remove();
  }
  const sidebar = document.querySelector('.crm-sidebar-bottom') || document.querySelector('.crm-sidebar');
  if (sidebar) {
    const button = document.createElement('button'); button.type = 'button';
    button.style.cssText = 'margin:12px;padding:10px 16px;border-radius:10px;cursor:pointer;';
    const update = () => { button.textContent = t('Se déconnecter', 'Sign out'); };
    update(); new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    button.addEventListener('click', async () => {
      button.disabled = true;
      try { await signOut(supabase); clearLegacy(); location.replace('login.html'); }
      catch (error) { console.error('Sign-out error',error); alert(t('Déconnexion impossible. Réessayez.', 'Sign-out failed. Please try again.')); button.disabled = false; }
    });
    sidebar.append(button);
  }
}
function showVerificationUnavailable(error) {
  console.error('Authentication verification unavailable', error);
  // Fail closed: never reveal private CRM UI or legacy demo data.
  document.documentElement.style.visibility = '';
  const main = document.querySelector('main');
  if (!main) return;
  // Replace the restricted dashboard layout with a single centered error view.
  // Removing only the sidebar leaves its grid column in place and squeezes the message.
  const shell = document.querySelector('.crm-app-shell');
  if (shell) {
    shell.replaceChildren(main);
    shell.style.cssText = 'display:flex;align-items:center;justify-content:center;min-height:100vh;width:100%;padding:clamp(20px,5vw,56px);box-sizing:border-box;';
  }
  main.replaceChildren();
  main.style.cssText = 'display:block;width:100%;max-width:680px;min-width:0;margin:0 auto;';
  const section = document.createElement('section');
  section.style.cssText = 'box-sizing:border-box;width:100%;margin:0;padding:clamp(24px,5vw,44px);border-radius:20px;border:1px solid #cbd5e1;background:#fff;color:#14213d;box-shadow:0 16px 48px rgba(15,23,42,.08);';
  section.setAttribute('role', 'alert');
  section.style.overflowWrap = 'break-word';
  const heading = document.createElement('h1');
  const description = document.createElement('p');
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'btn-primary';
  const render = () => {
    heading.textContent = t('Vérification temporairement indisponible', 'Verification temporarily unavailable');
    description.textContent = t('Impossible de vérifier votre session ou vos autorisations. Vérifiez votre connexion Internet, puis réessayez. Aucune donnée CRM n’est affichée.', 'Unable to verify your session or permissions. Check your Internet connection and try again. No CRM data is displayed.');
    retry.textContent = t('Réessayer', 'Retry');
  };
  retry.addEventListener('click', () => location.reload());
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  section.append(heading, description, retry);
  main.append(section);
}
async function init() {
  if (config.mode !== 'connected') return;
  if (privatePages.has(page)) {
    document.documentElement.style.visibility = 'hidden';
    try {
      const profile = await profileForAuthenticatedUser();
      if (!profile) { clearLegacy(); location.replace('login.html'); return; }
      if (page === 'administration.html' && profile.role !== 'administrator') { location.replace('dashboard.html'); return; }
      clearLegacy();
      showUnavailablePage(profile);
      if (page === 'prospects.html') { const main = document.querySelector('main'); if (main) mountProspectsReadOnly(supabase, main); }
      document.documentElement.style.visibility = '';
    } catch (error) { showVerificationUnavailable(error); }
    return;
  }
  if (page !== 'login.html') return;
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('[type="submit"]');
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    if (!email || !password) { errorText(t('Saisissez votre e-mail et votre mot de passe.', 'Enter your email and password.')); return; }
    button.disabled = true;
    try {
      await signIn(supabase, email, password);
      const profile = await profileForAuthenticatedUser();
      if (!profile) throw new Error('Profile unavailable');
      clearLegacy();
      location.replace('dashboard.html');
    } catch (error) {
      console.error('Sign-in failed', error);
      await signOut(supabase).catch(() => {});
      errorText(t('Connexion impossible. Vérifiez vos identifiants et votre accès.', 'Sign-in failed. Check your credentials and access.'));
    } finally { button.disabled = false; }
  });
}
init().catch(error => { console.error('Auth init failed',error); if(privatePages.has(page)) showVerificationUnavailable(error); else errorText(t('Service temporairement indisponible.', 'Service temporarily unavailable.')); });
