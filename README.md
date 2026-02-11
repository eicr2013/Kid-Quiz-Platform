# Kids Math Quiz Platform 🎯

A quiz-based educational website for children built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## Features ✨

- **120 Pre-Generated Questions** covering 24 math topics (Grade 2-3 level)
- **10-Question Quiz Sessions** with random selection and balanced difficulty
- **Interactive Learning** with step-by-step explanations for incorrect answers
- **Child-Friendly UI** with colorful design and encouraging feedback
- **No Runtime AI** - all questions are pre-generated and stored in the database
- **Progress Tracking** with session management and scoring

## Tech Stack 🛠️

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **PDF Parsing**: pdf-parse (ready for future PDF extraction)

## Math Topics Covered 📚

1. Bonds to 100
2. Bonds to 10 and 20 and Doubles
3. Adding and Subtracting 1-Digit Numbers
4. 3-Digit Numbers
5. Adding/Subtracting Multiples of 10
6. Multiplying and Dividing by 3, 4, 5, and 10
7. Doubling and Halving Odd and Even Numbers
8. Units of Time
9. Telling the Time
10. 3D Shapes
11. Number Lines
12. Rounding to the Nearest 10 or 100
13. Subtract by Counting Up
14. Doubling and Halving Using Partitioning
15. Finding Fractions of Shapes and Amounts
16. Place Value of Money
17. Making 100
18. Adding and Subtracting by Partitioning
19. Measuring Length
20. Measuring Capacity
21. Numbers on a Number Line
22. More Subtraction on Counting Up
23. Revising Times Tables
24. Division with Remainders

## Quick Start 🚀

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great!)

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public Key
   - Service Role Key

3. Run the database schema:
   - Go to **SQL Editor** in Supabase Dashboard
   - Copy the contents of `database/schema.sql`
   - Execute the SQL

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Seed the Database

```bash
npm run seed
```

This will populate your database with all 120 questions.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Project Structure 📁

```
Education/
├── app/
│   ├── api/
│   │   └── quiz/
│   │       ├── session/         # Create new quiz sessions
│   │       ├── answer/          # Submit answers
│   │       └── session/[id]/    # Get session details
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── QuizContainer.tsx        # Main quiz orchestration
│   ├── QuizQuestion.tsx         # Question display and interaction
│   └── StepByStepExplanation.tsx # Learning component
├── database/
│   └── schema.sql               # Database schema
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── question-generator.ts   # Question generation module
├── scripts/
│   └── seed-database.ts        # Database seeding script
├── types/
│   └── question.ts             # TypeScript interfaces
└── README.md
```

## Key Components 🔑

### QuizContainer

Main component that manages quiz state, fetches sessions, and handles progression.

### QuizQuestion

Displays individual questions with:
- Multiple choice options
- Visual feedback (correct/incorrect)
- Difficulty indicators
- Time estimates

### StepByStepExplanation

Child-friendly learning component that:
- Shows one step at a time
- Allows navigation through steps
- Provides option to view all steps
- Uses encouraging language

## API Routes 🌐

### `GET /api/quiz/session`

Creates a new quiz session with 10 random questions (4 Easy, 4 Medium, 2 Hard).

**Response:**
```json
{
  "sessionId": "uuid",
  "questions": [...],
  "totalQuestions": 10
}
```

### `POST /api/quiz/answer`

Submits an answer for a question.

**Request:**
```json
{
  "sessionId": "uuid",
  "questionId": "uuid",
  "userAnswer": "answer"
}
```

**Response:**
```json
{
  "isCorrect": true/false,
  "correctAnswer": "string",
  "methodSteps": [...] // Only if incorrect
}
```

### `GET /api/quiz/session/[sessionId]`

Retrieves session details and scoring.

## Database Schema 💾

### questions
- id (UUID, primary key)
- subject (VARCHAR)
- topic (VARCHAR)
- difficulty (Easy/Medium/Hard)
- question (TEXT)
- options (JSONB)
- correct_answer (TEXT)
- method_steps (JSONB)
- question_type (mcq/short_answer)
- estimated_time_seconds (INTEGER)
- created_at, updated_at (TIMESTAMP)

### quiz_sessions
- id (UUID, primary key)
- created_at, completed_at (TIMESTAMP)
- user_id (UUID, optional)
- score, total_questions (INTEGER)

### session_questions
- id (UUID, primary key)
- session_id, question_id (UUID, foreign keys)
- question_order (INTEGER)
- user_answer (TEXT)
- is_correct (BOOLEAN)
- answered_at (TIMESTAMP)

## Future Enhancements 🔮

### PDF Extraction Module (Ready to Implement)

The project includes pdf-parse for future PDF-based question generation:

```typescript
// Example utility (not yet implemented)
import pdf from 'pdf-parse';

async function extractTextFromPDF(filepath: string) {
  const dataBuffer = fs.readFileSync(filepath);
  const data = await pdf(dataBuffer);
  return data.text;
}
```

### Potential Additions

- User authentication and profiles
- Progress tracking over time
- Parent/teacher dashboard
- Adaptive difficulty based on performance
- Timed challenges
- Leaderboards
- Print worksheets
- More subjects (science, reading, etc.)

## Development 💻

### Adding New Questions

1. Edit `lib/question-generator.ts`
2. Add questions to the appropriate topic function
3. Run `npm run seed` to update the database

### Question Format

```typescript
{
  subject: "Mathematics",
  topic: "Addition",
  difficulty: "Easy" | "Medium" | "Hard",
  question: "What is 5 + 3?",
  options: ["6", "7", "8", "9"],
  correctAnswer: "8",
  methodSteps: [
    { step: "1", detail: "Start with 5" },
    { step: "2", detail: "Count up 3: 6, 7, 8" },
    { step: "3", detail: "5 + 3 = 8" }
  ],
  questionType: "mcq",
  estimatedTimeSeconds: 30
}
```

## Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with questions
- `npm run lint` - Run ESLint

## Deployment 🚀

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for educational purposes!

## Support 💬

For questions or issues, please open an issue on GitHub.

---

Made with ❤️ for young learners
