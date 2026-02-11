/**
 * Maps topics to main categories
 * 8 main categories as requested
 */

export const CATEGORIES = [
  'Addition',
  'Subtraction',
  'Multiplication',
  'Division',
  'Shapes and Measure',
  'Fractions',
  'Mixed Operations',
  'Units of Time'
] as const;

export type Category = typeof CATEGORIES[number];

export const TOPIC_TO_CATEGORY: Record<string, Category> = {
  // Addition
  'Bonds to 100': 'Addition',
  'Bonds to 10 and 20 and Doubles': 'Addition',
  'Making 100': 'Addition',
  'Number Pairs': 'Addition',

  // Subtraction
  'Subtract by Counting Up': 'Subtraction',
  'More Subtraction by Counting Up': 'Subtraction',

  // Multiplication
  'Multiples of 10': 'Multiplication',
  'Times Tables': 'Multiplication',
  'Grid Method Multiplication': 'Multiplication',
  'Identifying Multiples': 'Multiplication',

  // Division
  'Multiply and Divide': 'Division',
  'Division with Remainders': 'Division',

  // Shapes and Measure
  '3D Shapes': 'Shapes and Measure',
  'Measuring Length': 'Shapes and Measure',
  'Measuring Capacity': 'Shapes and Measure',
  'Perimeter': 'Shapes and Measure',

  // Fractions
  'Fractions': 'Fractions',
  'Comparing Fractions': 'Fractions',
  'Completing Fractions to 1': 'Fractions',

  // Units of Time
  'Units of Time': 'Units of Time',
  'Telling Time': 'Units of Time',

  // Mixed Operations (number concepts, place value, money, word problems)
  'Add/Subtract 1-Digit Numbers': 'Mixed Operations',
  'Adding and Subtracting with Partitioning': 'Mixed Operations',
  '3-Digit Numbers': 'Mixed Operations',
  'Number Lines': 'Mixed Operations',
  'Rounding': 'Mixed Operations',
  'Doubling and Halving': 'Mixed Operations',
  'Doubling and Halving with Partitioning': 'Mixed Operations',
  'Place Value with Money': 'Mixed Operations',
  'Numbers on a Number Line': 'Mixed Operations',
  'Number Patterns': 'Mixed Operations',
  'Writing Numbers in Words': 'Mixed Operations',
  'Number Before and After': 'Mixed Operations',
  'Odd and Even Numbers': 'Mixed Operations',
  'Finding Middle Numbers': 'Mixed Operations',
  'Money - Pounds and Pence': 'Mixed Operations',
  'Making Change': 'Mixed Operations',
  'Word Problems': 'Mixed Operations',
  'Ordering Numbers': 'Mixed Operations',
};

export function getCategoryForTopic(topic: string): Category {
  return TOPIC_TO_CATEGORY[topic] || 'Mixed Operations';
}
