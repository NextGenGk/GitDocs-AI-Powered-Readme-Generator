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

    // Log the feedback (in a real app, you might want to send an email here)
    console.log('New Feedback Received:', {
      rating: body.rating,
      message: body.message,
      email: body.email,
      name: body.name,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for your feedback!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing feedback:', error);
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
