import { NextResponse } from 'next/server';
import { Question } from '@/types/question';
import { getAllTemplates, getTemplatesByCategory } from '@/lib/question-templates';
import { getScienceTemplates } from '@/lib/science-templates';
import { getSocialStudiesTemplates } from '@/lib/social-studies-templates';
import { getEnglishTemplates } from '@/lib/english-templates';
import { getBuddhismTemplates } from '@/lib/buddhism-templates';
import { getComputingTemplates } from '@/lib/computing-templates';
import { getHumanValuesTemplates } from '@/lib/human-values-templates';
import { getMathPreviewTemplates } from '@/lib/math-preview-templates';
import { generateQuestionFromTemplate } from '@/lib/template-generator';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

/**
 * GET /api/quiz/session?categories=Category1,Category2&subject=Mathematics&count=10
 * Fetches a new quiz session with specified number of questions (default: 10)
 * Uses dynamic templates for Addition, Subtraction, Multiplication, Division, Fractions, Units of Time
 * Ensures balanced difficulty distribution
 * Optional: Filter by categories (comma-separated), subject, and count
 */
export async function GET(request: Request) {
  try {
    // Get categories, subject, and count from query parameters
    const { searchParams } = new URL(request.url);
    const categoriesParam = searchParams.get('categories');
    const subject = searchParams.get('subject') || 'Mathematics';
    const countParam = searchParams.get('count');
    const requestedCount = countParam ? parseInt(countParam, 10) : 10;
    const questionCount = Math.max(1, Math.min(requestedCount, 100)); // Min 1, Max 100
    const selectedCategories = categoriesParam ? categoriesParam.split(',').map(c => c.trim()) : null;

    // Get the appropriate templates based on subject
    const allTemplates = subject === 'Science'
      ? getScienceTemplates()
      : subject === 'Social Studies'
        ? getSocialStudiesTemplates()
        : subject === 'English'
          ? getEnglishTemplates()
          : subject === 'Buddhism'
              ? getBuddhismTemplates()
              : subject === 'Computing'
                ? getComputingTemplates()
                : subject === 'Education in Human Values'
                  ? getHumanValuesTemplates()
                  : subject === 'Mathematics Preview'
                    ? getMathPreviewTemplates()
                    : getAllTemplates();
    
    // For Science, Social Studies, English, Buddhism, Computing, and Human Values, all categories use templates
    // For Mathematics, check which categories use dynamic templates
    const dynamicCategories = subject === 'Science' || subject === 'Social Studies' || subject === 'English' || subject === 'Buddhism' || subject === 'Computing' || subject === 'Education in Human Values' || subject === 'Mathematics Preview'
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
    
    const useStaticForCategories = subject === 'Science' || subject === 'Social Studies' || subject === 'English' || subject === 'Buddhism'
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

      // For Science, Social Studies, and English (static templates), use all available questions
      // For Math (dynamic templates), generate 4-4-2 distribution
      const isStaticTemplate = subject === 'Science' || subject === 'Social Studies' || subject === 'English' || subject === 'Buddhism';
      
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
        // Dynamic templates (Math) - generate unique questions with balanced difficulty distribution
        // NO REPETITION: Each template used only once
        // Distribution goal: 40% Easy, 40% Medium, 20% Hard
        
        // Calculate maximum available unique questions
        const maxAvailable = easyTemplates.length + mediumTemplates.length + hardTemplates.length;
        const actualCount = Math.min(questionCount, maxAvailable);
        
        // Calculate counts respecting available templates
        let easyCount = Math.min(Math.ceil(actualCount * 0.4), easyTemplates.length);
        let mediumCount = Math.min(Math.ceil(actualCount * 0.4), mediumTemplates.length);
        let hardCount = Math.min(actualCount - easyCount - mediumCount, hardTemplates.length);
        
        // Adjust if we still need more questions and have templates available
        const stillNeeded = actualCount - (easyCount + mediumCount + hardCount);
        if (stillNeeded > 0) {
          // Fill remaining with available templates
          if (easyCount < easyTemplates.length) {
            const canAdd = Math.min(stillNeeded, easyTemplates.length - easyCount);
            easyCount += canAdd;
          } else if (mediumCount < mediumTemplates.length) {
            const canAdd = Math.min(stillNeeded, mediumTemplates.length - mediumCount);
            mediumCount += canAdd;
          } else if (hardCount < hardTemplates.length) {
            const canAdd = Math.min(stillNeeded, hardTemplates.length - hardCount);
            hardCount += canAdd;
          }
        }
        
        // Shuffle templates to ensure randomness WITHOUT repetition
        const shuffledEasy = shuffleArray([...easyTemplates]);
        const shuffledMedium = shuffleArray([...mediumTemplates]);
        const shuffledHard = shuffleArray([...hardTemplates]);
        
        // Generate questions (each template used once)
        for (let i = 0; i < easyCount; i++) {
          allQuestions.push(generateQuestionFromTemplate(shuffledEasy[i]));
        }
        for (let i = 0; i < mediumCount; i++) {
          allQuestions.push(generateQuestionFromTemplate(shuffledMedium[i]));
        }
        for (let i = 0; i < hardCount; i++) {
          allQuestions.push(generateQuestionFromTemplate(shuffledHard[i]));
        }
      }
    }

    // Note: Static database questions have been removed.
    // All questions now come from TypeScript template files.

    // Require at least one question
    if (allQuestions.length === 0) {
      return NextResponse.json(
        { error: 'No questions available for the selected categories. Try selecting more categories or a different subject.' },
        { status: 400 }
      );
    }

    // Shuffle and take up to requested count (or all available if fewer)
    const totalToTake = Math.min(questionCount, allQuestions.length);
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, totalToTake);

    return NextResponse.json({
      sessionId: `session-${Date.now()}`,
      questions: shuffledQuestions,
      totalQuestions: shuffledQuestions.length,
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
