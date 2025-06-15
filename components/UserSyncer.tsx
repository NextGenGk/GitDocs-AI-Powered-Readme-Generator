'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function UserSyncer() {
    const { user, isLoaded } = useUser();
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        if (!isLoaded || !user || synced) return;

        (async () => {
            const email = user.emailAddresses[0]?.emailAddress || '';
            const { error } = await supabase
                .from('users')
                .upsert({
                    id: user.id,
                    email,
                    name: user.fullName || '',
                    avatar: user.imageUrl || '',
                });
            if (!error) setSynced(true);
            else console.error('Supabase sync error:', error);
        })();
    }, [isLoaded, user, synced]);

    return null;
}
