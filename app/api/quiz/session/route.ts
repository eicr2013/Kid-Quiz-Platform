import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Question } from '@/types/question';
import { getAllTemplates, getTemplatesByCategory } from '@/lib/question-templates';
import { getScienceTemplates } from '@/lib/science-templates';
import { generateQuestionFromTemplate } from '@/lib/template-generator';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz/session?categories=Category1,Category2&subject=Mathematics
 * Fetches a new quiz session with 10 random questions
 * Uses dynamic templates for Addition, Subtraction, Multiplication, Division, Fractions, Units of Time
 * Ensures balanced difficulty distribution
 * Optional: Filter by categories (comma-separated) and subject
 */
export async function GET(request: Request) {
  try {
    // Get categories and subject from query parameters
    const { searchParams } = new URL(request.url);
    const categoriesParam = searchParams.get('categories');
    const subject = searchParams.get('subject') || 'Mathematics';
    const selectedCategories = categoriesParam ? categoriesParam.split(',').map(c => c.trim()) : null;

    // Get the appropriate templates based on subject
    const allTemplates = subject === 'Science' ? getScienceTemplates() : getAllTemplates();
    
    // For Science, all categories use templates
    // For Mathematics, check which categories use dynamic templates
    const dynamicCategories = subject === 'Science' 
      ? Array.from(new Set(allTemplates.map(t => t.category)))
      : [
          'Addition', 
          'Subtraction', 
          'Multiplication', 
          'Division', 
          'Fractions', 
          'Units of Time',
          'Money',
          'Measurement - Weight',
          'Measurement - Length',
          'Measurement - Capacity',
          'Place Value',
          'Number Properties'
        ];
    
    // Check if we should use templates for any selected categories
    const useDynamicForCategories = selectedCategories?.filter(cat => 
      dynamicCategories.includes(cat)
    ) || [];
    
    const useStaticForCategories = subject === 'Science' 
      ? []
      : selectedCategories?.filter(cat => !dynamicCategories.includes(cat)) || [];

    let allQuestions: Question[] = [];

    // Generate questions from templates for dynamic categories
    if (useDynamicForCategories.length > 0) {
      const templates = allTemplates.filter(t => 
        useDynamicForCategories.includes(t.category)
      );

      // Separate by difficulty
      const easyTemplates = templates.filter(t => t.difficulty === 'Easy');
      const mediumTemplates = templates.filter(t => t.difficulty === 'Medium');
      const hardTemplates = templates.filter(t => t.difficulty === 'Hard');

      // For Science (static templates), use all available questions
      // For Math (dynamic templates), generate 4-4-2 distribution
      const isStaticTemplate = subject === 'Science';
      
      if (isStaticTemplate) {
        // Use all available templates (don't repeat since they're static exam questions)
        easyTemplates.forEach(template => {
          allQuestions.push(generateQuestionFromTemplate(template));
        });
        mediumTemplates.forEach(template => {
          allQuestions.push(generateQuestionFromTemplate(template));
        });
        hardTemplates.forEach(template => {
          allQuestions.push(generateQuestionFromTemplate(template));
        });
      } else {
        // Dynamic templates (Math) - generate 4 Easy, 4 Medium, 2 Hard with repetition allowed
        for (let i = 0; i < 4; i++) {
          if (easyTemplates.length > 0) {
            const template = easyTemplates[Math.floor(Math.random() * easyTemplates.length)];
            allQuestions.push(generateQuestionFromTemplate(template));
          }
        }
        for (let i = 0; i < 4; i++) {
          if (mediumTemplates.length > 0) {
            const template = mediumTemplates[Math.floor(Math.random() * mediumTemplates.length)];
            allQuestions.push(generateQuestionFromTemplate(template));
          }
        }
        for (let i = 0; i < 2; i++) {
          if (hardTemplates.length > 0) {
            const template = hardTemplates[Math.floor(Math.random() * hardTemplates.length)];
            allQuestions.push(generateQuestionFromTemplate(template));
          }
        }
      }
    }

    // Fetch static questions from database for non-dynamic categories
    if (useStaticForCategories.length > 0 || !selectedCategories) {
      let easyQuery = supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'Easy');
      
      let mediumQuery = supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'Medium');
      
      let hardQuery = supabase
        .from('questions')
        .select('*')
        .eq('difficulty', 'Hard');

      // Add category filter for static categories
      if (useStaticForCategories.length > 0) {
        easyQuery = easyQuery.in('category', useStaticForCategories);
        mediumQuery = mediumQuery.in('category', useStaticForCategories);
        hardQuery = hardQuery.in('category', useStaticForCategories);
      }

      const { data: easyQuestions, error: easyError } = await easyQuery.limit(100);
      const { data: mediumQuestions, error: mediumError } = await mediumQuery.limit(100);
      const { data: hardQuestions, error: hardError } = await hardQuery.limit(100);

      if (easyError || mediumError || hardError) {
        throw new Error('Failed to fetch questions from database');
      }

      if (easyQuestions?.length && mediumQuestions?.length && hardQuestions?.length) {
        const neededEasy = 4 - allQuestions.filter(q => q.difficulty === 'Easy').length;
        const neededMedium = 4 - allQuestions.filter(q => q.difficulty === 'Medium').length;
        const neededHard = 2 - allQuestions.filter(q => q.difficulty === 'Hard').length;

        const staticQuestions = [
          ...getRandomItems(easyQuestions, neededEasy),
          ...getRandomItems(mediumQuestions, neededMedium),
          ...getRandomItems(hardQuestions, neededHard),
        ].map(q => ({
          id: q.id,
          subject: q.subject,
          category: q.category,
          topic: q.topic,
          difficulty: q.difficulty,
          question: q.question,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
          correctAnswer: q.correct_answer,
          methodSteps: typeof q.method_steps === 'string' ? JSON.parse(q.method_steps) : q.method_steps,
          questionType: q.question_type,
          estimatedTimeSeconds: q.difficulty === 'Easy' ? 15 : q.difficulty === 'Medium' ? 20 : 30,
        }));

        allQuestions = [...allQuestions, ...staticQuestions];
      }
    }

    // Ensure we have enough questions
    if (allQuestions.length < 10) {
      return NextResponse.json(
        { error: 'Insufficient questions available for selected categories' },
        { status: 500 }
      );
    }

    // Shuffle and take 10 questions
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);

    return NextResponse.json({
      sessionId: `session-${Date.now()}`,
      questions: shuffledQuestions,
      totalQuestions: 10,
    });
  } catch (error) {
    console.error('Error creating quiz session:', error);
    return NextResponse.json(
      { error: 'Failed to create quiz session' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to get random items from array
 */
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Helper function to shuffle array
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
