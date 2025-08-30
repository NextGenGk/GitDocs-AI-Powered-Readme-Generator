"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function UserSyncer() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Sync user data with Supabase
      const syncUser = async () => {
        try {
          // Prepare user data
          const userData = {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || null,
            name: user.fullName || user.username || null,
            avatar: user.imageUrl || null,
            readme_count: 0, // Only set for new users, existing users keep their count
          };

          // Use upsert to create or update user
          await supabase
            .from("users")
            .upsert(userData, {
              onConflict: "id",
              ignoreDuplicates: false,
            });
        } catch (error) {
          // Silently handle errors in production
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
}
