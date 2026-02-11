import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const TOPIC_TO_CATEGORY: Record<string, string> = {
  'Bonds to 100': 'Addition',
  'Bonds to 10 and 20 and Doubles': 'Addition',
  'Making 100': 'Addition',
  'Number Pairs': 'Addition',
  'Subtract by Counting Up': 'Subtraction',
  'More Subtraction by Counting Up': 'Subtraction',
  'Multiples of 10': 'Multiplication',
  'Times Tables': 'Multiplication',
  'Grid Method Multiplication': 'Multiplication',
  'Identifying Multiples': 'Multiplication',
  'Multiply and Divide': 'Division',
  'Division with Remainders': 'Division',
  '3D Shapes': 'Shapes and Measure',
  'Measuring Length': 'Shapes and Measure',
  'Measuring Capacity': 'Shapes and Measure',
  'Perimeter': 'Shapes and Measure',
  'Fractions': 'Fractions',
  'Comparing Fractions': 'Fractions',
  'Completing Fractions to 1': 'Fractions',
  'Units of Time': 'Units of Time',
  'Telling Time': 'Units of Time',
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

async function fixCategories() {
  console.log('🔧 Fixing categories...\n');

  // Get all questions
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, topic, category');

  if (error) {
    console.error('❌ Error fetching questions:', error);
    process.exit(1);
  }

  console.log(`📝 Found ${questions?.length} questions\n`);

  let updated = 0;
  let skipped = 0;

  for (const question of questions || []) {
    const correctCategory = TOPIC_TO_CATEGORY[question.topic];
    
    if (!correctCategory) {
      console.log(`⚠️  Unknown topic: "${question.topic}"`);
      skipped++;
      continue;
    }

    if (question.category === correctCategory) {
      skipped++;
      continue;
    }

    // Update the category
    const { error: updateError } = await supabase
      .from('questions')
      .update({ category: correctCategory })
      .eq('id', question.id);

    if (updateError) {
      console.error(`❌ Error updating ${question.id}:`, updateError);
    } else {
      updated++;
      if (updated % 50 === 0) {
        console.log(`   Progress: ${updated} updated...`);
      }
    }
  }

  console.log(`\n✅ Updated ${updated} questions`);
  console.log(`⏭️  Skipped ${skipped} questions (already correct or unknown topic)\n`);

  // Show final distribution
  const { data: final } = await supabase
    .from('questions')
    .select('category');

  const counts: Record<string, number> = {};
  final?.forEach(q => {
    const cat = q.category || 'NULL';
    counts[cat] = (counts[cat] || 0) + 1;
  });

  console.log('📊 Final category distribution:');
  Object.entries(counts).sort().forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });

  console.log('\n🎉 Done!');
}

fixCategories();
