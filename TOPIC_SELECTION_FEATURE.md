# Topic Selection Feature ✨

## Overview
Added a new feature that allows students to select specific topics before starting a quiz. You can now practice targeted math topics instead of getting random questions from all topics!

---

## How It Works

### 1. **Topic Selection Screen** 🎯
When you start the quiz, you'll now see a beautiful topic selection screen showing:
- All 39 available topics
- Number of questions per topic
- Easy checkboxes to select/deselect topics
- "Select All" and "Clear All" buttons

### 2. **Multiple Topic Selection** ✅
- Select **one topic** (e.g., "Subtraction") → get 10 subtraction questions
- Select **multiple topics** (e.g., "Multiplication" + "3D Shapes") → get 10 questions from those topics
- Select **all topics** → get random questions from all topics (like before)

### 3. **Smart Filtering** 🧠
The quiz still maintains the difficulty balance:
- **4 Easy questions** (15 seconds each)
- **4 Medium questions** (20 seconds each)
- **2 Hard questions** (30 seconds each)

But now they're only from your selected topics!

### 4. **Topic Display** 📊
During the quiz, you'll see which topics you're practicing at the top of the screen.

### 5. **Flexible Restart** 🔄
After completing a quiz, you have two options:
- **Same Topics Again** - Retry with the same topic selection
- **Choose New Topics** - Go back to topic selection to pick different topics

---

## Available Topics (39 Total)

### Basic Number Operations
1. Bonds to 100
2. Bonds to 10 and 20 and Doubles
3. Add/Subtract 1-Digit Numbers
4. Adding and Subtracting with Partitioning
5. Subtract by Counting Up
6. More Subtraction by Counting Up

### Place Value
7. 3-Digit Numbers
8. Ordering Numbers
9. Number Before and After
10. Middle Numbers (Finding Halfway)

### Multiplication & Division
11. Multiples of 10
12. Multiply and Divide
13. Times Tables (2, 3, 4, 5, 10)
14. Grid Method Multiplication
15. Identifying Multiples
16. Division with Remainders

### Fractions
17. Fractions
18. Comparing Fractions
19. Completing Fractions to 1

### Number Concepts
20. Doubling and Halving
21. Doubling and Halving with Partitioning
22. Making 100
23. Rounding (to nearest 10 and 100)
24. Odd and Even Numbers
25. Number Patterns and Sequences
26. Writing Numbers in Words
27. Number Pairs

### Measurement
28. Units of Time
29. Telling Time
30. Measuring Length
31. Measuring Capacity
32. Perimeter

### Geometry
33. 3D Shapes

### Number Lines
34. Number Lines
35. Numbers on a Number Line

### Money
36. Place Value with Money
37. Money - Pounds and Pence
38. Making Change

### Problem Solving
39. Word Problems

---

## Technical Implementation

### New Files Created
1. **`components/TopicSelection.tsx`** - Beautiful topic selection UI
2. **`app/api/quiz/topics/route.ts`** - API endpoint to fetch available topics

### Updated Files
1. **`app/api/quiz/session/route.ts`** - Now accepts topic filters via query parameters
2. **`components/QuizContainer.tsx`** - Integrated topic selection flow

---

## Example Usage

### Example 1: Practice Subtraction Only
1. Start the quiz
2. Select "Subtract by Counting Up" and "More Subtraction by Counting Up"
3. Click "Start Quiz!"
4. Get 10 questions focused on subtraction strategies

### Example 2: Practice Multiplication & Shapes
1. Start the quiz
2. Select "Multiply and Divide", "Times Tables", and "3D Shapes"
3. Click "Start Quiz!"
4. Get 10 questions from those 3 topics

### Example 3: Practice Everything
1. Start the quiz
2. Click "Select All"
3. Click "Start Quiz!"
4. Get 10 random questions from all 39 topics

---

## Benefits

✅ **Targeted Practice** - Focus on weak areas
✅ **Flexible Learning** - Mix and match topics
✅ **Better Retention** - Repeated practice on specific topics
✅ **Student Choice** - Empowers students to control their learning
✅ **Parent/Teacher Friendly** - Easy to assign specific topic practice

---

## Try It Now!

Visit: **http://localhost:3000**

You should see the new topic selection screen! 🎉
