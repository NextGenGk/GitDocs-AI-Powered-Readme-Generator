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
          console.log('🔄 Syncing user to database:', user.id);
          
          // First check if user exists
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id, readme_count')
            .eq('id', user.id)
            .single();

          if (fetchError && fetchError.code === 'PGRST116') {
            // User doesn't exist, create new user with readme_count = 0
            console.log('👤 Creating new user in database...');
            const { data, error: insertError } = await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.username,
                avatar: user.imageUrl,
                readme_count: 0
              })
              .select();

            if (insertError) {
              console.error('❌ Error creating user:', insertError);
            } else {
              console.log('✅ User created successfully:', data);
            }
          } else if (!fetchError) {
            // User exists, update their info but preserve readme_count
            console.log('🔄 Updating existing user info...');
            const { data, error: updateError } = await supabase
              .from('users')
              .update({
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName || user.username,
                avatar: user.imageUrl,
              })
              .eq('id', user.id)
              .select();

            if (updateError) {
              console.error('❌ Error updating user:', updateError);
            } else {
              console.log('✅ User updated successfully:', data);
            }
          } else {
            console.error('❌ Error fetching user:', fetchError);
          }
        } catch (error) {
          console.error('❌ Error syncing user:', error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
