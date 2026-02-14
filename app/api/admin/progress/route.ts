import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/progress
 * Returns all users' progress (for admin dashboard from any device).
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('quiz_progress')
      .select('*')
      .order('last_practiced', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Group by user_name to match AdminDashboard shape: { [userName]: { userName, lastActivity, categories: { key: CategoryProgress } } }
    const byUser: Record<string, { userName: string; lastActivity: string; categories: Record<string, any> }> = {};
    (data || []).forEach((row: any) => {
      const name = row.user_name;
      if (!byUser[name]) {
        byUser[name] = {
          userName: name,
          lastActivity: row.last_practiced,
          categories: {},
        };
      }
      const key = `${row.subject}:${row.category}`;
      byUser[name].categories[key] = {
        category: row.category,
        subject: row.subject,
        totalAttempted: row.total_attempted,
        totalCorrect: row.total_correct,
        totalWrong: row.total_wrong,
        lastPracticed: row.last_practiced,
      };
      if (new Date(row.last_practiced) > new Date(byUser[name].lastActivity)) {
        byUser[name].lastActivity = row.last_practiced;
      }
    });

    return NextResponse.json(byUser);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || 'Failed to fetch admin progress' }, { status: 500 });
  }
}
