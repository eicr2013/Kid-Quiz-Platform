import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/quiz/session/[sessionId]
 * Fetches session details including all questions and answers
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    // Get session
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get session questions with question details
    const { data: sessionQuestions, error: questionsError } = await supabase
      .from('session_questions')
      .select(`
        *,
        questions (*)
      `)
      .eq('session_id', sessionId)
      .order('question_order');

    if (questionsError) {
      throw questionsError;
    }

    // Calculate score
    const correctCount = sessionQuestions?.filter(sq => sq.is_correct).length || 0;
    const totalAnswered = sessionQuestions?.filter(sq => sq.user_answer).length || 0;

    return NextResponse.json({
      session,
      questions: sessionQuestions,
      score: {
        correct: correctCount,
        total: session.total_questions,
        answered: totalAnswered,
        percentage: totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0,
      },
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
