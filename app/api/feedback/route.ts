import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
  rating: number;
  message: string;
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    
    // Validate input
    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // In production, you might want to send this to an email service or database

    return NextResponse.json(
      { success: true, message: 'Thank you for your feedback!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return empty array since we're not storing feedback anymore
  return NextResponse.json({ feedback: [] });
}
