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
          await supabase
            .from('users')
            .upsert(
              {
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.username,
                avatar: user.imageUrl,
              },
              { onConflict: 'id' }
            )
            .select();
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
