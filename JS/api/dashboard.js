/** Dashboard counts are server-calculated, never reconstructed from a prospect page. */
export async function getDashboard(supabase, startDate, endDate) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(startDate) || !datePattern.test(endDate) || startDate > endDate) throw new Error('Invalid dashboard date range.');
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start.toISOString().slice(0, 10) !== startDate || end.toISOString().slice(0, 10) !== endDate || (end - start) / 86400000 >= 366) throw new Error('Dashboard range must contain at most 366 days.');
  const { data, error } = await supabase.rpc('get_crm_dashboard', { p_start_date: startDate, p_end_date: endDate });
  if (error) throw error;
  return data;
}
