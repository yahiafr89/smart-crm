/** Read-only client adapter. Confirm table/column names with the backend owner. */
export async function listClients(supabase, { page = 1, pageSize = 20 } = {}) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw new Error('Invalid pagination.');
  const start = (page - 1) * pageSize;
  const { data, count, error } = await supabase.from('clients').select('*', { count: 'exact' }).range(start, start + pageSize - 1);
  if (error) throw error;
  return { data, count };
}
export async function getClient(supabase, id) {
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}
