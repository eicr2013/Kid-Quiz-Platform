/**
 * PDF Extraction Utility
 * Node-compatible PDF text extraction for future question generation
 * 
 * This module can be used to extract text from PDF files and analyze
 * question patterns for generating new questions.
 */

import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

export interface PDFExtractionResult {
  text: string;
  numPages: number;
  metadata: any;
  filepath: string;
}

export interface QuestionPattern {
  type: 'arithmetic' | 'word_problem' | 'multiple_choice' | 'fill_blank';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  pattern: string;
}

/**
 * Extract text from a single PDF file
 */
export async function extractTextFromPDF(filepath: string): Promise<PDFExtractionResult> {
  try {
    // Validate file exists
    if (!fs.existsSync(filepath)) {
      throw new Error(`PDF file not found: ${filepath}`);
    }

    // Read PDF file
    const dataBuffer = fs.readFileSync(filepath);
    
    // Parse PDF
    const data = await pdf(dataBuffer);

    return {
      text: data.text,
      numPages: data.numpages,
      metadata: data.metadata || {},
      filepath,
    };
  } catch (error) {
    console.error(`Error extracting PDF: ${filepath}`, error);
    throw error;
  }
}

/**
 * Extract text from all PDFs in a directory
 */
export async function extractTextFromDirectory(
  directoryPath: string
): Promise<PDFExtractionResult[]> {
  try {
    // Validate directory exists
    if (!fs.existsSync(directoryPath)) {
      throw new Error(`Directory not found: ${directoryPath}`);
    }

    // Get all PDF files
    const files = fs.readdirSync(directoryPath);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    if (pdfFiles.length === 0) {
      console.warn(`No PDF files found in: ${directoryPath}`);
      return [];
    }

    console.log(`Found ${pdfFiles.length} PDF files`);

    // Extract text from each PDF
    const results: PDFExtractionResult[] = [];
    
    for (const pdfFile of pdfFiles) {
      const filepath = path.join(directoryPath, pdfFile);
      console.log(`Extracting: ${pdfFile}...`);
      
      try {
        const result = await extractTextFromPDF(filepath);
        results.push(result);
        console.log(`✓ Extracted ${result.numPages} pages from ${pdfFile}`);
      } catch (error) {
        console.error(`✗ Failed to extract ${pdfFile}:`, error);
      }
    }

    return results;
  } catch (error) {
    console.error(`Error processing directory: ${directoryPath}`, error);
    throw error;
  }
}

/**
 * Analyze text to identify question patterns
 * This is a basic implementation - you can enhance it based on your PDF structure
 */
export function analyzeQuestionPatterns(text: string): QuestionPattern[] {
  const patterns: QuestionPattern[] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect arithmetic patterns
    if (/\d+\s*[\+\-\×\÷]\s*\d+/.test(trimmed)) {
      patterns.push({
        type: 'arithmetic',
        difficulty: estimateDifficulty(trimmed),
        topic: detectTopic(trimmed),
        pattern: trimmed,
      });
    }

    // Detect multiple choice (A), (B), (C) patterns
    if (/\([A-D]\)/.test(trimmed)) {
      patterns.push({
        type: 'multiple_choice',
        difficulty: estimateDifficulty(trimmed),
        topic: detectTopic(trimmed),
        pattern: trimmed,
      });
    }

    // Detect fill-in-the-blank patterns
    if (/__+|_{3,}/.test(trimmed)) {
      patterns.push({
        type: 'fill_blank',
        difficulty: estimateDifficulty(trimmed),
        topic: detectTopic(trimmed),
        pattern: trimmed,
      });
    }

    // Detect word problems (heuristic: contains question mark and numbers)
    if (trimmed.includes('?') && /\d+/.test(trimmed) && trimmed.split(' ').length > 5) {
      patterns.push({
        type: 'word_problem',
        difficulty: estimateDifficulty(trimmed),
        topic: detectTopic(trimmed),
        pattern: trimmed,
      });
    }
  }

  return patterns;
}

/**
 * Estimate difficulty based on number size and operation complexity
 */
function estimateDifficulty(text: string): 'Easy' | 'Medium' | 'Hard' {
  const numbers = text.match(/\d+/g)?.map(Number) || [];
  const maxNumber = Math.max(...numbers, 0);

  // Detect operations
  const hasMultiplication = /[×\*]/.test(text);
  const hasDivision = /[÷\/]/.test(text);
  const hasSubtraction = /[-−]/.test(text);
  const hasAddition = /\+/.test(text);

  // Complex operations
  if (hasDivision || hasMultiplication) {
    if (maxNumber > 50) return 'Hard';
    if (maxNumber > 20) return 'Medium';
    return 'Easy';
  }

  // Subtraction with larger numbers
  if (hasSubtraction) {
    if (maxNumber > 100) return 'Hard';
    if (maxNumber > 50) return 'Medium';
    return 'Easy';
  }

  // Addition
  if (hasAddition) {
    if (maxNumber > 100) return 'Medium';
    if (maxNumber > 50) return 'Easy';
    return 'Easy';
  }

  // Default
  return maxNumber > 100 ? 'Medium' : 'Easy';
}

/**
 * Detect topic from question text (basic keyword matching)
 */
function detectTopic(text: string): string {
  const lowerText = text.toLowerCase();

  // Topic keywords
  const topicMap: { [key: string]: string[] } = {
    'Addition': ['add', 'plus', 'sum', 'total', '+'],
    'Subtraction': ['subtract', 'minus', 'difference', 'take away', '-'],
    'Multiplication': ['multiply', 'times', 'product', '×', '*'],
    'Division': ['divide', 'divided by', 'share', '÷', '/'],
    'Fractions': ['fraction', 'half', 'quarter', 'third', '1/2', '1/4'],
    'Time': ['time', 'clock', 'hour', 'minute', "o'clock"],
    'Money': ['dollar', 'cent', 'penny', 'dime', 'quarter', '$', '¢'],
    'Measurement': ['meter', 'centimeter', 'liter', 'milliliter', 'measure'],
    'Shapes': ['shape', 'circle', 'square', 'triangle', 'rectangle', 'cube'],
    'Rounding': ['round', 'nearest', 'estimate'],
  };

  for (const [topic, keywords] of Object.entries(topicMap)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return topic;
    }
  }

  return 'General Mathematics';
}

/**
 * Clean and normalize extracted text
 */
export function cleanExtractedText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\r\n/g, '\n') // Normalize line breaks
    .replace(/[^\S\n]+/g, ' ') // Remove extra spaces but keep newlines
    .trim();
}

/**
 * Example usage function
 */
export async function exampleUsage() {
  // Example 1: Extract from single PDF
  const pdfPath = path.join(process.cwd(), 'pdfs', 'math-worksheets.pdf');
  
  try {
    const result = await extractTextFromPDF(pdfPath);
    console.log('Extracted text:', result.text.substring(0, 500));
    
    const patterns = analyzeQuestionPatterns(result.text);
    console.log('Found patterns:', patterns.length);
  } catch (error) {
    console.log('PDF extraction example - file not found (this is expected)');
  }

  // Example 2: Extract from directory
  const pdfDirectory = path.join(process.cwd(), 'pdfs');
  
  try {
    const results = await extractTextFromDirectory(pdfDirectory);
    console.log(`Processed ${results.length} PDFs`);
  } catch (error) {
    console.log('PDF directory example - directory not found (this is expected)');
  }
}

// Export for testing
export const testExports = {
  estimateDifficulty,
  detectTopic,
};
