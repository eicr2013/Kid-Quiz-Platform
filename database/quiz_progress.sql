-- Quiz progress table: stores per-user, per-category progress (synced across devices)
-- Run this in Supabase SQL Editor if you haven't already run the main schema.

CREATE TABLE IF NOT EXISTS quiz_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  total_attempted INTEGER NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_wrong INTEGER NOT NULL DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_name, subject, category)
);

CREATE INDEX IF NOT EXISTS idx_quiz_progress_user_name ON quiz_progress(user_name);
CREATE INDEX IF NOT EXISTS idx_quiz_progress_last_practiced ON quiz_progress(last_practiced DESC);

ALTER TABLE quiz_progress ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read/write (app uses simple name-based "login", no Supabase Auth)
CREATE POLICY "Anyone can read quiz progress"
  ON quiz_progress FOR SELECT USING (true);

CREATE POLICY "Anyone can insert quiz progress"
  ON quiz_progress FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update quiz progress"
  ON quiz_progress FOR UPDATE USING (true);
