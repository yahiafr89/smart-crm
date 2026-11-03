import { postJson, webhookUrl } from './client.js';
const ACTIONS = new Set(['summarize_prospect', 'prioritize_followups', 'explain_dashboard', 'draft_followup']);
export async function askAssistant(config, accessToken, { action, message = '', ...params }, signal) {
  if (!ACTIONS.has(action)) throw new Error('Unknown assistant action.');
  if (message.length > 2000) throw new Error('Message exceeds 2,000 characters.');
  if (!accessToken) throw new Error('Authentication required.');
  if (action === 'prioritize_followups' && (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 20)) throw new Error('Limit must be between 1 and 20.');
  if (['summarize_prospect', 'draft_followup'].includes(action) && !params.prospect_id) throw new Error('Prospect ID required.');
  if (action === 'explain_dashboard' && (!params.start_date || !params.end_date)) throw new Error('Dashboard period required.');
  const body = { action, ...params };
  if (message.trim()) body.message = message.trim();
  return postJson(webhookUrl(config, '/webhook/crm/assistant'), body, accessToken, signal);
}
