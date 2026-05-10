# Supabase Import Instructions for Agent2

**For:** Computing and Education in Human Values Questions  
**Source File:** `EXTRACTED_QUESTIONS_2024_2025.json`  
**Total Questions:** 47 (32 Computing + 15 Human Values)

---

## 📋 Step 1: Create Database Table

If not already created, create a `questions` table in Supabase:

```sql
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  wrong_answers JSONB NOT NULL,
  explanation TEXT NOT NULL,
  year TEXT NOT NULL,
  assessment_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes for faster queries
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_year ON questions(year);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust based on your security requirements)
CREATE POLICY "Allow public read access" ON questions
  FOR SELECT USING (true);
```

---

## 📦 Step 2: Prepare Import Data

The JSON file structure:
```json
{
  "metadata": { ... },
  "subjects": { ... },
  "questions": [
    {
      "id": "comp_2024_nov_01",
      "subject": "Computing",
      "category": "Internet Safety and Netiquette",
      "difficulty": "Easy",
      "question": "You must be _____ online...",
      "correct_answer": "polite",
      "wrong_answers": ["rude", "angry", "quiet"],
      "explanation": "Being polite online...",
      "year": "2024",
      "assessment_type": "Formative Assessment - November"
    },
    ...
  ]
}
```

---

## 🔧 Step 3: Import Options

### Option A: Using Supabase JavaScript Client

```javascript
import { createClient } from '@supabase/supabase-js'
import questionsData from './EXTRACTED_QUESTIONS_2024_2025.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for bulk insert
)

async function importQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .insert(questionsData.questions)
  
  if (error) {
    console.error('Import error:', error)
  } else {
    console.log(`Successfully imported ${data.length} questions`)
  }
}

importQuestions()
```

### Option B: Using Supabase Dashboard

1. Go to Supabase Dashboard → Table Editor
2. Select `questions` table
3. Click "Insert" → "Insert row"
4. Or use SQL Editor to run bulk INSERT statements

### Option C: Using SQL Bulk Insert

Generate SQL INSERT statements from the JSON:

```sql
INSERT INTO questions (id, subject, category, difficulty, question, correct_answer, wrong_answers, explanation, year, assessment_type)
VALUES
  ('comp_2024_nov_01', 'Computing', 'Internet Safety and Netiquette', 'Easy', 'You must be _____ online, just like in real life.', 'polite', '["rude", "angry", "quiet"]', 'Being polite online is important...', '2024', 'Formative Assessment - November'),
  ('comp_2024_nov_02', 'Computing', 'Internet Safety and Netiquette', 'Medium', 'What is Netiquette?', 'The list of rules for proper behaviour on the internet', '["A type of internet connection", "A computer program", "A social media platform"]', 'Netiquette refers to...', '2024', 'Formative Assessment - November'),
  -- ... (continue for all 47 questions)
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  question = EXCLUDED.question,
  correct_answer = EXCLUDED.correct_answer,
  wrong_answers = EXCLUDED.wrong_answers,
  explanation = EXCLUDED.explanation,
  year = EXCLUDED.year,
  assessment_type = EXCLUDED.assessment_type,
  updated_at = NOW();
```

---

## 🔌 Step 4: Update Quiz System

After importing to Supabase, modify the quiz generation logic:

### Update `app/api/quiz/session/route.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

// For Computing and Education in Human Values, fetch from Supabase
if (subject === 'Computing' || subject === 'Education in Human Values') {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('subject', subject)
    .in('category', categories)
  
  if (error) {
    console.error('Supabase fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
  
  // Transform to quiz format
  const quizQuestions = questions.map(q => ({
    subject: q.subject,
    topic: q.category,
    difficulty: q.difficulty,
    question: q.question,
    options: [q.correct_answer, ...q.wrong_answers].sort(() => Math.random() - 0.5),
    correctAnswer: q.correct_answer,
    methodSteps: [{ step: '1', detail: q.explanation }]
  }))
  
  // Continue with existing quiz session logic...
}
```

### Update `app/api/quiz/categories/route.ts`

```typescript
// For Computing and Education in Human Values
if (subject === 'Computing' || subject === 'Education in Human Values') {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data: categories, error } = await supabase
    .from('questions')
    .select('category, id')
    .eq('subject', subject)
  
  if (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
  
  // Count questions per category
  const categoryCounts = categories.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return NextResponse.json({
    categories: Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      questionCount: count
    }))
  })
}
```

---

## 🎨 Step 5: Add Subjects to UI

### Update `components/SubjectSelection.tsx`

```typescript
const SUBJECTS = [
  // ... existing subjects ...
  {
    id: 'Computing',
    name: 'Computing',
    emoji: '💻',
    color: 'from-blue-500 to-cyan-500',
    description: 'Learn about computers, internet, and technology'
  },
  {
    id: 'Education_in_Human_Values',
    name: 'Education in Human Values',
    emoji: '💎',
    color: 'from-pink-500 to-rose-500',
    description: 'Learn about values, virtues, and character'
  }
]
```

### Update Progress and Admin dashboards

Add the new subjects to:
- `components/ProgressReview.tsx` (filter tabs)
- `components/AdminDashboard.tsx` (subject list)

---

## ✅ Step 6: Verification

After import and integration:

1. **Check database:**
   ```sql
   SELECT subject, COUNT(*) as count 
   FROM questions 
   GROUP BY subject;
   ```
   Expected: Computing (32), Education in Human Values (15)

2. **Test quiz generation:**
   - Select Computing → Choose category → Start quiz
   - Verify questions appear correctly
   - Check that wrong answers are shuffled with correct answer

3. **Test progress tracking:**
   - Take a few quizzes
   - Check progress display
   - Verify admin dashboard shows new subjects

---

## 📊 Expected Results

After successful import:
- **Computing categories:** 9 categories with 1-8 questions each
- **Human Values categories:** 4 categories with 1-11 questions each
- **Total database records:** 47 questions
- **Quiz functionality:** Fully operational for both subjects
- **Progress tracking:** Working for both subjects

---

## 🐛 Troubleshooting

### Issue: Questions not appearing in quiz

**Check:**
1. Supabase connection (env variables set?)
2. Table name matches (`questions`)
3. Subject name matches exactly (case-sensitive)
4. RLS policies allow read access

### Issue: Wrong answers not shuffled

**Fix:**
```typescript
// Shuffle options before displaying
const shuffledOptions = [correctAnswer, ...wrongAnswers]
  .sort(() => Math.random() - 0.5)
```

### Issue: Database insert fails

**Common causes:**
- Duplicate IDs (already imported?)
- Wrong JSON format for `wrong_answers` (should be JSONB array)
- Missing required fields
- Character encoding issues

---

## 📝 Notes

- **Backup first:** Before importing, backup existing questions table
- **Test in dev:** Test import in development environment first
- **Monitor performance:** 47 questions is small, but index for scalability
- **Future additions:** Easy to add more questions - just append to JSON and re-import

---

**Good luck with the import, Agent2!** 🚀

If you encounter any issues, refer back to the source file (`EXTRACTED_QUESTIONS_2024_2025.json`) and this guide.
