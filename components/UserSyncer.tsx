'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UserSyncer() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Sync user data with Supabase
      const syncUser = async () => {
        try {
          console.log('🔄 Syncing user to Supabase:', user.id);

          // Use upsert to create or update user
          const { data, error } = await supabase
            .from('users')
            .upsert({
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress || null,
              name: user.fullName || user.username || null,
              avatar: user.imageUrl || null,
              readme_count: 0 // Only set for new users, existing users keep their count
            }, {
              onConflict: 'id',
              ignoreDuplicates: false
            })
            .select();

          if (error) {
            console.error('❌ Error syncing user:', error);
          } else {
            console.log('✅ User synced successfully to Supabase');
          }
        } catch (error) {
          console.error('❌ Unexpected error syncing user:', error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
