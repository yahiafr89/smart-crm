/** Shared network primitives for future integration; no network calls on import. */
export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}
export function requireConfigured(value, label) {
  if (!value || typeof value !== 'string') throw new ApiError(`${label} is not configured.`);
  return value.replace(/\/+$/, '');
}
export async function postJson(url, body, accessToken, signal) {
  const headers = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  let response;
  try { response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal }); }
  catch (error) { throw new ApiError('Network request failed.', 0, error); }
  let payload = null;
  try { payload = await response.json(); } catch { /* Non-JSON error response */ }
  if (!response.ok) throw new ApiError(payload?.message || payload?.error || `Request failed (${response.status}).`, response.status, payload);
  return payload;
}
export function webhookUrl(config, path) {
  return `${requireConfigured(config.n8nPublicBaseUrl, 'n8n public base URL')}${path}`;
}
