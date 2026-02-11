import { QuestionTemplate } from '@/types/question-template';

/**
 * Addition Templates
 */
export const additionTemplates: QuestionTemplate[] = [
  // Bonds to 100 - Easy
  {
    id: 'addition-bonds-100-easy',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Easy',
    questionTemplate: '{num1} + ___ = 100. What number goes in the blank?',
    variables: {
      num1: { min: 10, max: 90, step: 10 }
    },
    answerFormula: '100 - num1',
    wrongAnswerFormulas: [
      '100 - num1 + 10',
      '100 - num1 - 10',
      'num1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'We need {num1} + something = 100' },
      { step: '2', detail: 'Count up from {num1} to 100' },
      { step: '3', detail: '{num1} to 100 is {answer}' },
      { step: '4', detail: 'Check: {num1} + {answer} = 100 ✓' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Bonds to Variable Target - Easy (50, 60, 70, 80, 90)
  {
    id: 'addition-bonds-variable-easy',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Easy',
    questionTemplate: '{num1} + ___ = {target}. What number goes in the blank?',
    variables: {
      target: { min: 50, max: 90, step: 10 },
      num1: { min: 10, max: 40, step: 5 }
    },
    answerFormula: 'target - num1',
    wrongAnswerFormulas: [
      'target - num1 + 5',
      'target - num1 - 5',
      'num1 + 5'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'We need {num1} + something = {target}' },
      { step: '2', detail: 'Count up from {num1} to {target}' },
      { step: '3', detail: 'The answer is {answer}' },
      { step: '4', detail: 'Check: {num1} + {answer} = {target} ✓' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },
  
  // Bonds to Variable Target - Medium
  {
    id: 'addition-bonds-variable-medium',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Medium',
    questionTemplate: 'If you have {num1} marbles, how many more do you need to have {target} marbles?',
    variables: {
      target: { min: 60, max: 100, step: 10 },
      num1: { min: 15, max: 75, step: 5 }
    },
    answerFormula: 'target - num1',
    wrongAnswerFormulas: [
      'target - num1 + 5',
      'target - num1 - 5',
      'num1 + 5'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'We have {num1} marbles and want {target} total' },
      { step: '2', detail: 'We need to find: {num1} + ? = {target}' },
      { step: '3', detail: 'Count up from {num1} to {target}' },
      { step: '4', detail: 'We need {answer} more marbles' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Simple Addition - Easy (small numbers)
  {
    id: 'addition-simple-easy',
    category: 'Addition',
    topic: 'Add/Subtract 1-Digit Numbers',
    difficulty: 'Easy',
    questionTemplate: 'What is {num1} + {num2}?',
    variables: {
      num1: { min: 1, max: 10 },
      num2: { min: 1, max: 10 }
    },
    answerFormula: 'num1 + num2',
    wrongAnswerFormulas: [
      'num1 + num2 + 1',
      'num1 + num2 - 1',
      'num1 * num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Keep the bigger number ({num1}) in your head' },
      { step: '2', detail: 'Count up {num2} times' },
      { step: '3', detail: '{num1} + {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Simple Addition - Easy (slightly larger)
  {
    id: 'addition-teens-easy',
    category: 'Addition',
    topic: 'Add/Subtract 1-Digit Numbers',
    difficulty: 'Easy',
    questionTemplate: 'What is {num1} + {num2}?',
    variables: {
      num1: { min: 10, max: 20 },
      num2: { min: 1, max: 9 }
    },
    answerFormula: 'num1 + num2',
    wrongAnswerFormulas: [
      'num1 + num2 + 2',
      'num1 + num2 - 2',
      'num1 - num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start with {num1}' },
      { step: '2', detail: 'Count up {num2} more: {answer}' },
      { step: '3', detail: '{num1} + {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Two-digit Addition - Medium (various ranges)
  {
    id: 'addition-2digit-medium-v1',
    category: 'Addition',
    topic: 'Adding and Subtracting with Partitioning',
    difficulty: 'Medium',
    questionTemplate: 'What is {num1} + {num2}?',
    variables: {
      num1: { min: 20, max: 50, step: 5 },
      num2: { min: 10, max: 30, step: 5 }
    },
    answerFormula: 'num1 + num2',
    wrongAnswerFormulas: [
      'num1 + num2 + 10',
      'num1 + num2 - 10',
      'num1 - num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Break {num2} into tens and ones' },
      { step: '2', detail: 'Add the tens to {num1}' },
      { step: '3', detail: 'Add the ones' },
      { step: '4', detail: '{num1} + {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Two-digit Addition - Medium (larger numbers)
  {
    id: 'addition-2digit-medium-v2',
    category: 'Addition',
    topic: 'Adding and Subtracting with Partitioning',
    difficulty: 'Medium',
    questionTemplate: 'What is {num1} + {num2}?',
    variables: {
      num1: { min: 50, max: 80, step: 5 },
      num2: { min: 15, max: 40, step: 5 }
    },
    answerFormula: 'num1 + num2',
    wrongAnswerFormulas: [
      'num1 + num2 + 5',
      'num1 + num2 - 5',
      'num1 - num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start with {num1}' },
      { step: '2', detail: 'Add {num2}' },
      { step: '3', detail: 'Break into tens and ones to make it easier' },
      { step: '4', detail: '{num1} + {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Three-digit Addition - Hard
  {
    id: 'addition-3digit-hard',
    category: 'Addition',
    topic: '3-Digit Numbers',
    difficulty: 'Hard',
    questionTemplate: 'What is {num1} + {num2}?',
    variables: {
      num1: { min: 100, max: 500, step: 50 },
      num2: { min: 50, max: 300, step: 25 }
    },
    answerFormula: 'num1 + num2',
    wrongAnswerFormulas: [
      'num1 + num2 + 50',
      'num1 + num2 - 50',
      'num1 - num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Add the hundreds: {num1} has hundreds, {num2} might have hundreds' },
      { step: '2', detail: 'Add the tens together' },
      { step: '3', detail: 'Add the ones together' },
      { step: '4', detail: '{num1} + {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Bonds to 100 - Hard
  {
    id: 'addition-bonds-100-hard',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Hard',
    questionTemplate: 'What is the missing number? 100 - ___ = {num1}',
    variables: {
      num1: { min: 15, max: 85, step: 5 }
    },
    answerFormula: '100 - num1',
    wrongAnswerFormulas: [
      '100 - num1 + 5',
      '100 - num1 - 5',
      'num1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '100 - something = {num1}' },
      { step: '2', detail: 'Think: What + {num1} = 100?' },
      { step: '3', detail: 'Count up from {num1} to 100' },
      { step: '4', detail: 'The answer is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // FULLY VARIABLE: a + ___ = z (ALL variables, ensures valid)
  {
    id: 'addition-fill-blank-easy',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Easy',
    questionTemplate: '{num1} + ___ = {total}',
    variables: {
      num1: { min: 5, max: 40, step: 5 },
      missing: { min: 10, max: 50, step: 5 }  // The answer
    },
    answerFormula: 'missing',
    wrongAnswerFormulas: [
      'missing + 5',
      'missing - 5',
      'num1 + 10'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{num1} + something = {total}' },
      { step: '2', detail: 'Count up from {num1} to {total}' },
      { step: '3', detail: 'The answer is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // FULLY VARIABLE: a - ___ = z (ALL variables, ensures valid)
  {
    id: 'subtraction-fill-blank-easy',
    category: 'Addition',
    topic: 'Bonds to 100',
    difficulty: 'Medium',
    questionTemplate: '{total} - ___ = {result}',
    variables: {
      result: { min: 10, max: 50, step: 5 },
      missing: { min: 10, max: 40, step: 5 }  // The answer (what we subtract)
    },
    answerFormula: 'missing',
    wrongAnswerFormulas: [
      'missing + 10',
      'missing - 10',
      'result'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} - something = {result}' },
      { step: '2', detail: 'Think: {result} + what = {total}?' },
      { step: '3', detail: 'Count up from {result} to {total}' },
      { step: '4', detail: 'The answer is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // THREE NUMBERS: a + b + c = ?
  {
    id: 'addition-three-numbers-hard',
    category: 'Addition',
    topic: 'Adding and Subtracting with Partitioning',
    difficulty: 'Hard',
    questionTemplate: 'What is {num1} + {num2} + {num3}?',
    variables: {
      num1: { min: 10, max: 40, step: 5 },
      num2: { min: 10, max: 40, step: 5 },
      num3: { min: 10, max: 30, step: 5 }
    },
    answerFormula: 'num1 + num2 + num3',
    wrongAnswerFormulas: [
      'num1 + num2 + num3 + 10',
      'num1 + num2 + num3 - 10',
      'num1 + num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Add the first two: {num1} + {num2}' },
      { step: '2', detail: 'Then add {num3} to your total' },
      { step: '3', detail: 'Look for pairs that make 10 or easy numbers' },
      { step: '4', detail: '{num1} + {num2} + {num3} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  }
];

/**
 * Multiplication Templates
 */
export const multiplicationTemplates: QuestionTemplate[] = [
  // Times Tables - Easy (2, 5, 10)
  {
    id: 'multiplication-tables-easy',
    category: 'Multiplication',
    topic: 'Times Tables',
    difficulty: 'Easy',
    questionTemplate: 'What is {num1} × {num2}?',
    variables: {
      num1: { min: 2, max: 10 },
      num2: { min: 2, max: 5, exclude: [4] }  // 2, 3, 5 only
    },
    answerFormula: 'num1 * num2',
    wrongAnswerFormulas: [
      'num1 * num2 + num1',    // One table up
      'num1 * num2 - num1',    // One table down
      'num1 + num2'            // Addition mistake
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{num1} × {num2} means {num1} groups of {num2}' },
      { step: '2', detail: 'Count: {num2}, {num2}, {num2}... ({num1} times)' },
      { step: '3', detail: '{num1} × {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Times Tables - Medium (3, 4, 6)
  {
    id: 'multiplication-tables-medium',
    category: 'Multiplication',
    topic: 'Times Tables',
    difficulty: 'Medium',
    questionTemplate: 'What is {num1} × {num2}?',
    variables: {
      num1: { min: 3, max: 10 },
      num2: { min: 3, max: 7 }
    },
    answerFormula: 'num1 * num2',
    wrongAnswerFormulas: [
      'num1 * num2 + num2',
      'num1 * num2 - num2',
      'num1 * (num2 - 1)'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{num1} × {num2} = {num1} groups of {num2}' },
      { step: '2', detail: 'Skip count by {num2}: {num1} times' },
      { step: '3', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Multiples of 10 - Easy
  {
    id: 'multiplication-multiples10-easy',
    category: 'Multiplication',
    topic: 'Multiples of 10',
    difficulty: 'Easy',
    questionTemplate: 'What is {num1} × 10?',
    variables: {
      num1: { min: 2, max: 9 }
    },
    answerFormula: 'num1 * 10',
    wrongAnswerFormulas: [
      'num1 + 10',
      'num1 * 100',
      'num1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'When we multiply by 10, we add a zero' },
      { step: '2', detail: '{num1} × 10 = {num1}0' },
      { step: '3', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Times Tables - Hard (larger numbers)
  {
    id: 'multiplication-tables-hard',
    category: 'Multiplication',
    topic: 'Times Tables',
    difficulty: 'Hard',
    questionTemplate: 'What is {num1} × {num2}?',
    variables: {
      num1: { min: 6, max: 10 },
      num2: { min: 6, max: 10 }
    },
    answerFormula: 'num1 * num2',
    wrongAnswerFormulas: [
      'num1 * num2 + num1',
      'num1 * num2 - num1',
      'num1 * (num2 - 1)'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{num1} × {num2} = {num1} groups of {num2}' },
      { step: '2', detail: 'Use your times tables knowledge' },
      { step: '3', detail: 'Or skip count by {num2}: {num1} times' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // FULLY VARIABLE: ___ × b = z (missing first number, ensures valid)
  {
    id: 'multiplication-fill-blank-medium',
    category: 'Multiplication',
    topic: 'Times Tables',
    difficulty: 'Medium',
    questionTemplate: '___ × {multiplier} = {total}',
    variables: {
      multiplier: { min: 2, max: 10 },
      missing: { min: 2, max: 12 }  // The answer
    },
    answerFormula: 'missing',
    wrongAnswerFormulas: [
      'missing + 1',
      'missing - 1',
      'multiplier'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Something × {multiplier} = {total}' },
      { step: '2', detail: 'Think: What times {multiplier} gives {total}?' },
      { step: '3', detail: 'Try dividing: {total} ÷ {multiplier} = {answer}' },
      { step: '4', detail: 'Check: {answer} × {multiplier} = {total} ✓' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  }
];

/**
 * Division Templates
 */
export const divisionTemplates: QuestionTemplate[] = [
  // Simple Division - Easy (ensures even division)
  {
    id: 'division-simple-easy',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Easy',
    questionTemplate: 'What is {total} ÷ {divisor}?',
    variables: {
      divisor: { min: 2, max: 5 },
      quotient: { min: 2, max: 10 }
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 1',
      'quotient - 1',
      'divisor'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} ÷ {divisor} means share {total} into {divisor} groups' },
      { step: '2', detail: 'How many in each group?' },
      { step: '3', detail: 'The answer is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Division with Tables - Medium (ensures even division)
  {
    id: 'division-tables-medium',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Medium',
    questionTemplate: 'What is {total} ÷ {divisor}?',
    variables: {
      divisor: { min: 3, max: 8 },
      quotient: { min: 4, max: 12 }  // The answer
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 1',
      'quotient - 1',
      'divisor'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} ÷ {divisor} = ?' },
      { step: '2', detail: 'Think: What × {divisor} = {total}?' },
      { step: '3', detail: 'Use your times tables: {divisor} × {answer} = {total}' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Division by 10 - Medium (always even)
  {
    id: 'division-by-10-medium',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Medium',
    questionTemplate: 'What is {total} ÷ 10?',
    variables: {
      quotient: { min: 2, max: 10 }
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 1',
      'quotient - 1',
      'quotient * 10'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'When we divide by 10, we remove a zero' },
      { step: '2', detail: '{total} ÷ 10 = ?' },
      { step: '3', detail: 'Just remove the last zero: {total} becomes {answer}' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Division with Remainders - Hard
  {
    id: 'division-remainders-hard',
    category: 'Division',
    topic: 'Division with Remainders',
    difficulty: 'Hard',
    questionTemplate: 'Divide {total} by {num}. Write your answer with remainder (like 5 R2)',
    variables: {
      num: { min: 3, max: 7 },
      total: { min: 20, max: 60, step: 1 }
    },
    answerFormula: 'divWithRemainder(total, num)',
    wrongAnswerFormulas: [],
    methodStepsTemplate: [
      { step: '1', detail: 'Divide {total} by {num}' },
      { step: '2', detail: 'How many complete groups of {num} fit in {total}?' },
      { step: '3', detail: 'Count: {num}×1, {num}×2, {num}×3... until you get close to {total}' },
      { step: '4', detail: 'The leftover is the remainder' },
      { step: '5', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Large Division - Hard (ensures even division)
  {
    id: 'division-large-hard',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Hard',
    questionTemplate: 'What is {total} ÷ {divisor}?',
    variables: {
      divisor: { min: 5, max: 12 },
      quotient: { min: 5, max: 15 }
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 2',
      'quotient - 2',
      'divisor'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} ÷ {divisor} = ?' },
      { step: '2', detail: 'Think: What number × {divisor} = {total}?' },
      { step: '3', detail: 'Try multiplying: {divisor} × 5, {divisor} × 10...' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Share Equally - Easy (ensures even division)
  {
    id: 'division-sharing-easy',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Easy',
    questionTemplate: 'Share {total} apples equally among {divisor} children. How many does each child get?',
    variables: {
      divisor: { min: 2, max: 5 },
      quotient: { min: 3, max: 10 }
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 1',
      'quotient - 1',
      'divisor'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'We have {total} apples' },
      { step: '2', detail: 'Share them equally among {divisor} children' },
      { step: '3', detail: 'Each child gets {total} ÷ {divisor} = {answer}' },
      { step: '4', detail: 'Answer: {answer} apples each' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Division - Easy (by 2 and 5, ensures even)
  {
    id: 'division-by-2-5-easy',
    category: 'Division',
    topic: 'Multiply and Divide',
    difficulty: 'Easy',
    questionTemplate: 'What is {total} ÷ {divisor}?',
    variables: {
      divisor: { min: 2, max: 5, step: 3 },  // Only 2 or 5
      quotient: { min: 3, max: 12 }
    },
    answerFormula: 'quotient',
    wrongAnswerFormulas: [
      'quotient + 2',
      'quotient - 2',
      'divisor'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} ÷ {divisor} = ?' },
      { step: '2', detail: 'Think: How many {divisor}s make {total}?' },
      { step: '3', detail: 'Count by {divisor}s: {divisor}, {divisor}×2, {divisor}×3...' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  }
];

/**
 * Subtraction Templates
 */
export const subtractionTemplates: QuestionTemplate[] = [
  // Simple Subtraction - Easy
  {
    id: 'subtraction-simple-easy',
    category: 'Subtraction',
    topic: 'Subtract by Counting Up',
    difficulty: 'Easy',
    questionTemplate: 'What is {num1} - {num2}?',
    variables: {
      num1: { min: 10, max: 20 },
      num2: { min: 1, max: 9 }
    },
    answerFormula: 'num1 - num2',
    wrongAnswerFormulas: [
      'num1 - num2 + 1',
      'num1 - num2 - 1',
      'num1 + num2'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start at {num2}' },
      { step: '2', detail: 'Count up to {num1}' },
      { step: '3', detail: 'The difference is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 15
  },

  // Two-digit Subtraction - Medium
  {
    id: 'subtraction-2digit-medium',
    category: 'Subtraction',
    topic: 'More Subtraction by Counting Up',
    difficulty: 'Medium',
    questionTemplate: 'What is {num1} - {num2}?',
    variables: {
      num1: { min: 50, max: 100, step: 5 },
      num2: { min: 20, max: 40, step: 5 }
    },
    answerFormula: 'num1 - num2',
    wrongAnswerFormulas: [
      'num1 - num2 + 10',
      'num1 - num2 - 10',
      'num2 - num1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start at {num2}' },
      { step: '2', detail: 'Count up to nearest 10, then to {num1}' },
      { step: '3', detail: 'Add all the jumps' },
      { step: '4', detail: '{num1} - {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Three-digit Subtraction - Hard
  {
    id: 'subtraction-3digit-hard',
    category: 'Subtraction',
    topic: 'More Subtraction by Counting Up',
    difficulty: 'Hard',
    questionTemplate: 'What is {num1} - {num2}?',
    variables: {
      num1: { min: 200, max: 500, step: 50 },
      num2: { min: 50, max: 200, step: 25 }
    },
    answerFormula: 'num1 - num2',
    wrongAnswerFormulas: [
      'num1 - num2 + 50',
      'num1 - num2 - 50',
      'num2 - num1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start at {num2}' },
      { step: '2', detail: 'Count up in big jumps to {num1}' },
      { step: '3', detail: 'Add all your jumps together' },
      { step: '4', detail: '{num1} - {num2} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // FULLY VARIABLE: a - ___ = z (fill in the blank, ensures valid)
  {
    id: 'subtraction-fill-blank-medium',
    category: 'Subtraction',
    topic: 'Subtract by Counting Up',
    difficulty: 'Medium',
    questionTemplate: '{total} - ___ = {result}',
    variables: {
      result: { min: 10, max: 60, step: 5 },
      missing: { min: 10, max: 40, step: 5 }  // The answer (what we subtract)
    },
    answerFormula: 'missing',
    wrongAnswerFormulas: [
      'missing + 5',
      'missing - 5',
      'result'
    ],
    methodStepsTemplate: [
      { step: '1', detail: '{total} - something = {result}' },
      { step: '2', detail: 'Count up from {result} to {total}' },
      { step: '3', detail: 'The difference is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  }
];

/**
 * Fractions Templates
 */
export const fractionsTemplates: QuestionTemplate[] = [
  // Identify Fraction - Easy (WITH VISUAL) (FIXED: only proper fractions)
  {
    id: 'fractions-identify-easy',
    category: 'Fractions',
    topic: 'Fractions',
    difficulty: 'Easy',
    questionTemplate: 'Look at the shape below. What fraction is shaded?',
    variables: {
      denominator: { min: 3, max: 4 },  // thirds or quarters only
      numerator: { min: 1, max: 2 }     // Always less than min denominator
    },
    answerFormula: 'numerator + "/" + denominator',
    wrongAnswerFormulas: [
      'denominator + "/" + numerator',  // Flipped
      'numerator + "/" + (denominator + 1)',
      '(numerator + 1) + "/" + denominator'
    ],
    imageConfig: {
      type: 'fraction-shape',
      numeratorVar: 'numerator',
      denominatorVar: 'denominator',
      shape: 'circle'
    },
    methodStepsTemplate: [
      { step: '1', detail: 'The shape has {denominator} equal parts in total' },
      { step: '2', detail: '{numerator} parts are shaded (blue)' },
      { step: '3', detail: 'Write as a fraction: shaded/total = {numerator}/{denominator}' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Compare Fractions - Easy (FIXED: only proper fractions)
  {
    id: 'fractions-compare-easy',
    category: 'Fractions',
    topic: 'Comparing Fractions',
    difficulty: 'Easy',
    questionTemplate: 'Which is bigger: {num1}/{denom} or {num2}/{denom}?',
    variables: {
      denom: { min: 4, max: 8 },
      num1: { min: 1, max: 3 },           // Always less than min denom
      num2: { min: 1, max: 3 }            // Always less than min denom
    },
    answerFormula: 'num1 > num2 ? (num1 + "/" + denom) : (num2 + "/" + denom)',
    wrongAnswerFormulas: [
      'num1 < num2 ? (num1 + "/" + denom) : (num2 + "/" + denom)',  // Wrong comparison
      '"They are equal"',
      'denom + "/" + (num1 > num2 ? num1 : num2)'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Both fractions have the same denominator ({denom})' },
      { step: '2', detail: 'Compare the numerators: {num1} and {num2}' },
      { step: '3', detail: 'The bigger numerator means a bigger fraction' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Complete to 1 - Medium (FIXED: numerator always < denominator)
  {
    id: 'fractions-complete-to-1-medium',
    category: 'Fractions',
    topic: 'Completing Fractions to 1',
    difficulty: 'Medium',
    questionTemplate: 'What fraction must be added to {numerator}/{denominator} to make 1 whole?',
    variables: {
      denominator: { min: 4, max: 10 },
      numerator: { min: 1, max: 3 }  // Always less than min denominator (4)
    },
    answerFormula: '(denominator - numerator) + "/" + denominator',
    wrongAnswerFormulas: [
      'numerator + "/" + denominator',
      '(denominator - numerator - 1) + "/" + denominator',
      '(denominator - numerator + 1) + "/" + denominator'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'A whole is {denominator}/{denominator}' },
      { step: '2', detail: 'We have {numerator}/{denominator}' },
      { step: '3', detail: 'We need: {denominator} - {numerator} more parts' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 25
  },

  // Equivalent Fractions - Medium
  {
    id: 'fractions-equivalent-medium',
    category: 'Fractions',
    topic: 'Fractions',
    difficulty: 'Medium',
    questionTemplate: '1/{base} is the same as how many {target}ths? (1/{base} = ?/{target})',
    variables: {
      base: { min: 2, max: 5 },
      multiplier: { min: 2, max: 4 }
    },
    answerFormula: 'multiplier',
    wrongAnswerFormulas: [
      'multiplier + 1',
      'multiplier - 1',
      'base * multiplier'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'We need to find: 1/{base} = ?/{target}' },
      { step: '2', detail: '{base} × {multiplier} = {target}' },
      { step: '3', detail: 'So we multiply top and bottom by {multiplier}' },
      { step: '4', detail: '1/{base} = {answer}/{target}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Fraction of a Number - Hard
  {
    id: 'fractions-of-number-hard',
    category: 'Fractions',
    topic: 'Fractions',
    difficulty: 'Hard',
    questionTemplate: 'What is 1/{denominator} of {total}?',
    variables: {
      denominator: { min: 2, max: 10 },
      answer: { min: 2, max: 12 }  // The answer we want
    },
    answerFormula: 'answer',
    wrongAnswerFormulas: [
      'answer + denominator',
      'answer - 1',
      'total - answer'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'To find 1/{denominator} of {total}' },
      { step: '2', detail: 'Divide {total} by {denominator}' },
      { step: '3', detail: '{total} ÷ {denominator} = {answer}' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Simple Fraction Addition - Hard (FIXED: result always < 1)
  {
    id: 'fractions-add-hard',
    category: 'Fractions',
    topic: 'Fractions',
    difficulty: 'Hard',
    questionTemplate: 'What is {num1}/{denom} + {num2}/{denom}?',
    variables: {
      denom: { min: 5, max: 10 },
      num1: { min: 1, max: 2 },           // Ensure sum won't exceed denom
      num2: { min: 1, max: 2 }            // Max sum is 4, min denom is 5
    },
    answerFormula: '(num1 + num2) + "/" + denom',
    wrongAnswerFormulas: [
      '(num1 + num2) + "/" + (denom * 2)',  // Wrong denom
      'num1 + "/" + num2',
      '(num1 * num2) + "/" + denom'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Both fractions have the same denominator: {denom}' },
      { step: '2', detail: 'Add the numerators: {num1} + {num2}' },
      { step: '3', detail: 'Keep the same denominator: {denom}' },
      { step: '4', detail: 'Answer: {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  }
];

/**
 * Units of Time Templates
 */
export const timeTemplates: QuestionTemplate[] = [
  // Time Conversion - Easy (hours to minutes)
  {
    id: 'time-hours-to-minutes-easy',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Easy',
    questionTemplate: 'How many minutes are in {hours} hour(s)?',
    variables: {
      hours: { min: 1, max: 5 }
    },
    answerFormula: 'hours * 60',
    wrongAnswerFormulas: [
      'hours * 60 + 10',
      'hours * 60 - 10',
      'hours * 100'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'There are 60 minutes in 1 hour' },
      { step: '2', detail: 'So {hours} hour(s) = {hours} × 60 minutes' },
      { step: '3', detail: '{hours} × 60 = {answer} minutes' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Days to Hours - Easy
  {
    id: 'time-days-to-hours-easy',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Easy',
    questionTemplate: 'How many hours are in {days} day(s)?',
    variables: {
      days: { min: 1, max: 7 }
    },
    answerFormula: 'days * 24',
    wrongAnswerFormulas: [
      'days * 24 + 2',
      'days * 12',
      'days * 60'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'There are 24 hours in 1 day' },
      { step: '2', detail: 'So {days} day(s) = {days} × 24 hours' },
      { step: '3', detail: '{days} × 24 = {answer} hours' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Minutes to Hours - Medium
  {
    id: 'time-minutes-to-hours-medium',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Medium',
    questionTemplate: 'How many hours are in {total} minutes?',
    variables: {
      hours: { min: 2, max: 5 }
    },
    answerFormula: 'hours',
    wrongAnswerFormulas: [
      'hours + 1',
      'hours - 1',
      'total / 30'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'There are 60 minutes in 1 hour' },
      { step: '2', detail: 'Divide {total} by 60' },
      { step: '3', detail: '{total} ÷ 60 = {answer} hours' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 25
  },

  // Time Addition - Medium
  {
    id: 'time-addition-medium',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Medium',
    questionTemplate: 'It is {hour}:00. What time will it be in {add} hours?',
    variables: {
      hour: { min: 1, max: 9 },
      add: { min: 2, max: 5 }
    },
    answerFormula: '(hour + add) + ":00"',
    wrongAnswerFormulas: [
      '(hour + add + 1) + ":00"',
      '(hour + add - 1) + ":00"',
      'hour + ":00"'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start time: {hour}:00' },
      { step: '2', detail: 'Add {add} hours: {hour} + {add}' },
      { step: '3', detail: '{hour} + {add} = {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 25
  },

  // Duration Calculation - Hard
  {
    id: 'time-duration-hard',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Hard',
    questionTemplate: 'A movie starts at {start}:00 and ends at {end}:00. How long is the movie in hours?',
    variables: {
      start: { min: 1, max: 6 },
      duration: { min: 2, max: 4 }
    },
    answerFormula: 'duration',
    wrongAnswerFormulas: [
      'duration + 1',
      'duration - 1',
      'end - start - 1'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'Start time: {start}:00' },
      { step: '2', detail: 'End time: {end}:00' },
      { step: '3', detail: 'Duration: {end} - {start} = {answer} hours' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  },

  // Weeks to Days - Hard
  {
    id: 'time-weeks-to-days-hard',
    category: 'Units of Time',
    topic: 'Units of Time',
    difficulty: 'Hard',
    questionTemplate: 'How many days are in {weeks} weeks?',
    variables: {
      weeks: { min: 3, max: 8 }
    },
    answerFormula: 'weeks * 7',
    wrongAnswerFormulas: [
      'weeks * 7 + 1',
      'weeks * 7 - 1',
      'weeks * 5'
    ],
    methodStepsTemplate: [
      { step: '1', detail: 'There are 7 days in 1 week' },
      { step: '2', detail: 'So {weeks} weeks = {weeks} × 7 days' },
      { step: '3', detail: '{weeks} × 7 = {answer} days' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 25
  },

  // Read Clock - Easy (WITH VISUAL)
  {
    id: 'time-read-clock-easy',
    category: 'Units of Time',
    topic: 'Telling Time',
    difficulty: 'Easy',
    questionTemplate: 'What time does the clock show?',
    variables: {
      hours: { min: 1, max: 12 },
      minutes: { min: 0, max: 0 }  // Only o'clock times for Easy
    },
    answerFormula: 'hours + ":00"',
    wrongAnswerFormulas: [
      '(hours + 1) + ":00"',
      '(hours - 1) + ":00"',
      'hours + ":30"'
    ],
    imageConfig: {
      type: 'clock',
      hoursVar: 'hours',
      minutesVar: 'minutes'
    },
    methodStepsTemplate: [
      { step: '1', detail: 'Look at the short hand (hour hand)' },
      { step: '2', detail: 'It points to {hours}' },
      { step: '3', detail: 'The long hand (minute hand) points to 12' },
      { step: '4', detail: 'The time is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 20
  },

  // Read Clock Half Past - Medium (WITH VISUAL)
  {
    id: 'time-read-clock-half-past-medium',
    category: 'Units of Time',
    topic: 'Telling Time',
    difficulty: 'Medium',
    questionTemplate: 'What time does the clock show?',
    variables: {
      hours: { min: 1, max: 11 },
      minutes: { min: 30, max: 30 }  // Half past
    },
    answerFormula: 'hours + ":30"',
    wrongAnswerFormulas: [
      'hours + ":00"',
      '(hours + 1) + ":00"',
      '(hours + 1) + ":30"'
    ],
    imageConfig: {
      type: 'clock',
      hoursVar: 'hours',
      minutesVar: 'minutes'
    },
    methodStepsTemplate: [
      { step: '1', detail: 'The short hand (hour hand) is between {hours} and {hours}+1' },
      { step: '2', detail: 'The long hand (minute hand) points to 6' },
      { step: '3', detail: 'This means half past {hours}' },
      { step: '4', detail: 'The time is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 25
  },

  // Read Clock Quarter Past/To - Hard (WITH VISUAL)
  {
    id: 'time-read-clock-quarter-hard',
    category: 'Units of Time',
    topic: 'Telling Time',
    difficulty: 'Hard',
    questionTemplate: 'What time does the clock show?',
    variables: {
      hours: { min: 1, max: 11 },
      minutes: { min: 15, max: 45, step: 15 }  // :15 or :45
    },
    answerFormula: 'hours + ":" + (minutes < 10 ? "0" + minutes : minutes)',
    wrongAnswerFormulas: [
      'hours + ":00"',
      '(hours + 1) + ":" + (minutes < 10 ? "0" + minutes : minutes)',
      'hours + ":30"'
    ],
    imageConfig: {
      type: 'clock',
      hoursVar: 'hours',
      minutesVar: 'minutes'
    },
    methodStepsTemplate: [
      { step: '1', detail: 'Look carefully at both clock hands' },
      { step: '2', detail: 'The minute hand shows {minutes} minutes' },
      { step: '3', detail: 'The hour hand points between {hours} and {hours}+1' },
      { step: '4', detail: 'The time is {answer}' }
    ],
    questionType: 'mcq',
    estimatedTimeSeconds: 30
  }
];

/**
 * Get all templates
 */
export function getAllTemplates(): QuestionTemplate[] {
  return [
    ...additionTemplates,
    ...multiplicationTemplates,
    ...divisionTemplates,
    ...subtractionTemplates,
    ...fractionsTemplates,
    ...timeTemplates
  ];
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): QuestionTemplate[] {
  return getAllTemplates().filter(t => t.category === category);
}

/**
 * Get templates by difficulty
 */
export function getTemplatesByDifficulty(difficulty: string): QuestionTemplate[] {
  return getAllTemplates().filter(t => t.difficulty === difficulty);
}
