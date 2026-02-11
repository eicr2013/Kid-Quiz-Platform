-- Add category column to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Update all existing questions with default category
UPDATE questions SET category = 'Mixed Operations' WHERE category IS NULL OR category = '';

-- Make it required
ALTER TABLE questions ALTER COLUMN category SET NOT NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
