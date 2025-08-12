import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if we can connect to Supabase
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.rpc('version');
    
    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json(
        { status: 'error', message: 'Supabase connection error', error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ status: 'ok', supabase: 'connected' });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Health check failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
