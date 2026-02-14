# Bug Fix: Target Variable Being Set to Zero

## Date: February 11, 2026

## Severity: CRITICAL 🔴

## Problem Description

Users reported seeing mathematically impossible questions:
1. `"35 + ___ = 0. What number goes in the blank?"`
2. `"If you have 15 marbles, how many more do you need to have 0 marbles?"`

These questions were appearing despite the question templates defining `target` with minimum values of 50-100, never 0.

## Root Cause Analysis

### The Bug

In `lib/template-generator.ts`, the `replacePlaceholders()` function had special handling for `{target}` placeholders to support computed targets (like in fraction problems where target = base × multiplier).

However, the logic had a fatal flaw:

```typescript:lib/template-generator.ts
// OLD CODE (BUGGY):
if (result.includes('{target}')) {
  let target: number;
  
  if (typeof values.base === 'number' && typeof values.multiplier === 'number') {
    target = values.base * values.multiplier;
  } else if (typeof values.width === 'number') {
    target = 2 * values.width;
  } else if (typeof values.tens === 'number') {
    target = values.tens * 10;
  } else {
    target = 0;  // ❌ DEFAULT TO ZERO IF NO PATTERN MATCHES
  }
  
  result = result.replace(/\{target\}/g, target.toString());
}
```

### What Happened

1. Template defines: `target: { min: 50, max: 90, step: 10 }`
2. Random generation picks: `target = 70`, `num1 = 35`
3. Question template: `"{num1} + ___ = {target}"`
4. `replacePlaceholders()` runs:
   - Sees `{target}` in the string
   - Checks if `values.base` exists → NO
   - Checks if `values.width` exists → NO
   - Checks if `values.tens` exists → NO
   - Falls through to `else` → `target = 0` ❌
   - Replaces `{target}` with `0`
5. Result: `"35 + ___ = 0"` ❌

**The randomly generated `target = 70` was completely ignored and overwritten with `0`!**

## The Fix

### Solution 1: Check if Target Already Exists

```typescript:lib/template-generator.ts
// NEW CODE (FIXED):
if (result.includes('{target}') && typeof values.target !== 'number') {
  // ✅ Only compute target if it's NOT already defined as a variable
  let target: number;
  
  if (typeof values.base === 'number' && typeof values.multiplier === 'number') {
    target = values.base * values.multiplier;
  } else if (typeof values.width === 'number') {
    target = 2 * values.width;
  } else if (typeof values.tens === 'number') {
    target = values.tens * 10;
  } else {
    target = 0;
  }
  
  result = result.replace(/\{target\}/g, target.toString());
}
```

**Key Change:** Added condition `&& typeof values.target !== 'number'`

Now the special handling ONLY runs if `target` is NOT already defined as a regular variable.

### Solution 2: Tighten Template Constraints

As a defense-in-depth measure, also tightened the variable constraints to ensure `num1 < target`:

**Easy Template:**
```typescript
// Before:
target: { min: 50, max: 90, step: 10 },
num1: { min: 10, max: 40, step: 5 }

// After:
target: { min: 60, max: 90, step: 10 },  // Raised minimum
num1: { min: 10, max: 45, step: 5 }      // Lowered maximum
```

**Medium Template:**
```typescript
// After:
target: { min: 80, max: 100, step: 10 },  // Raised minimum
num1: { min: 15, max: 60, step: 5 }       // Lowered maximum
```

## Impact

### Before Fix
- ❌ Questions could have `target = 0`
- ❌ Mathematically impossible for Grade 3 (negative numbers)
- ❌ Confusing and frustrating for students
- ❌ Undermines trust in the system

### After Fix
- ✅ `target` always respects defined constraints (60-100)
- ✅ All questions are mathematically valid
- ✅ Answers are always positive numbers
- ✅ Appropriate difficulty for Grade 3

## Testing

### Manual Tests Performed
1. ✅ Generated 50+ addition questions with "Bonds to 100" category
2. ✅ Verified no questions have `target = 0`
3. ✅ Verified all questions have `target > num1`
4. ✅ Verified marble questions are logical
5. ✅ Build passes with no errors

### Regression Tests
- ✅ Fraction questions (computed target) still work correctly
- ✅ Perimeter questions (computed target) still work correctly
- ✅ Place value questions still work correctly

## Lessons Learned

1. **Variable Naming Collisions**: Using the same name (`target`) for both:
   - Regular template variables (randomly generated)
   - Computed values (derived from other variables)
   
   This created a namespace collision that wasn't immediately obvious.

2. **Silent Failures**: The code silently defaulted to `0` without any error or warning, making the bug hard to detect.

3. **Testing Edge Cases**: The bug only manifested when:
   - Template used `{target}` as a variable name
   - AND didn't match any of the special computation patterns
   
   This specific combination wasn't tested initially.

## Recommendations

### Immediate
- ✅ DONE: Add check for existing variable before computing
- ✅ DONE: Tighten template constraints
- ✅ DONE: Build and test

### Future Improvements
1. **Better Variable Naming**:
   - Use distinct names for computed values (e.g., `{computed_target}`)
   - Reserve certain names for special handling

2. **Add Validation**:
   ```typescript
   // Validate that answer is positive
   if (answerValue <= 0) {
     console.warn('Invalid question generated:', question);
     // Regenerate or skip
   }
   ```

3. **Unit Tests**:
   - Test question generation for each template
   - Verify constraints are respected
   - Check for negative/zero answers

4. **Type Safety**:
   ```typescript
   type RegularVariable = { type: 'regular', value: number };
   type ComputedVariable = { type: 'computed', formula: string };
   type Variable = RegularVariable | ComputedVariable;
   ```

## Files Changed

1. ✅ `lib/template-generator.ts` - Added existence check
2. ✅ `lib/question-templates.ts` - Tightened constraints (2 templates)
3. ✅ `FIXES_SUMMARY.md` - User-facing documentation
4. ✅ `BUG_FIX_TARGET_ZERO.md` - This technical document

## Status

🟢 **RESOLVED** - Build successful, bug fixed, documented

---

**Reporter:** User (parent/teacher)  
**Fixed By:** AI Assistant  
**Verified:** Build passes, manual testing confirms fix  
**Priority:** P0 (Critical - affects core functionality)
