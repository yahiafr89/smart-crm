/** Supabase Auth adapter; pass an initialized Supabase client at call time. */
export async function signIn(supabase, email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}
export async function signOut(supabase) {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export async function getSession(supabase) {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}
export async function getBusinessProfile(supabase, authUserId) {
  const { data, error } = await supabase.from('users').select('*').eq('auth_user_id', authUserId).single();
  if (error) throw error;
  return data;
}
