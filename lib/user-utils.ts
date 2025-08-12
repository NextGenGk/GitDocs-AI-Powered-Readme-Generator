import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function ensureUserExists(userId: string): Promise<{ success: boolean; readme_count: number }> {
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

  // Try to get existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('readme_count')
    .eq('id', userId)
    .single()

  if (fetchError && fetchError.code === 'PGRST116') {
    // User doesn't exist, create them
    console.log('Creating new user:', userId)
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({ 
        id: userId, 
        readme_count: 0,
        email: null,
        name: null,
        avatar: null
      })
      .select('readme_count')
      .single()

    if (insertError) {
      console.error('Error creating user:', insertError)
      return { success: false, readme_count: 0 }
    }
    
    return { success: true, readme_count: newUser?.readme_count || 0 }
  } else if (fetchError) {
    console.error('Error fetching user:', fetchError)
    return { success: false, readme_count: 0 }
  }

  return { success: true, readme_count: existingUser?.readme_count || 0 }
}

export async function canGenerateReadme(userId: string): Promise<{ allowed: boolean; remaining?: number }> {
  const { success, readme_count } = await ensureUserExists(userId)
  
  if (!success) {
    return { allowed: false }
  }

  const remaining = 3 - readme_count
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining)
  }
}

export async function incrementReadmeCount(userId: string): Promise<{ success: boolean; remaining?: number; newCount?: number }> {
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

  // First ensure user exists
  const { success: userExists, readme_count: currentCount } = await ensureUserExists(userId)
  
  if (!userExists) {
    return { success: false }
  }

  // Increment readme count by 1
  const newCount = currentCount + 1
  const { data, error } = await supabase
    .from('users')
    .update({ readme_count: newCount })
    .eq('id', userId)
    .select('readme_count')
    .single()
  
  if (error) {
    console.error('Error incrementing readme count:', error)
    return { success: false }
  }

  const finalCount = data?.readme_count || newCount
  return {
    success: true,
    newCount: finalCount,
    remaining: Math.max(0, 3 - finalCount)
  }
}
