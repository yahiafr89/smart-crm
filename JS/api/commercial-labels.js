// Resolve salesperson names using the authenticated client and existing Supabase RLS.
// Never use a service-role key or a client-side role bypass.
export async function loadCommercialNames(supabase, ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();
  const { data, error } = await supabase.from('commercials')
    .select('id,display_name').in('id', unique);
  if (error) throw error;
  return new Map((data || []).map(({ id, display_name }) => [id, display_name]));
}

export function commercialLabel(id, names, french) {
  if (!id) return french ? 'Non affecté' : 'Unassigned';
  const name = names.get(id);
  return typeof name === 'string' && name.trim()
    ? name.trim()
    : french ? 'Nom indisponible' : 'Name unavailable';
}
