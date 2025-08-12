import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkReadmeLimit(userId: string) {
  try {
    // Get or create user with readme count
    const { data, error } = await supabase
      .from('users')
      .select('readme_count')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned

    const generationsUsed = data?.readme_count || 0;
    const remaining = Math.max(0, 3 - generationsUsed);
    
    return {
      generationsUsed,
      maxGenerations: 3,
      remaining,
      isLimitReached: generationsUsed >= 3,
      error: null
    };
  } catch (error) {
    console.error('Error checking readme limit:', error);
    return {
      generationsUsed: 0,
      maxGenerations: 3,
      remaining: 0,
      isLimitReached: true,
      error: 'Failed to check readme limit'
    };
  }
}

export async function incrementReadmeCount(userId: string) {
  try {
    // First try to get existing user
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingUser) {
      // If user doesn't exist, create with count 1
      const { error } = await supabase
        .from('users')
        .insert([{ id: userId, readme_count: 1 }]);
      
      if (error) throw error;
      return { success: true, remaining: 2 };
    }

    // Otherwise increment count
    const { data, error } = await supabase.rpc('increment_readme_count', { user_id: userId });
    if (error) throw error;

    const remaining = Math.max(0, 3 - (data || 1));
    return { success: true, remaining };
  } catch (error) {
    console.error('Error incrementing readme count:', error);
    return { success: false, error: 'Failed to update readme count' };
  }
}
