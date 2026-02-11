import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz/categories
 * Returns list of main categories with question counts
 */
export async function GET() {
  try {
    // Get all questions with their categories
    const { data: questions, error } = await supabase
      .from('questions')
      .select('category');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Fetched questions:', questions?.length);
    console.log('Sample categories:', questions?.slice(0, 3));

    // Count questions per category, filtering out null/undefined
    const categoryCounts = questions?.reduce((acc: Record<string, number>, { category }) => {
      // Skip null or undefined categories
      if (category && category !== 'null' && category !== 'undefined') {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {}) || {};

    console.log('Category counts:', categoryCounts);

    // Convert to array with counts and sort
    const categories = Object.entries(categoryCounts)
      .map(([category, count]) => ({
        category,
        questionCount: count
      }))
      .sort((a, b) => a.category.localeCompare(b.category));

    console.log('Returning categories:', categories);

    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    );
  }
}
