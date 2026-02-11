import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz/topics
 * Returns list of all unique topics with question counts
 */
export async function GET() {
  try {
    // Get all unique topics with counts
    const { data: topics, error } = await supabase
      .from('questions')
      .select('topic')
      .order('topic');

    if (error) {
      throw error;
    }

    // Count questions per topic
    const topicCounts = topics.reduce((acc: Record<string, number>, { topic }) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {});

    // Convert to array with counts
    const topicList = Object.entries(topicCounts).map(([topic, count]) => ({
      topic,
      questionCount: count
    })).sort((a, b) => a.topic.localeCompare(b.topic));

    return NextResponse.json({ topics: topicList });
  } catch (error: any) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics', details: error.message },
      { status: 500 }
    );
  }
}
