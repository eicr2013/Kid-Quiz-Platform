import 'dotenv/config';
import { supabase } from '../lib/supabase';

/**
 * Adds category field and maps all topics to 8 main categories
 */

// Topic to Category mapping
const TOPIC_CATEGORY_MAP: Record<string, string> = {
  // Addition
  'Bonds to 100': 'Addition',
  'Bonds to 10 and 20 and Doubles': 'Addition',
  'Add/Subtract 1-Digit Numbers': 'Mixed Operations',
  'Adding and Subtracting with Partitioning': 'Mixed Operations',
  'Making 100': 'Addition',
  'Number Pairs': 'Addition',

  // Subtraction
  'Subtract by Counting Up': 'Subtraction',
  'More Subtraction by Counting Up': 'Subtraction',

  // Multiplication
  'Multiply and Divide': 'Mixed Operations',
  'Multiples of 10': 'Multiplication',
  'Times Tables': 'Multiplication',
  'Grid Method Multiplication': 'Multiplication',
  'Identifying Multiples': 'Multiplication',
  'Doubling and Halving': 'Mixed Operations',
  'Doubling and Halving with Partitioning': 'Mixed Operations',

  // Division
  'Division with Remainders': 'Division',

  // Shapes and Measure
  '3D Shapes': 'Shapes and Measure',
  'Measuring Length': 'Shapes and Measure',
  'Measuring Capacity': 'Shapes and Measure',
  'Perimeter': 'Shapes and Measure',
  'Ordering Numbers': 'Shapes and Measure',

  // Fractions
  'Fractions': 'Fractions',
  'Comparing Fractions': 'Fractions',
  'Completing Fractions to 1': 'Fractions',

  // Units of Time
  'Units of Time': 'Units of Time',
  'Telling Time': 'Units of Time',

  // Mixed Operations (number concepts that involve multiple operations)
  '3-Digit Numbers': 'Mixed Operations',
  'Number Lines': 'Mixed Operations',
  'Rounding': 'Mixed Operations',
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
};

async function addCategories() {
  console.log('🔄 Adding category field to questions...\n');

  try {
    // Step 1: Add category column if it doesn't exist
    console.log('📊 Adding category column...');
    // Note: Supabase doesn't support ALTER TABLE directly via client
    // We'll update via the data itself
    
    // Step 2: Fetch all questions
    console.log('📥 Fetching all questions...');
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('id, topic');

    if (fetchError) {
      throw fetchError;
    }

    console.log(`✅ Found ${questions?.length || 0} questions\n`);

    // Step 3: Update each question with its category
    console.log('🏷️  Assigning categories to questions...\n');
    let updated = 0;
    let errors = 0;

    for (const question of questions || []) {
      const category = TOPIC_CATEGORY_MAP[question.topic] || 'Mixed Operations';
      
      const { error: updateError } = await supabase
        .from('questions')
        .update({ category })
        .eq('id', question.id);

      if (updateError) {
        console.error(`❌ Error updating question ${question.id}:`, updateError.message);
        errors++;
      } else {
        updated++;
        if (updated % 50 === 0) {
          console.log(`   Progress: ${updated}/${questions?.length} questions updated`);
        }
      }
    }

    console.log(`\n✅ Successfully updated ${updated} questions`);
    if (errors > 0) {
      console.log(`⚠️  ${errors} errors occurred`);
    }

    // Step 4: Show category distribution
    console.log('\n📊 Category Distribution:');
    const categoryCount: Record<string, number> = {};
    
    for (const question of questions || []) {
      const category = TOPIC_CATEGORY_MAP[question.topic] || 'Mixed Operations';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    }

    const sortedCategories = Object.entries(categoryCount)
      .sort((a, b) => a[0].localeCompare(b[0]));

    for (const [category, count] of sortedCategories) {
      console.log(`   ${category}: ${count} questions`);
    }

    console.log('\n🎉 Category migration completed successfully!');
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

addCategories();
