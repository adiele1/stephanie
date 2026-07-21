import { supabase } from './supabase';

export interface SaveSessionInput {
  occasion: string;
  occasionOther?: string;
  selectedLookId: string;
  rating: number;
}

/** Persists a completed session row. Requires a signed-in Supabase Auth user — the
 *  `sessions` table is RLS'd to `auth.uid() = user_id` (it's personal data, unlike the
 *  catalog tables). There is no phone/OTP sign-in flow built yet, so this will reject
 *  with an auth error until that exists; callers should treat that as expected, not a
 *  bug, and prompt sign-in rather than silently failing. */
export async function saveCompletedSession(input: SaveSessionInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('NOT_SIGNED_IN');
  }

  const { error } = await supabase.from('sessions').insert({
    user_id: user.id,
    occasion: input.occasion,
    occasion_other: input.occasionOther ?? null,
    selected_look_id: input.selectedLookId,
    status: 'completed',
    rating: input.rating || null,
    completed_at: new Date().toISOString(),
  });

  if (error) throw error;
}
