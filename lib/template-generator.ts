import { QuestionTemplate, GeneratedValues, GeneratedQuestion, VariableDefinition } from '@/types/question-template';
import { SOCIAL_STUDIES_CATEGORIES } from './social-studies-templates';
import { ENGLISH_CATEGORIES } from './english-templates';
import { BUDDHISM_CATEGORIES } from './buddhism-templates';

/**
 * Generate a random value based on variable definition
 */
function generateRandomValue(def: VariableDefinition): number {
  const { min, max, step = 1, exclude = [] } = def;
  
  const possibleValues: number[] = [];
  
  for (let value = min; value <= max; value += step) {
    if (!exclude.includes(value)) {
      possibleValues.push(value);
    }
  }
  
  if (possibleValues.length === 0) {
    throw new Error('No valid values available for variable');
  }
  
  return possibleValues[Math.floor(Math.random() * possibleValues.length)];
}

/**
 * Generate random values for all variables in template
 */
function generateVariableValues(template: QuestionTemplate): GeneratedValues {
  const values: GeneratedValues = {};
  
  if (!template.variables) {
    return values;
  }
  
  for (const [varName, varDef] of Object.entries(template.variables)) {
    values[varName] = generateRandomValue(varDef);
  }
  
  return values;
}

/**
 * Replace placeholders in string with actual values
 * Example: "{num1} + {num2}" with {num1: 5, num2: 3} => "5 + 3"
 * Special handling for computed values like {total}
 */
function replacePlaceholders(text: string, values: GeneratedValues, answerStr?: string): string {
  let result = text;
  
  // Special handling for {total} - computed from other values
  if (result.includes('{total}')) {
    let total: number;
    
    if (typeof values.divisor === 'number' && typeof values.quotient === 'number') {
      // Division: total = divisor × quotient
      total = values.divisor * values.quotient;
    } else if (typeof values.quotient === 'number' && !values.divisor && result.includes('÷ 10')) {
      // Division by 10: total = quotient × 10
      total = values.quotient * 10;
    } else if (typeof values.num1 === 'number' && typeof values.missing === 'number') {
      // Addition: total = num1 + missing
      total = values.num1 + values.missing;
    } else if (typeof values.result === 'number' && typeof values.missing === 'number') {
      // Subtraction: total = result + missing
      total = values.result + values.missing;
    } else if (typeof values.multiplier === 'number' && typeof values.missing === 'number') {
      // Multiplication: total = missing × multiplier
      total = values.missing * values.multiplier;
    } else if (typeof values.ml1 === 'number' && typeof values.ml2 === 'number') {
      // Capacity addition: ml1 + ml2
      total = values.ml1 + values.ml2;
    } else if (typeof values.weight1 === 'number' && typeof values.weight2 === 'number') {
      // Weight addition: weight1 + weight2
      total = values.weight1 + values.weight2;
    } else if (typeof values.cost1 === 'number' && typeof values.cost2 === 'number') {
      // Money addition: cost1 + cost2
      total = values.cost1 + values.cost2;
    } else if (typeof values.length === 'number' && typeof values.width === 'number') {
      // Perimeter calculations: 2 * length + 2 * width
      total = 2 * values.length;
    } else if (typeof values.hundreds === 'number' && typeof values.tens === 'number' && typeof values.units === 'number') {
      // Place value build (e.g. "3 hundreds + 7 tens + 7 units"): total = hundreds × 100
      total = values.hundreds * 100;
    } else if (typeof values.hundreds === 'number' && typeof values.tens === 'number') {
      // Place value rounding: tens * 10 + units (for round to nearest 100)
      total = values.tens * 10 + (typeof values.units === 'number' ? values.units : 0);
    } else if (typeof values.hours === 'number') {
      // Time: total minutes from hours
      total = values.hours * 60;
    } else if (typeof values.denominator === 'number' && typeof values.answer === 'number') {
      // Fractions: total for "1/x of total"
      total = values.denominator * values.answer;
    } else if (typeof values.num2 === 'number') {
      // Comparisons: convert kg to g, l to ml, m to cm
      total = values.num2 * 1000;
    } else if (typeof values.cap2 === 'number') {
      // Capacity comparisons: convert l to ml
      total = values.cap2 * 1000;
    } else {
      // Use total from values if it exists
      total = (typeof values.total === 'number' ? values.total : 0);
    }
    
    result = result.replace(/\{total\}/g, total.toString());
  }
  
  // Special handling for {target} in fraction equivalents and other calculations
  if (result.includes('{target}') && typeof values.target !== 'number') {
    // Only compute target if it's NOT already defined as a variable
    let target: number;
    
    if (typeof values.base === 'number' && typeof values.multiplier === 'number') {
      // Fraction equivalents: base * multiplier
      target = values.base * values.multiplier;
    } else if (typeof values.width === 'number') {
      // Perimeter: 2 * width
      target = 2 * values.width;
    } else if (typeof values.tens === 'number') {
      // Place value: tens * 10
      target = values.tens * 10;
    } else {
      target = 0;
    }
    
    result = result.replace(/\{target\}/g, target.toString());
  }
  
  // Special handling for {end} in time duration
  if (result.includes('{end}') && typeof values.start === 'number' && typeof values.duration === 'number') {
    const end = values.start + values.duration;
    result = result.replace(/\{end\}/g, end.toString());
  }
  
  // Special handling for {number} - built from components
  if (result.includes('{number}')) {
    let number: number;
    
    if (typeof values.hundreds === 'number' && typeof values.tens === 'number' && typeof values.units === 'number') {
      // Place value: build full number from hundreds, tens, units
      number = values.hundreds * 100 + values.tens * 10 + values.units;
    } else if (typeof values.tens === 'number' && typeof values.units === 'number') {
      // Two-digit number from tens and units
      number = values.tens * 10 + values.units;
    } else if (typeof values.number === 'number') {
      // Direct number value
      number = values.number;
    } else {
      number = 0;
    }
    
    result = result.replace(/\{number\}/g, number.toString());
  }

  for (const [varName, value] of Object.entries(values)) {
    // Replace all occurrences of {varName}
    const regex = new RegExp(`\\{${varName}\\}`, 'g');
    result = result.replace(regex, value.toString());
  }
  
  // Replace {answer} with actual answer if provided
  if (result.includes('{answer}')) {
    result = result.replace(/\{answer\}/g, answerStr || '[calculated]');
  }
  
  return result;
}

/**
 * Evaluate a formula with given values
 * Example: "num1 + num2" with {num1: 5, num2: 3} => 8
 * For division with remainders: returns "quotient R remainder" format
 * For string formulas: returns string (e.g., fractions "3/4", time "5:00")
 */
function evaluateFormula(formula: string, values: GeneratedValues): number | string {
  try {
    // Create a function that can evaluate the formula
    const varNames = Object.keys(values);
    const varValues = Object.values(values);
    
    // Check if this is a division with remainder formula
    if (formula.includes('divWithRemainder')) {
      // Extract the division expression: divWithRemainder(total, num)
      const match = formula.match(/divWithRemainder\(([^,]+),\s*([^)]+)\)/);
      if (match) {
        const dividendVar = match[1].trim();
        const divisorVar = match[2].trim();
        
        const dividend = values[dividendVar];
        const divisor = values[divisorVar];
        
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        
        // Always show remainder format for this type
        return `${quotient} R${remainder}`;
      }
    }
    
    // Check if this is a string concatenation formula (contains quoted strings)
    if (formula.includes('"') || formula.includes("'")) {
      // Replace variable names with their values in the formula string
      let processedFormula = formula;
      for (const [varName, value] of Object.entries(values)) {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedFormula = processedFormula.replace(regex, value.toString());
      }
      
      // eslint-disable-next-line no-new-func
      const func = new Function(`return ${processedFormula};`);
      return func();
    }
    
    // For ternary operators (e.g., num1 > num2 ? ...)
    if (formula.includes('?')) {
      let processedFormula = formula;
      for (const [varName, value] of Object.entries(values)) {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        processedFormula = processedFormula.replace(regex, value.toString());
      }
      
      // eslint-disable-next-line no-new-func
      const func = new Function(`return ${processedFormula};`);
      return func();
    }
    
    // eslint-disable-next-line no-new-func
    const func = new Function(...varNames, `return ${formula};`);
    const result = func(...varValues);
    
    // Return as number if it's numeric, otherwise as string
    return typeof result === 'number' ? Math.round(result) : result.toString();
  } catch (error) {
    console.error('Error evaluating formula:', formula, error);
    return 0;
  }
}

/**
 * Generate wrong answer options
 */
function generateWrongAnswers(
  correctAnswer: number,
  template: QuestionTemplate,
  values: GeneratedValues,
  correctAnswerStr?: string
): string[] {
  const wrongAnswers = new Set<string>();
  
  // Special handling for remainder answers
  if (correctAnswerStr && correctAnswerStr.includes(' R')) {
    const [quotient, remainder] = correctAnswerStr.split(' R').map(Number);
    
    // Generate wrong answers with different quotients/remainders
    const wrongOptions = [
      `${quotient + 1} R${remainder}`,
      `${quotient - 1} R${remainder}`,
      `${quotient} R${remainder + 1}`,
      `${quotient}`,
      `${quotient + 1}`,
      `${quotient - 1}`,
    ];
    
    for (const wrong of wrongOptions) {
      if (wrong !== correctAnswerStr) {
        wrongAnswers.add(wrong);
      }
      if (wrongAnswers.size >= 3) break;
    }
    
    return Array.from(wrongAnswers).slice(0, 3);
  }
  
  // If template provides wrong answer formulas, use them
  if (template.wrongAnswerFormulas && template.wrongAnswerFormulas.length > 0) {
    for (const formula of template.wrongAnswerFormulas) {
      const wrongValue = evaluateFormula(formula, values);
      const wrongStr = wrongValue.toString();
      // For numeric answers, check if >= 0; for string answers (fractions, time), accept any
      const isValid = typeof wrongValue === 'string' || wrongValue >= 0;
      if (wrongStr !== correctAnswerStr && isValid) {
        wrongAnswers.add(wrongStr);
      }
    }
  }
  
  // Generate additional random wrong answers if needed
  const variations = [
    correctAnswer + 10,
    correctAnswer - 10,
    correctAnswer + 5,
    correctAnswer - 5,
    correctAnswer * 2,
    Math.floor(correctAnswer / 2),
    correctAnswer + 1,
    correctAnswer - 1,
  ];
  
  for (const wrong of variations) {
    if (wrong !== correctAnswer && wrong >= 0) {
      wrongAnswers.add(wrong.toString());
    }
    if (wrongAnswers.size >= 3) break;
  }
  
  return Array.from(wrongAnswers).slice(0, 3);
}

/**
 * Generate a complete question from a template
 */
export function generateQuestionFromTemplate(template: QuestionTemplate): GeneratedQuestion {
  // Check if this is a static template (Science) or dynamic template (Math)
  const isStaticTemplate = !template.answerFormula && template.correctAnswerFormula;
  
  let correctAnswer: string;
  let questionText: string;
  let allOptions: string[];
  let methodSteps: Array<{ step: string; detail: string }>;
  let values: GeneratedValues = {};
  
  if (isStaticTemplate) {
    // Static template (Science) - direct values, no formulas
    correctAnswer = template.correctAnswerFormula as string;
    questionText = template.questionTemplate;
    allOptions = [correctAnswer, ...(template.wrongAnswers || [])];
    
    // Convert simple string array to step objects
    methodSteps = (template.methodSteps || []).map((step, index) => ({
      step: (index + 1).toString(),
      detail: step
    }));
  } else {
    // Dynamic template (Math) - formulas to evaluate
    // Generate random values for all variables
    values = generateVariableValues(template);
    
    // Special handling: if template has quotient but not divisor, and question mentions ÷ 10
    if (template.questionTemplate.includes('÷ 10') && values.quotient && !values.divisor) {
      values.divisor = 10;
    }
    
    // Calculate the correct answer
    const correctAnswerResult = evaluateFormula(template.answerFormula!, values);
    correctAnswer = typeof correctAnswerResult === 'string' 
      ? correctAnswerResult 
      : correctAnswerResult.toString();
    
    // Generate the question text
    questionText = replacePlaceholders(template.questionTemplate, values);
    
    // Generate options
    const correctAnswerNum = typeof correctAnswerResult === 'number' 
      ? correctAnswerResult 
      : parseFloat(correctAnswer.split(' ')[0]); // Extract number from "5 R1"
    
    const wrongAnswers = generateWrongAnswers(correctAnswerNum, template, values, correctAnswer);
    allOptions = [correctAnswer, ...wrongAnswers];
    
    // Generate method steps
    methodSteps = (template.methodStepsTemplate || []).map(step => ({
      step: step.step,
      detail: replacePlaceholders(step.detail, values, correctAnswer)
    }));
  }
  
  // Shuffle options
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  
  // Generate image data if configured
  let imageData;
  if (template.imageConfig) {
    const config = template.imageConfig;
    
    if (config.type === 'fraction-shape') {
      imageData = {
        type: 'fraction-shape' as const,
        numerator: config.numeratorVar ? values[config.numeratorVar] : undefined,
        denominator: config.denominatorVar ? values[config.denominatorVar] : undefined,
        shape: config.shape || (config.shapeVar ? (values[config.shapeVar] % 2 === 0 ? 'circle' : 'rectangle') : 'circle')
      };
    } else if (config.type === 'clock') {
      imageData = {
        type: 'clock' as const,
        hours: config.hoursVar ? values[config.hoursVar] : undefined,
        minutes: config.minutesVar ? values[config.minutesVar] : undefined
      };
    }
  }
  
  // Determine subject based on category or default
  const scienceCategories = ['Rocks and Soils', 'Living Things', 'Animals', 'Plants', 'Human Body', 'Food Chains', 'Water Cycle', 'Materials', 'Forces', 'Nutrition and Health', 'Forces and Motion'];
  const subject = scienceCategories.includes(template.category)
    ? 'Science'
    : (SOCIAL_STUDIES_CATEGORIES as readonly string[]).includes(template.category)
      ? 'Social Studies'
      : (ENGLISH_CATEGORIES as readonly string[]).includes(template.category)
        ? 'English'
        : (BUDDHISM_CATEGORIES as readonly string[]).includes(template.category)
            ? 'Buddhism'
            : 'Mathematics';
  
  return {
    id: `${template.id}-${Date.now()}-${Math.random()}`,
    templateId: template.id,
    generatedValues: values,
    subject: subject,
    category: template.category,
    topic: template.topic,
    difficulty: template.difficulty,
    question: questionText,
    options: shuffledOptions,
    correctAnswer: correctAnswer,
    methodSteps: methodSteps,
    questionType: template.questionType || 'mcq',
    estimatedTimeSeconds: template.estimatedTimeSeconds || 30,
    image: imageData
  };
}

/**
 * Generate multiple questions from a template
 */
export function generateMultipleFromTemplate(
  template: QuestionTemplate,
  count: number
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestionFromTemplate(template));
  }
  
  return questions;
}
