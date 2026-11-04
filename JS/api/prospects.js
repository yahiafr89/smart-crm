import { postJson, webhookUrl } from './client.js';
export async function listProspects(supabase, { page = 1, pageSize = 20, search = '', status = '' } = {}) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw new Error('Invalid pagination.');
  const columns = 'id,created_at,first_name,last_name,company,email,phone,status,priority,assigned_commercial_id';
  let query = supabase.from('prospects').select(columns, { count: 'exact' });
  if (status) query = query.eq('status', status);
  // Restrict search characters to keep the PostgREST OR expression well-formed.
  const term = String(search).replace(/[^\p{L}\p{N} @._-]/gu, '').trim().slice(0, 80);
  if (term) {
    const pattern = `%${term}%`;
    query = query.or(`first_name.ilike.${pattern},last_name.ilike.${pattern},company.ilike.${pattern},email.ilike.${pattern}`);
  }
  const start = (page - 1) * pageSize;
  const { data, count, error } = await query.order('created_at', { ascending: false }).order('id', { ascending: false }).range(start, start + pageSize - 1);
  if (error) throw error;
  return { data, count };
}
export async function getProspect(supabase, id) {
  const { data, error } = await supabase.from('prospects').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
// Field whitelist must be finalized against Mohcine's actual schema and RLS before activation.
export async function updateProspect(supabase, id, changes, allowedFields) {
  const keys = Object.keys(changes);
  if (!keys.length || keys.some(key => !allowedFields.includes(key))) throw new Error('Invalid editable fields.');
  const { data, error } = await supabase.from('prospects').update(changes).eq('id', id).select().single();
  if (error) throw error;
  return data;
}
export const STATUS_TRANSITIONS = Object.freeze({
  new: ['contacted', 'lost'], contacted: ['qualified', 'lost'],
  qualified: ['proposal_sent', 'lost'], proposal_sent: ['negotiation', 'won', 'lost'],
  negotiation: ['won', 'lost'], won: ['archived'], lost: ['archived'], archived: []
});
export async function changeProspectStatus(config, accessToken, id, currentStatus, newStatus, signal) {
  if (!STATUS_TRANSITIONS[currentStatus]?.includes(newStatus)) throw new Error('This status transition is not allowed.');
  if (!accessToken) throw new Error('Authentication required.');
  return postJson(webhookUrl(config, '/webhook/crm-02-status-management'), { id, new_status: newStatus }, accessToken, signal);
}
export async function submitPublicLead(config, lead, signal) {
  const { first_name, last_name, company = '', email, message, phone = '' } = lead;
  if (!first_name?.trim() || !last_name?.trim() || !message?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) throw new Error('Please complete all required fields with a valid email.');
  return postJson(webhookUrl(config, '/webhook/crm/lead-intake'), { first_name, last_name, company, email, message, phone }, null, signal);
}
