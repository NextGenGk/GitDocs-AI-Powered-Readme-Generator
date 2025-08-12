import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function canGenerateReadme(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  // Get current readme count for the user
  const { data, error } = await supabase
    .from('users')
    .select('readme_count')
    .eq('id', userId)
    .single()

  if (error || !data) {
    // If user doesn't exist, create them with 0 readme count
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: userId, readme_count: 0 }])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user:', insertError)
      return { allowed: false, remaining: 0 }
    }
    
    return { allowed: true, remaining: 3 }
  }

  const remaining = 3 - (data.readme_count || 0)
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining)
  }
}

export async function incrementReadmeCount(userId: string): Promise<{ success: boolean; remaining: number }> {
  // First check if user exists, if not create them
  await canGenerateReadme(userId)
  
  // Increment the readme count
  const { data, error } = await supabase.rpc('increment_readme_count', { user_id: userId })
  
  if (error) {
    console.error('Error incrementing readme count:', error)
    return { success: false, remaining: 0 }
  }

  const remaining = 3 - (data || 0)
  return {
    success: true,
    remaining: Math.max(0, remaining)
  }
}
