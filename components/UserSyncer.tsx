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
          // First check if user exists to preserve readme_count
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('readme_count')
            .eq('id', user.id)
            .single();

          if (fetchError && fetchError.code === 'PGRST116') {
            // User doesn't exist, create new user
            const { data, error } = await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress || null,
                name: user.fullName || user.username || null,
                avatar: user.imageUrl || null,
                readme_count: 0
              })
              .select();

            if (error) {
              console.error('Error creating user:', error);
            } else {
              console.log('User created successfully');
            }
          } else if (!fetchError) {
            // User exists, update their info but preserve readme_count
            const { data, error } = await supabase
              .from('users')
              .update({
                email: user.primaryEmailAddress?.emailAddress || null,
                name: user.fullName || user.username || null,
                avatar: user.imageUrl || null,
              })
              .eq('id', user.id)
              .select();

            if (error) {
              console.error('Error updating user:', error);
            } else {
              console.log('User updated successfully');
            }
          } else {
            console.error('Error fetching user:', fetchError);
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
