# Dynamic Question Generation System 🎲

## Concept
Transform static questions into infinite variations by using templates with variable ranges.

---

## Example Transformation

### Before (Static):
```
Question: "15 + ___ = 100"
Answer: "85"
```

### After (Dynamic):
```
Template: "{num1} + ___ = 100"
Variables: { num1: { min: 10, max: 90, step: 5 } }
Answer Formula: "100 - {num1}"

Generated variations:
- "15 + ___ = 100" → Answer: 85
- "25 + ___ = 100" → Answer: 75
- "45 + ___ = 100" → Answer: 55
- "70 + ___ = 100" → Answer: 30
... infinite possibilities!
```

---

## Question Template Structure

```typescript
interface QuestionTemplate {
  id: string;
  category: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  
  // Template with placeholders
  questionTemplate: string;  // "{num1} + ___ = {num2}"
  
  // Variable definitions
  variables: {
    [key: string]: {
      min: number;
      max: number;
      step?: number;  // Optional: e.g., multiples of 5
      exclude?: number[];  // Optional: exclude certain values
    }
  };
  
  // Answer formula (JavaScript expression)
  answerFormula: string;  // "num2 - num1"
  
  // Options generation
  optionsFormula?: string[];  // Generate wrong answers
  
  // Method steps (can use variables)
  methodStepsTemplate: MethodStep[];
  
  questionType: "mcq" | "short_answer";
  estimatedTimeSeconds: number;
}
```

---

## Example Templates

### 1. Bonds to 100
```typescript
{
  questionTemplate: "{num1} + ___ = 100. What number goes in the blank?",
  variables: {
    num1: { min: 10, max: 90, step: 5 }
  },
  answerFormula: "100 - num1",
  optionsFormula: [
    "100 - num1",           // Correct
    "100 - num1 + 10",      // Wrong option 1
    "100 - num1 - 10",      // Wrong option 2
    "num1"                  // Wrong option 3
  ],
  methodStepsTemplate: [
    { step: "1", detail: "We need {num1} + something = 100" },
    { step: "2", detail: "Count up from {num1} to 100" },
    { step: "3", detail: "The answer is {answer}" }
  ]
}
```

### 2. Multiplication
```typescript
{
  questionTemplate: "What is {num1} × {num2}?",
  variables: {
    num1: { min: 2, max: 10 },
    num2: { min: 2, max: 10 }
  },
  answerFormula: "num1 * num2",
  optionsFormula: [
    "num1 * num2",              // Correct
    "num1 * num2 + num1",       // Common mistake
    "num1 * num2 - num1",       // Off by one table
    "num1 + num2"               // Addition instead
  ]
}
```

### 3. Time
```typescript
{
  questionTemplate: "What time is {hours} hours and {minutes} minutes after {startTime}?",
  variables: {
    hours: { min: 1, max: 5 },
    minutes: { min: 0, max: 55, step: 5 },
    startTime: { min: 1, max: 9 }  // 1:00 to 9:00
  },
  answerFormula: "calculateTime(startTime, hours, minutes)"
}
```

### 4. Fractions
```typescript
{
  questionTemplate: "{numerator}/{denominator} + ?/{denominator} = 1",
  variables: {
    denominator: { min: 3, max: 10 },
    numerator: { min: 1, max: "denominator - 1" }  // Must be less than denominator
  },
  answerFormula: "denominator - numerator"
}
```

---

## Implementation Plan

### Phase 1: Database Schema (Optional)
Add template fields to questions table:
```sql
ALTER TABLE questions ADD COLUMN is_template BOOLEAN DEFAULT FALSE;
ALTER TABLE questions ADD COLUMN variables JSONB;
ALTER TABLE questions ADD COLUMN answer_formula TEXT;
```

### Phase 2: Template Generator
Create functions to:
- Parse template strings
- Generate random values within ranges
- Substitute variables into templates
- Calculate answers dynamically
- Generate method steps dynamically

### Phase 3: API Integration
Update `/api/quiz/session` to:
- Fetch template questions
- Generate random variations on-the-fly
- Return fully formed questions to frontend

### Phase 4: Question Templates Library
Create templates for common patterns:
- Addition/Subtraction with various ranges
- Multiplication tables
- Fractions with different denominators
- Time calculations
- Money problems
- Word problems with variable numbers

---

## Benefits

✅ **Infinite Questions**: Never see the same question twice
✅ **Consistent Difficulty**: Control ranges to maintain difficulty level
✅ **Small Database**: Store templates, not individual questions
✅ **Easy Updates**: Change one template, affects all variations
✅ **Targeted Practice**: Focus on specific number ranges
✅ **Progressive Difficulty**: Start easy, gradually increase ranges

---

## Next Steps

1. Build the template generator system
2. Convert existing questions to templates
3. Test with a few categories (Addition, Multiplication)
4. Expand to all categories
5. Add more sophisticated templates (word problems, multi-step)

Ready to implement? 🚀
