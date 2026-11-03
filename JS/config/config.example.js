// Copy to config.js and replace public values. Never commit credentials.
// This static HTML/JS project does not load .env files automatically.
export const config = Object.freeze({
  mode: 'demo', // 'demo' or 'connected'; connected mode requires backend setup
  supabaseUrl: '',
  supabasePublishableKey: '',
  n8nPublicBaseUrl: ''
});
