import 'dotenv/config';
import { supabase } from '../lib/supabase';

async function checkCategories() {
  console.log('🔍 Checking database categories...\n');

  // Get all distinct categories
  const { data: questions, error } = await supabase
    .from('questions')
    .select('category, topic, id')
    .limit(10);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('Sample questions from database:');
  questions?.forEach((q, i) => {
    console.log(`${i + 1}. Category: "${q.category}" | Topic: "${q.topic}" | ID: ${q.id}`);
  });

  // Count by category
  const { data: allQuestions } = await supabase
    .from('questions')
    .select('category');

  const categoryCounts: Record<string, number> = {};
  allQuestions?.forEach(q => {
    const cat = q.category || 'NULL';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  console.log('\n📊 Category distribution:');
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} questions`);
  });
}

checkCategories();
