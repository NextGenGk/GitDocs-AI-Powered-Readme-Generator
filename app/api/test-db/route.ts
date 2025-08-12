import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔍 Testing database for user:', userId);

    // Test 1: Check if users table is accessible
    const { data: tableTest, error: tableError } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);

    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'Table access failed',
        details: tableError,
        step: 'table_access'
      }, { status: 500 });
    }

    // Test 2: Try to fetch current user
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    let userStatus = 'exists';
    let currentUser = userData;

    if (fetchError && fetchError.code === 'PGRST116') {
      userStatus = 'not_found';
      
      // Test 3: Try to create user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: 'test@example.com',
          name: 'Test User',
          avatar: null,
          readme_count: 0
        })
        .select()
        .single();

      if (createError) {
        return NextResponse.json({
          success: false,
          error: 'User creation failed',
          details: createError,
          step: 'user_creation'
        }, { status: 500 });
      }

      userStatus = 'created';
      currentUser = newUser;
    } else if (fetchError) {
      return NextResponse.json({
        success: false,
        error: 'User fetch failed',
        details: fetchError,
        step: 'user_fetch'
      }, { status: 500 });
    }

    // Test 4: Try to update readme_count
    const { data: updateData, error: updateError } = await supabase
      .from('users')
      .update({ readme_count: (currentUser?.readme_count || 0) + 1 })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({
        success: false,
        error: 'Update failed',
        details: updateError,
        step: 'readme_count_update'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Database test completed successfully',
      results: {
        tableAccess: 'ok',
        userStatus,
        user: currentUser,
        updateResult: updateData,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      step: 'general_error'
    }, { status: 500 });
  }
}