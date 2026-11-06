import { postJson, webhookUrl } from './client.js';
export async function askAssistant(config, accessToken, { action, prospect_id, start_date, end_date }, signal) {
  if (!accessToken) throw new Error('Authentication required.');
  let body;
  switch (action) {
    case 'prioritize_followups': body = { action }; break;
    case 'summarize_prospect':
    case 'draft_followup':
      if (!Number.isSafeInteger(prospect_id) || prospect_id < 1) throw new Error('Invalid prospect ID.');
      body = { action, prospect_id }; break;
    case 'explain_dashboard': {
      const valid = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value + 'T00:00:00Z')) && new Date(value + 'T00:00:00Z').toISOString().slice(0,10) === value;
      if (!valid(start_date) || !valid(end_date) || start_date > end_date) throw new Error('Invalid dashboard period.');
      body = { action, start_date, end_date }; break;
    }
    default: throw new Error('Unknown assistant action.');
  }
  return postJson(webhookUrl(config, '/webhook/crm/assistant'), body, accessToken, signal);
}
