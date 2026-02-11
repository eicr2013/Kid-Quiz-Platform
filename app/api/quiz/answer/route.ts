import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/quiz/answer
 * Submits an answer for a question in a session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userAnswer, correctAnswer } = body;

    if (!userAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if answer is correct
    const isCorrect = userAnswer.trim().toLowerCase() === 
                      correctAnswer.trim().toLowerCase();

    // Return result (no database save needed)
    const response: any = {
      isCorrect,
      correctAnswer,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error checking answer:', error);
    return NextResponse.json(
      { error: 'Failed to check answer' },
      { status: 500 }
    );
  }
}
