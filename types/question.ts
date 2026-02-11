export interface Question {
  id?: string;
  subject: string;
  category: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correctAnswer: string;
  methodSteps: MethodStep[];
  questionType: "mcq" | "short_answer";
  estimatedTimeSeconds: number;
  created_at?: string;
  image?: QuestionImage;
}

export interface QuestionImage {
  type: 'fraction-shape' | 'clock';
  // For fractions
  numerator?: number;
  denominator?: number;
  shape?: 'circle' | 'rectangle';
  // For clocks
  hours?: number;
  minutes?: number;
}

export interface MethodStep {
  step: string;
  detail: string;
}

export interface QuizSession {
  id?: string;
  questions: Question[];
  createdAt?: string;
}

export interface UserAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: string;
}
