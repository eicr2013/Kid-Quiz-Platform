import { Question } from './question';

/**
 * Variable definition for dynamic question generation
 */
export interface VariableDefinition {
  min: number;
  max: number;
  step?: number;        // Optional: increment step (e.g., 5 for multiples of 5)
  exclude?: number[];   // Optional: values to exclude
}

/**
 * Question template for generating infinite variations
 */
export interface QuestionTemplate {
  id: string;
  category: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  
  // Template with placeholders like {num1}, {num2}
  questionTemplate: string;
  
  // Variable definitions
  variables: {
    [key: string]: VariableDefinition;
  };
  
  // JavaScript expression to calculate answer
  // Can use variable names: "num1 + num2", "100 - num1", etc.
  answerFormula: string;
  
  // Optional: formulas for generating wrong answers
  // If not provided, will generate random nearby values
  wrongAnswerFormulas?: string[];
  
  // Method steps with variable placeholders
  methodStepsTemplate: Array<{
    step: string;
    detail: string;  // Can include {variable} placeholders
  }>;
  
  // Optional: image configuration
  imageConfig?: {
    type: 'fraction-shape' | 'clock';
    // Variable names to use for image data
    numeratorVar?: string;
    denominatorVar?: string;
    shapeVar?: string;
    hoursVar?: string;
    minutesVar?: string;
    shape?: 'circle' | 'rectangle';  // Fixed shape type
  };
  
  questionType: "mcq" | "short_answer";
  estimatedTimeSeconds: number;
}

/**
 * Generated values for a specific question instance
 */
export interface GeneratedValues {
  [key: string]: number;
}

/**
 * Result of generating a question from a template
 */
export interface GeneratedQuestion extends Question {
  templateId?: string;
  generatedValues?: GeneratedValues;
}
