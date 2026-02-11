# Complete Setup Guide 🚀

This guide will walk you through setting up the Kids Math Quiz Platform from scratch.

## Prerequisites ✅

Before you begin, ensure you have:

- [ ] Node.js 18 or higher installed ([Download](https://nodejs.org/))
- [ ] npm or yarn package manager
- [ ] A code editor (VS Code recommended)
- [ ] A Supabase account (free tier is fine)

## Step-by-Step Setup

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- Supabase client
- Tailwind CSS
- TypeScript
- pdf-parse (for future PDF extraction)

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in the details:
   - **Name**: Kids Math Quiz (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is perfect
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### Step 3: Get Supabase Credentials

Once your project is created:

1. Go to **Settings** (gear icon in sidebar)
2. Click on **API** section
3. You'll see three important values:

   **Project URL**
   ```
   https://your-project-id.supabase.co
   ```

   **Anon/Public Key** (starts with `eyJ...`)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Service Role Key** (also starts with `eyJ...`, but different)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Configure Environment Variables

1. In your project root, find `.env.local.example`
2. Create a copy and rename it to `.env.local`:

```bash
cp .env.local.example .env.local
```

3. Open `.env.local` in your editor
4. Replace the placeholder values with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Save the file

⚠️ **Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

### Step 5: Set Up Database Schema

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open `database/schema.sql` from the project
5. Copy ALL the SQL code
6. Paste it into the Supabase SQL Editor
7. Click **Run** (or press Ctrl/Cmd + Enter)

You should see success messages for:
- ✅ Extension created
- ✅ Tables created (questions, quiz_sessions, session_questions, user_progress)
- ✅ Indexes created
- ✅ Triggers created
- ✅ RLS policies created

### Step 6: Verify Database Setup

1. In Supabase Dashboard, click **Table Editor**
2. You should see these tables in the dropdown:
   - `questions`
   - `quiz_sessions`
   - `session_questions`
   - `user_progress`

3. Click on `questions` - it should be empty (we'll populate it next)

### Step 7: Seed the Database

Run the seed script to populate your database with 120 questions:

```bash
npm run seed
```

You should see output like:

```
🌱 Starting database seed...

📝 Generating questions...
✅ Generated 120 questions

📊 Question Summary:
   Subjects: 1
   Topics: 24
   Difficulty Distribution:
     - Easy: 40
     - Medium: 40
     - Hard: 40

💾 Inserting questions into database...
   Progress: 120/120 questions inserted
✅ Successfully inserted 120 questions!

🔍 Verifying database...
✅ Database contains 120 questions

🎉 Database seeding completed successfully!
```

### Step 8: Verify Database Population

1. Go back to Supabase Dashboard
2. Click **Table Editor** → **questions**
3. You should see 120 rows of questions
4. Click on a few rows to inspect the data

### Step 9: Start Development Server

```bash
npm run dev
```

You should see:

```
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Ready in 2.3s
```

### Step 10: Test the Application

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the Math Quiz Challenge home screen
4. Click through a quiz to test:
   - ✅ Questions load
   - ✅ Multiple choice works
   - ✅ Answer submission works
   - ✅ Correct answers show celebration
   - ✅ Incorrect answers show step-by-step explanation
   - ✅ Progress bar updates
   - ✅ Final score displays

## Troubleshooting 🔧

### Issue: "Missing Supabase environment variables"

**Solution**: 
- Check that `.env.local` exists in your project root
- Verify all three environment variables are set
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env.local`

### Issue: Seed script fails with "Failed to fetch questions"

**Solution**:
- Verify database schema was created successfully
- Check that tables exist in Supabase Dashboard
- Ensure your Service Role Key is correct
- Check internet connection

### Issue: "Questions are viewable by everyone" RLS error

**Solution**:
- This is expected - RLS policies are set up for public read access
- Questions should be readable without authentication
- If having issues, check RLS policies in Supabase → Authentication → Policies

### Issue: Questions not loading in the app

**Solution**:
1. Check browser console for errors (F12)
2. Verify database has questions:
   ```sql
   SELECT COUNT(*) FROM questions;
   ```
3. Check that Anon Key is correct in `.env.local`
4. Restart dev server

### Issue: Styles not loading properly

**Solution**:
```bash
# Rebuild Tailwind CSS
npm run dev
```

Or clear `.next` folder:
```bash
rm -rf .next
npm run dev
```

### Issue: TypeScript errors

**Solution**:
```bash
# Rebuild TypeScript
npm run build
```

## Verification Checklist ✓

Before moving to production, verify:

- [ ] All 120 questions are in database
- [ ] Questions load on homepage
- [ ] Can submit answers
- [ ] Correct answers show success message
- [ ] Incorrect answers show step-by-step explanation
- [ ] Step-by-step navigation works (Previous/Next/Show All)
- [ ] Quiz completion shows score
- [ ] "Start New Quiz" creates fresh session
- [ ] No console errors
- [ ] Mobile responsive design works

## Next Steps 🎯

Now that your app is running:

1. **Customize Questions**
   - Edit `lib/question-generator.ts`
   - Add more questions to topics
   - Create new topics
   - Run `npm run seed` to update database

2. **Customize Styling**
   - Edit `tailwind.config.ts` for colors
   - Modify components in `components/`
   - Update `app/globals.css` for global styles

3. **Add Features**
   - User authentication
   - Progress tracking
   - Parent dashboard
   - More subjects

4. **Deploy to Production**
   - See DEPLOYMENT.md for deployment guides
   - Recommended: Vercel for hosting

## Getting Help 💬

If you're stuck:

1. Check this guide again carefully
2. Review the main README.md
3. Check Supabase logs in Dashboard → Logs
4. Open an issue on GitHub
5. Check Next.js and Supabase documentation

## Success! 🎉

If you've completed all steps and tests pass, congratulations! Your Kids Math Quiz Platform is ready to use.

Happy learning! 📚✨
