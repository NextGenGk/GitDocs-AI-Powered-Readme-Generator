import { sql } from '@vercel/postgres';

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        message TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Database setup completed successfully!');
    console.log('Feedback table is ready to use.');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  }
}

setupDatabase();
