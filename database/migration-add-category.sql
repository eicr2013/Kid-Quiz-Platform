-- Migration: Add category field to questions table
-- Run this in Supabase SQL Editor first

-- Add category column
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Set default value for existing rows
UPDATE questions SET category = 'Mixed Operations' WHERE category IS NULL;

-- Make category NOT NULL after setting defaults
ALTER TABLE questions 
ALTER COLUMN category SET NOT NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);

-- Verify the migration
SELECT 
  category, 
  COUNT(*) as question_count 
FROM questions 
GROUP BY category 
ORDER BY category;
