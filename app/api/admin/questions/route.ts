import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAllTemplates } from '@/lib/question-templates';
import { getScienceTemplates } from '@/lib/science-templates';
import { getSocialStudiesTemplates } from '@/lib/social-studies-templates';
import { getEnglishTemplates } from '@/lib/english-templates';
import { getBuddhismTemplates } from '@/lib/buddhism-templates';
import { generateQuestionFromTemplate } from '@/lib/template-generator';

export const dynamic = 'force-dynamic';

export type ReviewQuestion = {
  id: string;
  subject: string;
  category: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  source: 'database' | 'template';
  templateId?: string;
};

/**
 * GET /api/admin/questions?subject=Mathematics&category=Addition
 * Returns all questions for admin review. Optional category filters to subsection.
 * - subject: Mathematics | Science | Social Studies | English | Sinhala
 * - category: optional, e.g. "Addition" to see only that subsection
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || 'Mathematics';
    const category = searchParams.get('category') || null; // null = all categories

    const questions: ReviewQuestion[] = [];

    if (subject === 'Science') {
      let templates = getScienceTemplates();
      if (category) templates = templates.filter(t => t.category === category);
      templates.forEach(t => {
        const q = generateQuestionFromTemplate(t);
        questions.push({
          id: q.id || `sci-${t.id}`,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: 'template',
          templateId: t.id,
        });
      });
    } else if (subject === 'Social Studies') {
      let templates = getSocialStudiesTemplates();
      if (category) templates = templates.filter(t => t.category === category);
      templates.forEach(t => {
        const q = generateQuestionFromTemplate(t);
        questions.push({
          id: q.id || `ss-${t.id}`,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: 'template',
          templateId: t.id,
        });
      });
    } else if (subject === 'English') {
      let templates = getEnglishTemplates();
      if (category) templates = templates.filter(t => t.category === category);
      templates.forEach(t => {
        const q = generateQuestionFromTemplate(t);
        questions.push({
          id: q.id || `eng-${t.id}`,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: 'template',
          templateId: t.id,
        });
      });
    } else if (subject === 'Buddhism') {
      let templates = getBuddhismTemplates();
      if (category) templates = templates.filter(t => t.category === category);
      templates.forEach(t => {
        const q = generateQuestionFromTemplate(t);
        questions.push({
          id: q.id || `bud-${t.id}`,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: 'template',
          templateId: t.id,
        });
      });
    } else {
      // Mathematics: database questions + one sample per template
      let dbQuery = supabase
        .from('questions')
        .select('id, subject, category, topic, difficulty, question, options, correct_answer, method_steps');
      if (category) dbQuery = dbQuery.eq('category', category);
      const { data: dbRows, error } = await dbQuery;

      if (!error && dbRows?.length) {
        dbRows.forEach((row: any) => {
          questions.push({
            id: row.id,
            subject: row.subject || 'Mathematics',
            category: row.category,
            topic: row.topic,
            difficulty: row.difficulty,
            question: row.question,
            options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options || [],
            correctAnswer: row.correct_answer,
            source: 'database',
          });
        });
      }

      let templates = getAllTemplates();
      if (category) templates = templates.filter(t => t.category === category);
      templates.forEach(t => {
        const q = generateQuestionFromTemplate(t);
        questions.push({
          id: q.id || `math-${t.id}`,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          source: 'template',
          templateId: t.id,
        });
      });
    }

    // Sort by category then difficulty then question
    questions.sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      const diffOrder = { Easy: 0, Medium: 1, Hard: 2 };
      const da = diffOrder[a.difficulty as keyof typeof diffOrder] ?? 0;
      const db = diffOrder[b.difficulty as keyof typeof diffOrder] ?? 0;
      if (da !== db) return da - db;
      return a.question.localeCompare(b.question);
    });

    return NextResponse.json({
      subject,
      category: category || 'All',
      total: questions.length,
      questions,
    });
  } catch (e: any) {
    console.error('Admin questions API error:', e);
    return NextResponse.json(
      { error: e?.message || 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
