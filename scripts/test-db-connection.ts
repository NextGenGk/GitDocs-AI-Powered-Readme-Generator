import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('Supabase URL:', supabaseUrl);
    
    // Test 1: Check if users table exists and get its structure
    console.log('\n📋 Test 1: Checking users table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.error('❌ Users table error:', tableError);
      return;
    } else {
      console.log('✅ Users table exists and is accessible');
    }
    
    // Test 2: Try to get all users (to see current data)
    console.log('\n📊 Test 2: Checking existing users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name, avatar, readme_count')
      .limit(10);
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
    } else {
      console.log('✅ Found', users?.length || 0, 'users in database');
      if (users && users.length > 0) {
        console.log('📄 Sample users:');
        users.forEach((user, index) => {
          console.log(`  ${index + 1}. ID: ${user.id}, Email: ${user.email}, Count: ${user.readme_count}`);
        });
      }
    }
    
    // Test 3: Try to create a test user
    console.log('\n🧪 Test 3: Creating test user...');
    const testUserId = 'test-user-' + Date.now();
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        id: testUserId,
        email: 'test@example.com',
        name: 'Test User',
        avatar: null,
        readme_count: 0
      })
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Error creating test user:', createError);
      
      // Check if it's a permission issue
      if (createError.code === '42501') {
        console.error('🔒 Permission denied - check RLS policies');
      }
    } else {
      console.log('✅ Test user created successfully:', newUser);
      
      // Clean up test user
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', testUserId);
      
      if (deleteError) {
        console.error('⚠️ Could not delete test user:', deleteError);
      } else {
        console.log('🧹 Test user cleaned up');
      }
    }
    
    // Test 4: Check RLS policies
    console.log('\n🔒 Test 4: Checking RLS policies...');
    console.log('If you see permission errors above, you may need to:');
    console.log('1. Disable RLS on the users table, OR');
    console.log('2. Create proper RLS policies for authenticated users');
    console.log('\nTo disable RLS, run this SQL in Supabase dashboard:');
    console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

// Run the test
testDatabaseConnection();