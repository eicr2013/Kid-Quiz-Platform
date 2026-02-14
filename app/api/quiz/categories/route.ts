import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAllTemplates } from '@/lib/question-templates';
import { getScienceTemplates } from '@/lib/science-templates';
import { getSocialStudiesTemplates } from '@/lib/social-studies-templates';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz/categories?subject=Mathematics
 * Returns list of main categories with question counts
 * Includes both database questions and template-based categories
 */
export async function GET(request: Request) {
  try {
    // Get subject from query parameters
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || 'Mathematics';
    // Get all questions with their categories from database
    const { data: questions, error } = await supabase
      .from('questions')
      .select('category');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Fetched questions:', questions?.length);

    // Count questions per category from database
    const categoryCounts = questions?.reduce((acc: Record<string, number>, { category }) => {
      // Skip null or undefined categories
      if (category && category !== 'null' && category !== 'undefined') {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {}) || {};

    // Get categories from templates based on subject
    const templates = subject === 'Science'
      ? getScienceTemplates()
      : subject === 'Social Studies'
        ? getSocialStudiesTemplates()
        : getAllTemplates();
    const templateCategories = new Set(templates.map(t => t.category));

    // For Science and Social Studies, only use templates (no database questions)
    // For Mathematics, combine database and template questions
    if (subject === 'Science') {
      // Count actual templates per category for Science (static templates, not dynamic)
      const scienceCategories: Record<string, number> = {};
      templates.forEach(template => {
        scienceCategories[template.category] = (scienceCategories[template.category] || 0) + 1;
      });
      
      const categories = Object.entries(scienceCategories)
        .map(([category, count]) => ({
          category,
          questionCount: count
        }))
        .sort((a, b) => a.category.localeCompare(b.category));

      return NextResponse.json({ categories });
    }

    if (subject === 'Social Studies') {
      const socialStudiesCategories: Record<string, number> = {};
      templates.forEach(template => {
        socialStudiesCategories[template.category] = (socialStudiesCategories[template.category] || 0) + 1;
      });
      const categories = Object.entries(socialStudiesCategories)
        .map(([category, count]) => ({
          category,
          questionCount: count
        }))
        .sort((a, b) => a.category.localeCompare(b.category));
      return NextResponse.json({ categories });
    }

    // For Mathematics: Add template-based categories
    templateCategories.forEach(category => {
      if (!categoryCounts[category]) {
        // Mark as having infinite questions (we'll use 999 as a placeholder)
        categoryCounts[category] = 999;
      }
    });

    console.log('Category counts (including templates):', categoryCounts);

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
