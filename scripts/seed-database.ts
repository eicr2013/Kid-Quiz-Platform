/**
 * Database Seed Script
 * Populates the Supabase database with generated questions
 * 
 * Usage: npm run seed
 */

import { createClient } from '@supabase/supabase-js';
import { generateQuestions } from '../lib/question-generator';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Generate all questions
    console.log('📝 Generating questions...');
    const questions = generateQuestions();
    console.log(`✅ Generated ${questions.length} questions\n`);

    // Display summary
    const subjects = new Set(questions.map(q => q.subject));
    const categories = new Set(questions.map(q => q.category));
    const topics = new Set(questions.map(q => q.topic));
    const difficulties = {
      Easy: questions.filter(q => q.difficulty === 'Easy').length,
      Medium: questions.filter(q => q.difficulty === 'Medium').length,
      Hard: questions.filter(q => q.difficulty === 'Hard').length,
    };

    console.log('📊 Question Summary:');
    console.log(`   Subjects: ${subjects.size}`);
    console.log(`   Categories: ${categories.size}`);
    console.log(`   Topics: ${topics.size}`);
    console.log(`   Difficulty Distribution:`);
    console.log(`     - Easy: ${difficulties.Easy}`);
    console.log(`     - Medium: ${difficulties.Medium}`);
    console.log(`     - Hard: ${difficulties.Hard}\n`);

    // Clear existing questions (optional - comment out if you want to keep existing)
    console.log('🗑️  Clearing existing questions...');
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.warn('⚠️  Warning: Could not clear existing questions:', deleteError.message);
    } else {
      console.log('✅ Existing questions cleared\n');
    }

    // Insert questions in batches
    console.log('💾 Inserting questions into database...');
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      // Transform questions to match database schema
      const dbQuestions = batch.map(q => ({
        subject: q.subject,
        category: q.category,
        topic: q.topic,
        difficulty: q.difficulty,
        question: q.question,
        options: JSON.stringify(q.options),
        correct_answer: q.correctAnswer,
        method_steps: JSON.stringify(q.methodSteps),
        question_type: q.questionType,
        estimated_time_seconds: q.estimatedTimeSeconds,
      }));

      const { error: insertError, data } = await supabase
        .from('questions')
        .insert(dbQuestions)
        .select();

      if (insertError) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, insertError);
        throw insertError;
      }

      inserted += data?.length || 0;
      process.stdout.write(`   Progress: ${inserted}/${questions.length} questions inserted\r`);
    }

    console.log(`\n✅ Successfully inserted ${inserted} questions!\n`);

    // Verify insertion
    console.log('🔍 Verifying database...');
    const { count, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error verifying database:', countError);
    } else {
      console.log(`✅ Database contains ${count} questions\n`);
    }

    // Show sample questions by category
    console.log('📚 Sample questions by category:');
    const categorySamples = await supabase
      .from('questions')
      .select('category, topic, question, difficulty')
      .limit(5);

    if (categorySamples.data) {
      categorySamples.data.forEach((q, idx) => {
        console.log(`   ${idx + 1}. [${q.difficulty}] ${q.category} - ${q.topic}`);
        console.log(`      "${q.question.substring(0, 60)}..."\n`);
      });
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Verify your database in Supabase dashboard');
    console.log('   2. Run: npm run dev');
    console.log('   3. Open: http://localhost:3000\n');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
