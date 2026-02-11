# Project Structure 📁

```
Education/
│
├── 📱 app/                          # Next.js App Router
│   ├── api/                         # API Routes
│   │   └── quiz/
│   │       ├── session/
│   │       │   ├── route.ts         # GET: Create new quiz session
│   │       │   └── [sessionId]/
│   │       │       └── route.ts     # GET: Fetch session details
│   │       └── answer/
│   │           └── route.ts         # POST: Submit answer
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page (quiz)
│   └── globals.css                  # Global styles
│
├── 🧩 components/                   # React Components
│   ├── QuizContainer.tsx            # Main quiz orchestration
│   ├── QuizQuestion.tsx             # Question display & interaction
│   └── StepByStepExplanation.tsx   # Learning explanation component
│
├── 🗄️ database/                     # Database
│   └── schema.sql                   # PostgreSQL schema for Supabase
│
├── 🛠️ lib/                          # Utilities
│   ├── supabase.ts                  # Supabase client configuration
│   ├── question-generator.ts        # Question generation (120 questions)
│   └── pdf-extractor.ts             # PDF text extraction utility
│
├── 📜 scripts/                      # Scripts
│   └── seed-database.ts             # Database seeding script
│
├── 📝 types/                        # TypeScript Types
│   └── question.ts                  # Question & Session interfaces
│
├── ⚙️ Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.ts           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   ├── next.config.js               # Next.js config
│   ├── .env.local.example           # Environment variables template
│   ├── .env.example                 # Alternative env template
│   └── .gitignore                   # Git ignore rules
│
└── 📚 Documentation
    ├── README.md                    # Main documentation
    ├── SETUP_GUIDE.md               # Detailed setup instructions
    ├── DELIVERABLES.md              # Complete deliverables list
    └── PROJECT_STRUCTURE.md         # This file
```

## Component Architecture 🏗️

```
┌─────────────────────────────────────────┐
│          app/page.tsx                   │
│          (Home Page)                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      QuizContainer.tsx                  │
│  • Manages quiz state                   │
│  • Fetches questions from API           │
│  • Tracks answers                       │
│  • Calculates score                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      QuizQuestion.tsx                   │
│  • Displays question                    │
│  • Handles answer selection             │
│  • Shows feedback                       │
└──────────────┬──────────────────────────┘
               │
               ▼ (if incorrect)
┌─────────────────────────────────────────┐
│   StepByStepExplanation.tsx            │
│  • Shows method steps                   │
│  • Step-by-step navigation              │
│  • Learning encouragement               │
└─────────────────────────────────────────┘
```

## Data Flow 🔄

```
1. User visits app
   ↓
2. QuizContainer requests new session
   ↓
3. GET /api/quiz/session
   ↓
4. API fetches 10 random questions from Supabase
   (4 Easy, 4 Medium, 2 Hard, no duplicates)
   ↓
5. Creates quiz_session record
   ↓
6. Returns questions to QuizContainer
   ↓
7. QuizQuestion displays first question
   ↓
8. User selects answer
   ↓
9. POST /api/quiz/answer
   ↓
10. API validates answer
    ↓
11. Updates session_questions table
    ↓
12. Returns result (correct/incorrect + steps if wrong)
    ↓
13. If incorrect: StepByStepExplanation shows method
    ↓
14. User continues to next question
    ↓
15. Repeat steps 7-14 for all 10 questions
    ↓
16. Quiz completion screen shows score
```

## Database Schema 🗄️

```
┌──────────────────────────────────────┐
│          questions                   │
├──────────────────────────────────────┤
│ id (UUID, PK)                        │
│ subject                              │
│ topic                                │
│ difficulty (Easy/Medium/Hard)        │
│ question                             │
│ options (JSONB)                      │
│ correct_answer                       │
│ method_steps (JSONB)                 │
│ question_type                        │
│ estimated_time_seconds               │
│ created_at, updated_at               │
└──────────────────────────────────────┘
              ▲
              │ references
              │
┌──────────────────────────────────────┐
│      session_questions               │
├──────────────────────────────────────┤
│ id (UUID, PK)                        │
│ session_id (FK) ────────────┐       │
│ question_id (FK)             │       │
│ question_order               │       │
│ user_answer                  │       │
│ is_correct                   │       │
│ answered_at                  │       │
└──────────────────────────────┼───────┘
                               │
                               ▼
                ┌──────────────────────────────────────┐
                │       quiz_sessions                  │
                ├──────────────────────────────────────┤
                │ id (UUID, PK)                        │
                │ created_at                           │
                │ completed_at                         │
                │ user_id                              │
                │ score                                │
                │ total_questions                      │
                └──────────────────────────────────────┘

┌──────────────────────────────────────┐
│       user_progress                  │
│  (for future implementation)         │
├──────────────────────────────────────┤
│ id (UUID, PK)                        │
│ user_id                              │
│ topic                                │
│ difficulty                           │
│ correct_count                        │
│ total_count                          │
│ last_practiced                       │
└──────────────────────────────────────┘
```

## API Endpoints 🌐

```
┌─────────────────────────────────────────────────────┐
│  GET /api/quiz/session                              │
│  Creates new quiz with 10 random questions          │
│                                                      │
│  Response: {                                         │
│    sessionId: "uuid",                                │
│    questions: [...10 questions],                     │
│    totalQuestions: 10                                │
│  }                                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  POST /api/quiz/answer                              │
│  Submits answer for a question                      │
│                                                      │
│  Request: {                                          │
│    sessionId: "uuid",                                │
│    questionId: "uuid",                               │
│    userAnswer: "answer"                              │
│  }                                                   │
│                                                      │
│  Response: {                                         │
│    isCorrect: true/false,                            │
│    correctAnswer: "answer",                          │
│    methodSteps: [...],  // if incorrect              │
│    explanation: "..."   // if incorrect              │
│  }                                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  GET /api/quiz/session/[sessionId]                  │
│  Retrieves session with all questions & score       │
│                                                      │
│  Response: {                                         │
│    session: {...},                                   │
│    questions: [...],                                 │
│    score: {                                          │
│      correct: 8,                                     │
│      total: 10,                                      │
│      answered: 10,                                   │
│      percentage: 80                                  │
│    }                                                 │
│  }                                                   │
└─────────────────────────────────────────────────────┘
```

## Question Generation 🎲

```
lib/question-generator.ts
│
├── generateQuestions()
│   └── Returns all 120 questions
│
├── Topic Functions (24 total)
│   ├── generateBondsTo100()              → 5 questions
│   ├── generateBondsTo10And20()          → 5 questions
│   ├── generateAddSubtract1Digit()       → 5 questions
│   ├── generate3DigitNumbers()           → 5 questions
│   ├── generateMultiplesOf10()           → 5 questions
│   ├── generateMultiplyDivide()          → 5 questions
│   ├── generateDoublingHalving()         → 5 questions
│   ├── generateUnitsOfTime()             → 5 questions
│   ├── generateTellingTime()             → 5 questions
│   ├── generate3DShapes()                → 5 questions
│   ├── generateNumberLines()             → 5 questions
│   ├── generateRounding()                → 5 questions
│   ├── generateSubtractByCountingUp()    → 5 questions
│   ├── generateDoublingHalvingPart()     → 5 questions
│   ├── generateFractions()               → 5 questions
│   ├── generatePlaceValueMoney()         → 5 questions
│   ├── generateMaking100()               → 5 questions
│   ├── generateAddSubtractPart()         → 5 questions
│   ├── generateMeasuringLength()         → 5 questions
│   ├── generateMeasuringCapacity()       → 5 questions
│   ├── generateNumbersOnNumberLine()     → 5 questions
│   ├── generateMoreSubtractionUp()       → 5 questions
│   ├── generateTimesTables()             → 5 questions
│   └── generateDivisionRemainders()      → 5 questions
│
└── Each function creates questions with:
    • Difficulty progression (Easy → Medium → Hard)
    • Child-friendly wording
    • Accurate calculations
    • Step-by-step explanations
```

## Technology Stack 💻

```
Frontend:
├── Next.js 14 (App Router)
├── React 18
├── TypeScript
└── Tailwind CSS

Backend:
├── Next.js API Routes
├── Supabase (PostgreSQL)
└── Server-side TypeScript

Development:
├── ESLint
├── PostCSS
├── Autoprefixer
└── tsx (TypeScript runner)

Additional:
└── pdf-parse (PDF extraction)
```

## File Sizes (Approximate) 📏

```
lib/question-generator.ts     ~45 KB   (120 questions)
components/QuizQuestion.tsx   ~8 KB    (main quiz UI)
components/QuizContainer.tsx  ~6 KB    (orchestration)
components/StepByStep...tsx   ~5 KB    (learning UI)
lib/pdf-extractor.ts          ~10 KB   (PDF utility)
scripts/seed-database.ts      ~6 KB    (seeding script)
database/schema.sql           ~5 KB    (DB schema)
app/api/*/route.ts           ~2-3 KB each
```

## Commands Quick Reference 🚀

```bash
# Installation
npm install                    # Install dependencies

# Development
npm run dev                    # Start dev server (http://localhost:3000)
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npm run seed                   # Seed database with questions

# Code Quality
npm run lint                   # Run ESLint
```

## Environment Variables 🔐

```
Required:
NEXT_PUBLIC_SUPABASE_URL       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Public API key
SUPABASE_SERVICE_ROLE_KEY      # Server-side API key (secret!)
```

---

**Last Updated**: 2026-02-11
**Version**: 1.0.0
**Status**: ✅ Production Ready
