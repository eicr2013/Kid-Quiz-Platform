import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/progress?userName=Sarah
 * Returns all category progress for one user (for loading on any device).
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get('userName');
    if (!userName || userName.trim() === '') {
      return NextResponse.json({ error: 'userName required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('quiz_progress')
      .select('*')
      .eq('user_name', userName.trim());

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Convert rows to the same shape as ProgressContext (categories map)
    const categories: Record<string, { category: string; subject: string; totalAttempted: number; totalCorrect: number; totalWrong: number; lastPracticed: string }> = {};
    (data || []).forEach((row: any) => {
      const key = `${row.subject}:${row.category}`;
      categories[key] = {
        category: row.category,
        subject: row.subject,
        totalAttempted: row.total_attempted,
        totalCorrect: row.total_correct,
        totalWrong: row.total_wrong,
        lastPracticed: row.last_practiced,
      };
    });

    return NextResponse.json({ categories });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Failed to fetch progress' }, { status: 500 });
  }
}

/**
 * POST /api/progress
 * Body: { userName, subject, category, totalAttempted, totalCorrect, totalWrong, lastPracticed }
 * Upserts one category's progress so it's synced across devices.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userName, subject, category, totalAttempted, totalCorrect, totalWrong, lastPracticed } = body;
    if (!userName || subject == null || !category) {
      return NextResponse.json({ error: 'userName, subject, category required' }, { status: 400 });
    }

    const row = {
      user_name: String(userName).trim(),
      subject: String(subject),
      category: String(category),
      total_attempted: Number(totalAttempted) || 0,
      total_correct: Number(totalCorrect) || 0,
      total_wrong: Number(totalWrong) || 0,
      last_practiced: lastPracticed || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('quiz_progress')
      .upsert(row, {
        onConflict: 'user_name,subject,category',
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Failed to save progress' }, { status: 500 });
  }
}
