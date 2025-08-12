import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function canGenerateReadme(userId: string): Promise<{ allowed: boolean; remaining?: number }> {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // Get current readme count
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
      return { allowed: false }
    }
    
    return { allowed: true, remaining: 3 }
  }

  const remaining = 3 - (data.readme_count || 0)
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining)
  }
}

export async function incrementReadmeCount(userId: string): Promise<{ success: boolean; remaining?: number }> {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // Increment readme count
  const { data, error } = await supabase.rpc('increment_readme_count', { user_id: userId })
  
  if (error) {
    console.error('Error incrementing readme count:', error)
    return { success: false }
  }

  return {
    success: true,
    remaining: Math.max(0, 3 - (data || 0))
  }
}
