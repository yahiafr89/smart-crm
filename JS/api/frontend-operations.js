/** Smart CRM - authenticated, permission-aware backend mutations.
 * Browser never holds service_role secrets. The server MUST validate JWT,
 * role, ownership, business constraints and audit every mutation.
 */
import { config } from '../config/config.js';

export async function secureOperation(supabase, endpoint, body, { signal } = {}) {
  if (config.mode !== 'connected') throw new Error('Connected mode required.');
  const { data: auth, error } = await supabase.auth.getUser();
  if (error || !auth?.user) throw new Error('Session expired. Please sign in again.');
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !data?.session?.access_token) throw new Error('Authentication required.');
  if (!/^https:\/\//i.test(config.n8nPublicBaseUrl || '')) throw new Error('Secure backend URL not configured.');
  const response = await fetch(config.n8nPublicBaseUrl.replace(/\/+$/, '') + endpoint, {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session.access_token}`, 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body)
  });
  let result;
  try { result = await response.json(); } catch { throw new Error('Invalid JSON response from backend.'); }
  if (!response.ok || !result || result.success !== true) {
    const safeMessage = typeof result?.message === 'string' ? result.message.slice(0, 180) : `Backend rejected request (${response.status}).`;
    throw new Error(safeMessage);
  }
  return result;
}

export function lang(fr, en) { return document.documentElement.lang === 'en' ? en : fr; }
export function make(tag, text = '', className = '') {
  const e = document.createElement(tag); if (className) e.className = className;
  e.textContent = text; return e;
}
export function status(el, text, bad = false) {
  el.textContent = text; el.setAttribute('role', bad ? 'alert' : 'status');
  el.style.color = bad ? '#b42318' : '#475569';
}
export function inputField(form, labelFr, labelEn, name, { required = false, type = 'text', maxLength = 150, value = '' } = {}) {
  const wrapper = make('label'); wrapper.className = 'sci-field';
  wrapper.append(make('span', lang(labelFr, labelEn)));
  const input = document.createElement('input');
  input.name = name; input.type = type; input.required = required; input.maxLength = maxLength;
  input.autocomplete = 'off'; input.value = value ?? '';
  wrapper.append(input); form.append(wrapper); return input;
}
