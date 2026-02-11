import { Question } from '@/types/question';
import { getCategoryForTopic } from './category-mapping';

/**
 * Question Generator Module
 * Generates questions for all math topics suitable for Grade 2-3 students
 */

export const generateQuestions = (): Question[] => {
  const allQuestionsWithoutCategory: Omit<Question, 'category'>[] = [
    ...generateBondsTo100(),
    ...generateBondsTo10And20AndDoubles(),
    ...generateAddSubtract1Digit(),
    ...generate3DigitNumbers(),
    ...generateMultiplesOf10(),
    ...generateMultiplyDivide(),
    ...generateDoublingHalving(),
    ...generateUnitsOfTime(),
    ...generateTellingTime(),
    ...generate3DShapes(),
    ...generateNumberLines(),
    ...generateRounding(),
    ...generateSubtractByCountingUp(),
    ...generateDoublingHalvingPartitioning(),
    ...generateFractions(),
    ...generatePlaceValueMoney(),
    ...generateMaking100(),
    ...generateAddSubtractPartitioning(),
    ...generateMeasuringLength(),
    ...generateMeasuringCapacity(),
    ...generateNumbersOnNumberLine(),
    ...generateMoreSubtractionCountingUp(),
    ...generateTimesTables(),
    ...generateDivisionWithRemainders(),
    // New topics from first PDF
    ...generateGridMethodMultiplication(),
    ...generatePerimeter(),
    ...generateOrderingNumbers(),
    ...generateComparingFractions(),
    ...generateIdentifyingMultiples(),
    // New topics from additional PDFs (2020-2024)
    ...generateNumberPatterns(),
    ...generateNumberWords(),
    ...generateNumberBeforeAfter(),
    ...generateOddEven(),
    ...generateMiddleNumbers(),
    ...generateMoneyConversion(),
    ...generateMakingChange(),
    ...generateWordProblems(),
    ...generateNumberPairs(),
    ...generateCompletingFractions(),
  ];

  // Add category to each question based on its topic
  const allQuestions: Question[] = allQuestionsWithoutCategory.map(q => ({
    ...q,
    category: getCategoryForTopic(q.topic)
  }));

  return allQuestions;
};

// Topic 1: Bonds to 100
function generateBondsTo100(): Omit<Question, 'category'>[] {
  return [
    {
      subject: "Mathematics",
      topic: "Bonds to 100",
      difficulty: "Easy",
      question: "What number do you add to 40 to make 100?",
      options: ["50", "60", "70", "80"],
      correctAnswer: "60",
      methodSteps: [
        { step: "1", detail: "We need to find what adds to 40 to make 100" },
        { step: "2", detail: "Think: 40 + ? = 100" },
        { step: "3", detail: "Count up from 40 to 100: that's 60" },
        { step: "4", detail: "So 40 + 60 = 100" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 100",
      difficulty: "Easy",
      question: "25 + ___ = 100. What number goes in the blank?",
      options: ["65", "70", "75", "80"],
      correctAnswer: "75",
      methodSteps: [
        { step: "1", detail: "We need 25 + something = 100" },
        { step: "2", detail: "Count up from 25 to 100" },
        { step: "3", detail: "25 to 100 is 75" },
        { step: "4", detail: "Check: 25 + 75 = 100 ✓" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 100",
      difficulty: "Medium",
      question: "If you have 37 marbles, how many more do you need to have 100 marbles?",
      options: ["53", "63", "73", "83"],
      correctAnswer: "63",
      methodSteps: [
        { step: "1", detail: "We have 37 marbles and want 100 total" },
        { step: "2", detail: "We need to find: 37 + ? = 100" },
        { step: "3", detail: "First, 37 + 3 = 40" },
        { step: "4", detail: "Then, 40 + 60 = 100" },
        { step: "5", detail: "So we need 3 + 60 = 63 more marbles" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 100",
      difficulty: "Medium",
      question: "82 + ___ = 100",
      options: ["12", "18", "22", "28"],
      correctAnswer: "18",
      methodSteps: [
        { step: "1", detail: "Find what adds to 82 to make 100" },
        { step: "2", detail: "82 + ? = 100" },
        { step: "3", detail: "Count up: 82 to 90 is 8" },
        { step: "4", detail: "Then 90 to 100 is 10" },
        { step: "5", detail: "Total: 8 + 10 = 18" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 100",
      difficulty: "Hard",
      question: "What is the missing number? 100 - ___ = 47",
      options: ["43", "47", "53", "57"],
      correctAnswer: "53",
      methodSteps: [
        { step: "1", detail: "100 - ? = 47 means we took away some amount" },
        { step: "2", detail: "This is the same as asking: 47 + ? = 100" },
        { step: "3", detail: "Count up from 47: 47 to 50 is 3" },
        { step: "4", detail: "50 to 100 is 50" },
        { step: "5", detail: "Total: 3 + 50 = 53" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 2: Bonds to 10 and 20, and Doubles
function generateBondsTo10And20AndDoubles(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Bonds to 10 and 20 and Doubles",
      difficulty: "Easy",
      question: "What is 7 + 3?",
      options: ["9", "10", "11", "12"],
      correctAnswer: "10",
      methodSteps: [
        { step: "1", detail: "Keep the bigger number (7) in your head" },
        { step: "2", detail: "Count up 3 times: 8, 9, 10" },
        { step: "3", detail: "7 + 3 = 10" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 10 and 20 and Doubles",
      difficulty: "Easy",
      question: "Double 6 is...",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
      methodSteps: [
        { step: "1", detail: "Double means adding a number to itself" },
        { step: "2", detail: "Double 6 = 6 + 6" },
        { step: "3", detail: "6 + 6 = 12" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 10 and 20 and Doubles",
      difficulty: "Medium",
      question: "12 + ___ = 20. What number goes in the blank?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      methodSteps: [
        { step: "1", detail: "We need to find 12 + ? = 20" },
        { step: "2", detail: "Count up from 12 to 20" },
        { step: "3", detail: "12 to 20 is 8 steps" },
        { step: "4", detail: "So 12 + 8 = 20" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 10 and 20 and Doubles",
      difficulty: "Medium",
      question: "What is double 9?",
      options: ["16", "17", "18", "19"],
      correctAnswer: "18",
      methodSteps: [
        { step: "1", detail: "Double 9 means 9 + 9" },
        { step: "2", detail: "Break it down: 9 = 5 + 4" },
        { step: "3", detail: "So 9 + 9 = (5+4) + (5+4)" },
        { step: "4", detail: "= 10 + 8 = 18" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Bonds to 10 and 20 and Doubles",
      difficulty: "Hard",
      question: "If 15 + 5 = 20, what is 14 + 5?",
      options: ["18", "19", "20", "21"],
      correctAnswer: "19",
      methodSteps: [
        { step: "1", detail: "We know that 15 + 5 = 20" },
        { step: "2", detail: "14 is one less than 15" },
        { step: "3", detail: "So 14 + 5 will be one less than 20" },
        { step: "4", detail: "20 - 1 = 19" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    }
  ];
}

// Topic 3: Adding and Subtracting 1-Digit Numbers
function generateAddSubtract1Digit(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting 1-Digit Numbers",
      difficulty: "Easy",
      question: "What is 5 + 4?",
      options: ["8", "9", "10", "11"],
      correctAnswer: "9",
      methodSteps: [
        { step: "1", detail: "Start with 5" },
        { step: "2", detail: "Count up 4 more: 6, 7, 8, 9" },
        { step: "3", detail: "5 + 4 = 9" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting 1-Digit Numbers",
      difficulty: "Easy",
      question: "What is 9 - 3?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "Start with 9" },
        { step: "2", detail: "Count back 3: 8, 7, 6" },
        { step: "3", detail: "9 - 3 = 6" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting 1-Digit Numbers",
      difficulty: "Medium",
      question: "8 + 7 = ?",
      options: ["14", "15", "16", "17"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "We need to add 8 + 7" },
        { step: "2", detail: "Split 7 into 2 + 5" },
        { step: "3", detail: "8 + 2 = 10" },
        { step: "4", detail: "10 + 5 = 15" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting 1-Digit Numbers",
      difficulty: "Medium",
      question: "12 - 5 = ?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "7",
      methodSteps: [
        { step: "1", detail: "Start with 12" },
        { step: "2", detail: "First subtract 2 to get to 10" },
        { step: "3", detail: "We still need to subtract 3 more (5-2=3)" },
        { step: "4", detail: "10 - 3 = 7" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting 1-Digit Numbers",
      difficulty: "Hard",
      question: "If 6 + 8 = 14, what is 14 - 8?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "We know 6 + 8 = 14" },
        { step: "2", detail: "Subtraction is the opposite of addition" },
        { step: "3", detail: "If 6 + 8 = 14, then 14 - 8 = 6" },
        { step: "4", detail: "We can check: 6 + 8 = 14 ✓" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    }
  ];
}

// Topic 4: 3-Digit Numbers
function generate3DigitNumbers(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "3-Digit Numbers",
      difficulty: "Easy",
      question: "In the number 253, what digit is in the tens place?",
      options: ["2", "3", "5", "253"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "The number is 253" },
        { step: "2", detail: "The hundreds place is 2" },
        { step: "3", detail: "The tens place is 5" },
        { step: "4", detail: "The ones place is 3" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "3-Digit Numbers",
      difficulty: "Easy",
      question: "What is the value of 7 in the number 472?",
      options: ["7", "70", "700", "7000"],
      correctAnswer: "70",
      methodSteps: [
        { step: "1", detail: "Look at the number 472" },
        { step: "2", detail: "The 7 is in the tens place" },
        { step: "3", detail: "7 in the tens place means 7 tens" },
        { step: "4", detail: "7 tens = 70" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "3-Digit Numbers",
      difficulty: "Medium",
      question: "Which number is greater: 345 or 354?",
      options: ["345", "354", "They are equal", "Cannot tell"],
      correctAnswer: "354",
      methodSteps: [
        { step: "1", detail: "Compare hundreds: both have 3 hundreds" },
        { step: "2", detail: "Compare tens: 345 has 4 tens, 354 has 5 tens" },
        { step: "3", detail: "5 tens is more than 4 tens" },
        { step: "4", detail: "So 354 is greater than 345" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "3-Digit Numbers",
      difficulty: "Medium",
      question: "What number is 10 more than 396?",
      options: ["386", "397", "406", "496"],
      correctAnswer: "406",
      methodSteps: [
        { step: "1", detail: "Start with 396" },
        { step: "2", detail: "Adding 10 means adding 1 to the tens place" },
        { step: "3", detail: "9 tens + 1 ten = 10 tens = 1 hundred" },
        { step: "4", detail: "396 + 10 = 406" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "3-Digit Numbers",
      difficulty: "Hard",
      question: "How many hundreds, tens, and ones are in 678?",
      options: ["6 hundreds, 7 tens, 8 ones", "6 tens, 7 ones, 8 hundreds", "7 hundreds, 6 tens, 8 ones", "8 hundreds, 7 tens, 6 ones"],
      correctAnswer: "6 hundreds, 7 tens, 8 ones",
      methodSteps: [
        { step: "1", detail: "Look at each position in 678" },
        { step: "2", detail: "First digit (6) is in hundreds place = 6 hundreds" },
        { step: "3", detail: "Second digit (7) is in tens place = 7 tens" },
        { step: "4", detail: "Third digit (8) is in ones place = 8 ones" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 5: Adding or Subtracting Multiples of 10 and Near Multiples
function generateMultiplesOf10(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Adding or Subtracting Multiples of 10",
      difficulty: "Easy",
      question: "What is 45 + 20?",
      options: ["55", "60", "65", "70"],
      correctAnswer: "65",
      methodSteps: [
        { step: "1", detail: "We're adding 20 to 45" },
        { step: "2", detail: "45 has 4 tens and 5 ones" },
        { step: "3", detail: "Add 2 tens: 4 tens + 2 tens = 6 tens" },
        { step: "4", detail: "6 tens and 5 ones = 65" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding or Subtracting Multiples of 10",
      difficulty: "Easy",
      question: "What is 78 - 30?",
      options: ["38", "48", "58", "68"],
      correctAnswer: "48",
      methodSteps: [
        { step: "1", detail: "We're subtracting 30 from 78" },
        { step: "2", detail: "78 has 7 tens and 8 ones" },
        { step: "3", detail: "Subtract 3 tens: 7 tens - 3 tens = 4 tens" },
        { step: "4", detail: "4 tens and 8 ones = 48" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding or Subtracting Multiples of 10",
      difficulty: "Medium",
      question: "What is 54 + 39?",
      options: ["83", "87", "93", "97"],
      correctAnswer: "93",
      methodSteps: [
        { step: "1", detail: "Split: 54 = 50 + 4, and 39 = 30 + 9" },
        { step: "2", detail: "Add the ONES: 4 + 9 = 13 (that's 1 ten and 3 ones)" },
        { step: "3", detail: "Add the TENS: 50 + 30 = 80, plus the extra 1 ten = 90" },
        { step: "4", detail: "Put together: 90 + 3 = 93" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Adding or Subtracting Multiples of 10",
      difficulty: "Medium",
      question: "What is 82 - 29?",
      options: ["51", "53", "55", "57"],
      correctAnswer: "53",
      methodSteps: [
        { step: "1", detail: "Split: 82 = 80 + 2, and 29 = 20 + 9" },
        { step: "2", detail: "Subtract TENS: 80 - 20 = 60" },
        { step: "3", detail: "Subtract ONES: 2 - 9... we need to borrow! Take 1 ten from 60" },
        { step: "4", detail: "Now we have 50 + 12. Then 12 - 9 = 3" },
        { step: "5", detail: "Answer: 50 + 3 = 53" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Adding or Subtracting Multiples of 10",
      difficulty: "Hard",
      question: "123 + 48 = ?",
      options: ["161", "165", "171", "175"],
      correctAnswer: "171",
      methodSteps: [
        { step: "1", detail: "Split the numbers: 123 = 100 + 20 + 3, and 48 = 40 + 8" },
        { step: "2", detail: "Add the ONES: 3 + 8 = 11 (that's 1 ten and 1 one)" },
        { step: "3", detail: "Add the TENS: 20 + 40 = 60, plus the extra 1 ten = 70" },
        { step: "4", detail: "Add the HUNDREDS: 100" },
        { step: "5", detail: "Put it together: 100 + 70 + 1 = 171" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 6: Multiplying and Dividing by 3, 4, 5, and 10
function generateMultiplyDivide(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Multiplying and Dividing by 3, 4, 5 and 10",
      difficulty: "Easy",
      question: "What is 5 × 3?",
      options: ["10", "12", "15", "18"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "5 × 3 means 5 groups of 3" },
        { step: "2", detail: "Or 3 + 3 + 3 + 3 + 3" },
        { step: "3", detail: "Count by 3s: 3, 6, 9, 12, 15" },
        { step: "4", detail: "5 × 3 = 15" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Multiplying and Dividing by 3, 4, 5 and 10",
      difficulty: "Easy",
      question: "What is 20 ÷ 5?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      methodSteps: [
        { step: "1", detail: "20 ÷ 5 means how many 5s are in 20?" },
        { step: "2", detail: "Count by 5s: 5, 10, 15, 20" },
        { step: "3", detail: "We counted 4 times" },
        { step: "4", detail: "So 20 ÷ 5 = 4" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Multiplying and Dividing by 3, 4, 5 and 10",
      difficulty: "Medium",
      question: "What is 4 × 7?",
      options: ["24", "26", "28", "32"],
      correctAnswer: "28",
      methodSteps: [
        { step: "1", detail: "4 × 7 means 7 groups of 4" },
        { step: "2", detail: "Count by 4s seven times: 4, 8, 12, 16, 20, 24, 28" },
        { step: "3", detail: "Or think: 4 × 5 = 20, and 4 × 2 = 8" },
        { step: "4", detail: "20 + 8 = 28" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Multiplying and Dividing by 3, 4, 5 and 10",
      difficulty: "Medium",
      question: "30 ÷ 3 = ?",
      options: ["8", "9", "10", "11"],
      correctAnswer: "10",
      methodSteps: [
        { step: "1", detail: "How many 3s are in 30?" },
        { step: "2", detail: "Count by 3s: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30" },
        { step: "3", detail: "We counted 10 times" },
        { step: "4", detail: "30 ÷ 3 = 10" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Multiplying and Dividing by 3, 4, 5 and 10",
      difficulty: "Hard",
      question: "If 6 × 10 = 60, what is 60 ÷ 10?",
      options: ["4", "5", "6", "10"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "We know 6 × 10 = 60" },
        { step: "2", detail: "Division is the opposite of multiplication" },
        { step: "3", detail: "If 6 × 10 = 60, then 60 ÷ 10 = 6" },
        { step: "4", detail: "Check: 6 × 10 = 60 ✓" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    }
  ];
}

// Topic 7: Doubling and Halving Odd and Even Numbers
function generateDoublingHalving(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Odd and Even Numbers",
      difficulty: "Easy",
      question: "What is double 8?",
      options: ["14", "16", "18", "20"],
      correctAnswer: "16",
      methodSteps: [
        { step: "1", detail: "Double means × 2 or adding the number to itself" },
        { step: "2", detail: "Double 8 = 8 + 8" },
        { step: "3", detail: "8 + 8 = 16" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Odd and Even Numbers",
      difficulty: "Easy",
      question: "What is half of 14?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "7",
      methodSteps: [
        { step: "1", detail: "Half means divide by 2" },
        { step: "2", detail: "Half of 14 = 14 ÷ 2" },
        { step: "3", detail: "14 ÷ 2 = 7" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Odd and Even Numbers",
      difficulty: "Medium",
      question: "What is double 15?",
      options: ["25", "28", "30", "32"],
      correctAnswer: "30",
      methodSteps: [
        { step: "1", detail: "Double 15 = 15 + 15" },
        { step: "2", detail: "Break it down: 15 = 10 + 5" },
        { step: "3", detail: "Double 10 = 20, double 5 = 10" },
        { step: "4", detail: "20 + 10 = 30" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Odd and Even Numbers",
      difficulty: "Medium",
      question: "What is half of 26?",
      options: ["11", "12", "13", "14"],
      correctAnswer: "13",
      methodSteps: [
        { step: "1", detail: "Half of 26 = 26 ÷ 2" },
        { step: "2", detail: "Break down: 26 = 20 + 6" },
        { step: "3", detail: "Half of 20 = 10, half of 6 = 3" },
        { step: "4", detail: "10 + 3 = 13" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Odd and Even Numbers",
      difficulty: "Hard",
      question: "Double 23 is the same as...",
      options: ["40", "42", "44", "46"],
      correctAnswer: "46",
      methodSteps: [
        { step: "1", detail: "Double 23 = 23 + 23" },
        { step: "2", detail: "Split 23 into 20 + 3" },
        { step: "3", detail: "Double the tens: 20 + 20 = 40" },
        { step: "4", detail: "Double the ones: 3 + 3 = 6" },
        { step: "5", detail: "Put together: 40 + 6 = 46" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 8: Units of Time
function generateUnitsOfTime(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Units of Time",
      difficulty: "Easy",
      question: "How many minutes are in 1 hour?",
      options: ["30", "60", "90", "120"],
      correctAnswer: "60",
      methodSteps: [
        { step: "1", detail: "An hour is made up of minutes" },
        { step: "2", detail: "1 hour = 60 minutes" },
        { step: "3", detail: "This is always the same!" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Units of Time",
      difficulty: "Easy",
      question: "How many days are in 1 week?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      methodSteps: [
        { step: "1", detail: "Count the days: Monday, Tuesday, Wednesday..." },
        { step: "2", detail: "Thursday, Friday, Saturday, Sunday" },
        { step: "3", detail: "That's 7 days in a week" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Units of Time",
      difficulty: "Medium",
      question: "How many minutes are in 2 hours?",
      options: ["60", "90", "120", "150"],
      correctAnswer: "120",
      methodSteps: [
        { step: "1", detail: "1 hour = 60 minutes" },
        { step: "2", detail: "For 2 hours, we need 2 × 60" },
        { step: "3", detail: "60 + 60 = 120 minutes" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Units of Time",
      difficulty: "Medium",
      question: "If school starts at 9:00 and ends at 3:00, how many hours is that?",
      options: ["4 hours", "5 hours", "6 hours", "7 hours"],
      correctAnswer: "6 hours",
      methodSteps: [
        { step: "1", detail: "Count from 9:00 to 3:00" },
        { step: "2", detail: "9 to 12 is 3 hours" },
        { step: "3", detail: "12 to 3 is 3 more hours" },
        { step: "4", detail: "3 + 3 = 6 hours total" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Units of Time",
      difficulty: "Hard",
      question: "How many minutes are in half an hour plus 15 minutes?",
      options: ["30", "35", "40", "45"],
      correctAnswer: "45",
      methodSteps: [
        { step: "1", detail: "Half an hour = 30 minutes" },
        { step: "2", detail: "We need 30 minutes + 15 minutes" },
        { step: "3", detail: "30 + 15 = 45 minutes" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 9: Telling the Time
function generateTellingTime(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Telling the Time",
      difficulty: "Easy",
      question: "What time is shown when the big hand is on 12 and the small hand is on 3?",
      options: ["12:03", "3:00", "3:12", "12:15"],
      correctAnswer: "3:00",
      methodSteps: [
        { step: "1", detail: "The small hand shows the hour" },
        { step: "2", detail: "Small hand on 3 means it's 3 o'clock" },
        { step: "3", detail: "Big hand on 12 means exactly on the hour" },
        { step: "4", detail: "The time is 3:00" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Telling the Time",
      difficulty: "Easy",
      question: "When the big hand is on 6, how many minutes past the hour is it?",
      options: ["6 minutes", "15 minutes", "30 minutes", "45 minutes"],
      correctAnswer: "30 minutes",
      methodSteps: [
        { step: "1", detail: "The big hand shows minutes" },
        { step: "2", detail: "When it points to 6, it's halfway around" },
        { step: "3", detail: "Halfway = 30 minutes" },
        { step: "4", detail: "We also call this 'half past'" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Telling the Time",
      difficulty: "Medium",
      question: "What time is 15 minutes after 2:00?",
      options: ["2:05", "2:15", "2:30", "2:45"],
      correctAnswer: "2:15",
      methodSteps: [
        { step: "1", detail: "Start at 2:00" },
        { step: "2", detail: "Add 15 minutes" },
        { step: "3", detail: "2:00 + 15 minutes = 2:15" },
        { step: "4", detail: "This is also called 'quarter past 2'" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Telling the Time",
      difficulty: "Medium",
      question: "It's 4:45. How many minutes until 5:00?",
      options: ["10", "15", "20", "25"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "We're at 4:45" },
        { step: "2", detail: "We want to reach 5:00" },
        { step: "3", detail: "Count up: 45 to 60 minutes" },
        { step: "4", detail: "60 - 45 = 15 minutes" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Telling the Time",
      difficulty: "Hard",
      question: "If the movie starts at 1:30 and lasts 2 hours, what time does it end?",
      options: ["3:00", "3:30", "4:00", "4:30"],
      correctAnswer: "3:30",
      methodSteps: [
        { step: "1", detail: "Movie starts at 1:30" },
        { step: "2", detail: "It lasts 2 hours" },
        { step: "3", detail: "1:30 + 2 hours" },
        { step: "4", detail: "1:30 + 2:00 = 3:30" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 10: 3D Shapes
function generate3DShapes(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "3D Shapes",
      difficulty: "Easy",
      question: "How many faces does a cube have?",
      options: ["4", "5", "6", "8"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "A cube is like a box or dice" },
        { step: "2", detail: "Count all the flat surfaces (faces)" },
        { step: "3", detail: "Top, bottom, front, back, left, right" },
        { step: "4", detail: "That's 6 faces total" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "3D Shapes",
      difficulty: "Easy",
      question: "Which 3D shape looks like a ball?",
      options: ["Cube", "Cylinder", "Sphere", "Cone"],
      correctAnswer: "Sphere",
      methodSteps: [
        { step: "1", detail: "Think of objects shaped like a ball" },
        { step: "2", detail: "A sphere is perfectly round all around" },
        { step: "3", detail: "Examples: basketball, globe, orange" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "3D Shapes",
      difficulty: "Medium",
      question: "How many edges does a cuboid (rectangular box) have?",
      options: ["8", "10", "12", "14"],
      correctAnswer: "12",
      methodSteps: [
        { step: "1", detail: "An edge is where two faces meet" },
        { step: "2", detail: "A cuboid is like a shoebox" },
        { step: "3", detail: "Count: 4 edges on top, 4 on bottom, 4 down the sides" },
        { step: "4", detail: "4 + 4 + 4 = 12 edges" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "3D Shapes",
      difficulty: "Medium",
      question: "What shape is a soup can?",
      options: ["Cube", "Cylinder", "Cone", "Pyramid"],
      correctAnswer: "Cylinder",
      methodSteps: [
        { step: "1", detail: "Look at a soup can" },
        { step: "2", detail: "It has circular ends (top and bottom)" },
        { step: "3", detail: "The sides are curved" },
        { step: "4", detail: "This shape is called a cylinder" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "3D Shapes",
      difficulty: "Hard",
      question: "How many vertices (corners) does a triangular pyramid have?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      methodSteps: [
        { step: "1", detail: "A triangular pyramid has a triangle base" },
        { step: "2", detail: "The base has 3 corners" },
        { step: "3", detail: "There's 1 more corner at the top" },
        { step: "4", detail: "3 + 1 = 4 vertices total" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 11: Number Lines
function generateNumberLines(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Number Lines",
      difficulty: "Easy",
      question: "On a number line, which number comes between 5 and 7?",
      options: ["4", "5", "6", "8"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "Numbers on a line go in order" },
        { step: "2", detail: "5, then ?, then 7" },
        { step: "3", detail: "The number after 5 is 6" },
        { step: "4", detail: "6 comes between 5 and 7" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Number Lines",
      difficulty: "Easy",
      question: "If you start at 10 and jump forward 5 on a number line, where do you land?",
      options: ["5", "10", "15", "20"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "Start at 10 on the number line" },
        { step: "2", detail: "Jump forward means add" },
        { step: "3", detail: "10 + 5 = 15" },
        { step: "4", detail: "You land on 15" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Number Lines",
      difficulty: "Medium",
      question: "On a number line from 0 to 20, what number is halfway?",
      options: ["5", "8", "10", "12"],
      correctAnswer: "10",
      methodSteps: [
        { step: "1", detail: "We need to find the middle of 0 and 20" },
        { step: "2", detail: "Halfway means half of 20" },
        { step: "3", detail: "20 ÷ 2 = 10" },
        { step: "4", detail: "10 is exactly in the middle" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Number Lines",
      difficulty: "Medium",
      question: "If you start at 25 and jump backward 8 on a number line, where are you?",
      options: ["15", "17", "19", "33"],
      correctAnswer: "17",
      methodSteps: [
        { step: "1", detail: "Start at 25" },
        { step: "2", detail: "Jump backward means subtract" },
        { step: "3", detail: "25 - 8 = ?" },
        { step: "4", detail: "25 - 8 = 17" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Number Lines",
      difficulty: "Hard",
      question: "On a number line, you're at 42. You jump forward 10, then back 5. Where are you now?",
      options: ["37", "42", "47", "52"],
      correctAnswer: "47",
      methodSteps: [
        { step: "1", detail: "Start at 42" },
        { step: "2", detail: "Jump forward 10: 42 + 10 = 52" },
        { step: "3", detail: "Now jump back 5: 52 - 5 = 47" },
        { step: "4", detail: "You're at 47" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 12: Rounding to the Nearest 10 or 100
function generateRounding(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Rounding to the Nearest 10 or 100",
      difficulty: "Easy",
      question: "Round 23 to the nearest 10.",
      options: ["10", "20", "30", "40"],
      correctAnswer: "20",
      methodSteps: [
        { step: "1", detail: "23 is between 20 and 30" },
        { step: "2", detail: "Which is it closer to?" },
        { step: "3", detail: "23 is closer to 20 than to 30" },
        { step: "4", detail: "23 rounds down to 20" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Rounding to the Nearest 10 or 100",
      difficulty: "Easy",
      question: "Round 47 to the nearest 10.",
      options: ["40", "45", "50", "60"],
      correctAnswer: "50",
      methodSteps: [
        { step: "1", detail: "47 is between 40 and 50" },
        { step: "2", detail: "Is it closer to 40 or 50?" },
        { step: "3", detail: "47 is closer to 50" },
        { step: "4", detail: "47 rounds up to 50" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Rounding to the Nearest 10 or 100",
      difficulty: "Medium",
      question: "Round 235 to the nearest 100.",
      options: ["100", "200", "230", "300"],
      correctAnswer: "200",
      methodSteps: [
        { step: "1", detail: "235 is between 200 and 300" },
        { step: "2", detail: "Look at the tens digit: 3" },
        { step: "3", detail: "Less than 5 means round down" },
        { step: "4", detail: "235 rounds to 200" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Rounding to the Nearest 10 or 100",
      difficulty: "Medium",
      question: "Round 382 to the nearest 100.",
      options: ["300", "350", "380", "400"],
      correctAnswer: "400",
      methodSteps: [
        { step: "1", detail: "382 is between 300 and 400" },
        { step: "2", detail: "Look at the tens digit: 8" },
        { step: "3", detail: "8 is more than 5, so round up" },
        { step: "4", detail: "382 rounds to 400" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Rounding to the Nearest 10 or 100",
      difficulty: "Hard",
      question: "Which number rounds to 80 when rounded to the nearest 10?",
      options: ["72", "74", "84", "89"],
      correctAnswer: "84",
      methodSteps: [
        { step: "1", detail: "Numbers that round to 80 are between 75 and 84" },
        { step: "2", detail: "Check each: 72→70, 74→70" },
        { step: "3", detail: "84→80, 89→90" },
        { step: "4", detail: "84 rounds to 80" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 13: Subtract by Counting Up
function generateSubtractByCountingUp(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Subtract by Counting Up",
      difficulty: "Easy",
      question: "62 - 58 = ? (Use counting up)",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      methodSteps: [
        { step: "1", detail: "Count up from 58 to 62" },
        { step: "2", detail: "58 to 60 is 2" },
        { step: "3", detail: "60 to 62 is 2 more" },
        { step: "4", detail: "2 + 2 = 4" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Subtract by Counting Up",
      difficulty: "Easy",
      question: "What is 35 - 32? (Count up from 32)",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3",
      methodSteps: [
        { step: "1", detail: "Start at 32" },
        { step: "2", detail: "Count up to 35: 33, 34, 35" },
        { step: "3", detail: "We counted 3 numbers" },
        { step: "4", detail: "35 - 32 = 3" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Subtract by Counting Up",
      difficulty: "Medium",
      question: "73 - 68 = ? (Count up strategy)",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "Count up from 68 to 73" },
        { step: "2", detail: "68 to 70 is 2" },
        { step: "3", detail: "70 to 73 is 3" },
        { step: "4", detail: "2 + 3 = 5" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Subtract by Counting Up",
      difficulty: "Medium",
      question: "What is 100 - 94? (Use counting up)",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "Count up from 94 to 100" },
        { step: "2", detail: "94 to 100 is ?" },
        { step: "3", detail: "94, 95, 96, 97, 98, 99, 100" },
        { step: "4", detail: "That's 6 steps" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Subtract by Counting Up",
      difficulty: "Hard",
      question: "126 - 118 = ? (Count up through tens)",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      methodSteps: [
        { step: "1", detail: "Count up from 118 to 126" },
        { step: "2", detail: "118 to 120 is 2" },
        { step: "3", detail: "120 to 126 is 6" },
        { step: "4", detail: "2 + 6 = 8" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 14: Doubling and Halving Using Partitioning
function generateDoublingHalvingPartitioning(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Using Partitioning",
      difficulty: "Easy",
      question: "Double 14 by partitioning into 10 and 4.",
      options: ["24", "26", "28", "30"],
      correctAnswer: "28",
      methodSteps: [
        { step: "1", detail: "Split 14 into 10 + 4" },
        { step: "2", detail: "Double 10 = 20" },
        { step: "3", detail: "Double 4 = 8" },
        { step: "4", detail: "20 + 8 = 28" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Using Partitioning",
      difficulty: "Easy",
      question: "Half of 18 using partitioning (10 + 8).",
      options: ["7", "8", "9", "10"],
      correctAnswer: "9",
      methodSteps: [
        { step: "1", detail: "Split 18 into 10 + 8" },
        { step: "2", detail: "Half of 10 = 5" },
        { step: "3", detail: "Half of 8 = 4" },
        { step: "4", detail: "5 + 4 = 9" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Using Partitioning",
      difficulty: "Medium",
      question: "Double 27 using partitioning (20 + 7).",
      options: ["44", "48", "52", "54"],
      correctAnswer: "54",
      methodSteps: [
        { step: "1", detail: "Split 27 into 20 + 7" },
        { step: "2", detail: "Double 20 = 40" },
        { step: "3", detail: "Double 7 = 14" },
        { step: "4", detail: "40 + 14 = 54" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Using Partitioning",
      difficulty: "Medium",
      question: "Half of 34 using partitioning (30 + 4).",
      options: ["15", "16", "17", "18"],
      correctAnswer: "17",
      methodSteps: [
        { step: "1", detail: "Split 34 into 30 + 4" },
        { step: "2", detail: "Half of 30 = 15" },
        { step: "3", detail: "Half of 4 = 2" },
        { step: "4", detail: "15 + 2 = 17" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Doubling and Halving Using Partitioning",
      difficulty: "Hard",
      question: "Double 38 using partitioning.",
      options: ["66", "72", "76", "78"],
      correctAnswer: "76",
      methodSteps: [
        { step: "1", detail: "Split 38 into 30 + 8" },
        { step: "2", detail: "Double 30 = 60" },
        { step: "3", detail: "Double 8 = 16" },
        { step: "4", detail: "60 + 16 = 76" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 15: Finding Fractions of Shapes and Amounts
function generateFractions(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Finding Fractions of Shapes and Amounts",
      difficulty: "Easy",
      question: "What is 1/2 of 10?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "1/2 means half" },
        { step: "2", detail: "Half of 10 = 10 ÷ 2" },
        { step: "3", detail: "10 ÷ 2 = 5" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Finding Fractions of Shapes and Amounts",
      difficulty: "Easy",
      question: "What is 1/4 of 8?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      methodSteps: [
        { step: "1", detail: "1/4 means one quarter" },
        { step: "2", detail: "To find 1/4, divide by 4" },
        { step: "3", detail: "8 ÷ 4 = 2" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Finding Fractions of Shapes and Amounts",
      difficulty: "Medium",
      question: "What is 1/3 of 15?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "1/3 means one third" },
        { step: "2", detail: "To find 1/3, divide by 3" },
        { step: "3", detail: "15 ÷ 3 = 5" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Finding Fractions of Shapes and Amounts",
      difficulty: "Medium",
      question: "What is 1/2 of 24?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12",
      methodSteps: [
        { step: "1", detail: "1/2 means half" },
        { step: "2", detail: "Half of 24 = 24 ÷ 2" },
        { step: "3", detail: "Use partitioning: 24 = 20 + 4" },
        { step: "4", detail: "Half of 20 = 10, half of 4 = 2, so 10 + 2 = 12" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Finding Fractions of Shapes and Amounts",
      difficulty: "Hard",
      question: "What is 1/4 of 20?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "1/4 means one quarter" },
        { step: "2", detail: "To find 1/4, divide by 4" },
        { step: "3", detail: "20 ÷ 4 = ?" },
        { step: "4", detail: "Think: 4 × 5 = 20, so 20 ÷ 4 = 5" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 16: Place Value of Money
function generatePlaceValueMoney(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Place Value of Money",
      difficulty: "Easy",
      question: "How many pennies equal 1 dollar?",
      options: ["10", "25", "50", "100"],
      correctAnswer: "100",
      methodSteps: [
        { step: "1", detail: "1 dollar = 100 cents" },
        { step: "2", detail: "1 penny = 1 cent" },
        { step: "3", detail: "So 100 pennies = 100 cents = $1" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Place Value of Money",
      difficulty: "Easy",
      question: "How many dimes make 1 dollar?",
      options: ["5", "10", "20", "25"],
      correctAnswer: "10",
      methodSteps: [
        { step: "1", detail: "1 dime = 10 cents" },
        { step: "2", detail: "1 dollar = 100 cents" },
        { step: "3", detail: "100 ÷ 10 = 10 dimes" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Place Value of Money",
      difficulty: "Medium",
      question: "You have 3 quarters. How many cents do you have?",
      options: ["50¢", "60¢", "75¢", "90¢"],
      correctAnswer: "75¢",
      methodSteps: [
        { step: "1", detail: "1 quarter = 25 cents" },
        { step: "2", detail: "3 quarters = 3 × 25" },
        { step: "3", detail: "25 + 25 + 25 = 75 cents" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Place Value of Money",
      difficulty: "Medium",
      question: "What is the value: 2 dimes and 5 pennies?",
      options: ["15¢", "20¢", "25¢", "30¢"],
      correctAnswer: "25¢",
      methodSteps: [
        { step: "1", detail: "2 dimes = 2 × 10¢ = 20¢" },
        { step: "2", detail: "5 pennies = 5 × 1¢ = 5¢" },
        { step: "3", detail: "20¢ + 5¢ = 25¢" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Place Value of Money",
      difficulty: "Hard",
      question: "How many different ways can you make 50¢ using quarters and dimes?",
      options: ["2 ways", "3 ways", "4 ways", "5 ways"],
      correctAnswer: "3 ways",
      methodSteps: [
        { step: "1", detail: "Option 1: 2 quarters = 50¢" },
        { step: "2", detail: "Option 2: 1 quarter + 2 dimes + 1 nickel = 50¢" },
        { step: "3", detail: "Option 3: 5 dimes = 50¢" },
        { step: "4", detail: "There are 3 ways (using just quarters and dimes)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 90
    }
  ];
}

// Topic 17: Making 100
function generateMaking100(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Making 100",
      difficulty: "Easy",
      question: "45 + 50 + 5 = ?",
      options: ["90", "95", "100", "105"],
      correctAnswer: "100",
      methodSteps: [
        { step: "1", detail: "Add 45 + 50 first" },
        { step: "2", detail: "45 + 50 = 95" },
        { step: "3", detail: "Now add 5: 95 + 5 = 100" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Making 100",
      difficulty: "Easy",
      question: "Which pair adds to make 100? 30 + ___",
      options: ["60", "65", "70", "75"],
      correctAnswer: "70",
      methodSteps: [
        { step: "1", detail: "We need 30 + ? = 100" },
        { step: "2", detail: "Count up from 30 to 100" },
        { step: "3", detail: "30 to 100 is 70" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Making 100",
      difficulty: "Medium",
      question: "35 + 28 + 37 = ?",
      options: ["90", "95", "100", "105"],
      correctAnswer: "100",
      methodSteps: [
        { step: "1", detail: "Look for pairs that make easy numbers" },
        { step: "2", detail: "35 + 37 = 72 (think: 35 + 35 = 70, plus 2 more)" },
        { step: "3", detail: "72 + 28 = 100" },
        { step: "4", detail: "Total = 100" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Making 100",
      difficulty: "Medium",
      question: "How many do you add to 73 to make 100?",
      options: ["23", "27", "33", "37"],
      correctAnswer: "27",
      methodSteps: [
        { step: "1", detail: "73 + ? = 100" },
        { step: "2", detail: "Count up: 73 to 80 is 7" },
        { step: "3", detail: "80 to 100 is 20" },
        { step: "4", detail: "7 + 20 = 27" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Making 100",
      difficulty: "Hard",
      question: "Which three numbers add to 100? 25, 45, ___",
      options: ["20", "25", "30", "35"],
      correctAnswer: "30",
      methodSteps: [
        { step: "1", detail: "Add 25 + 45 first" },
        { step: "2", detail: "25 + 45 = 70" },
        { step: "3", detail: "We need 70 + ? = 100" },
        { step: "4", detail: "70 + 30 = 100" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 18: Adding and Subtracting by Partitioning
function generateAddSubtractPartitioning(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting by Partitioning",
      difficulty: "Easy",
      question: "35 + 22 = ? (Use partitioning)",
      options: ["52", "55", "57", "60"],
      correctAnswer: "57",
      methodSteps: [
        { step: "1", detail: "Split into tens and ones: 35 = 30+5, 22 = 20+2" },
        { step: "2", detail: "Add tens: 30 + 20 = 50" },
        { step: "3", detail: "Add ones: 5 + 2 = 7" },
        { step: "4", detail: "50 + 7 = 57" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting by Partitioning",
      difficulty: "Easy",
      question: "48 - 23 = ? (Use partitioning)",
      options: ["20", "23", "25", "27"],
      correctAnswer: "25",
      methodSteps: [
        { step: "1", detail: "Split: 48 = 40+8, 23 = 20+3" },
        { step: "2", detail: "Subtract tens: 40 - 20 = 20" },
        { step: "3", detail: "Subtract ones: 8 - 3 = 5" },
        { step: "4", detail: "20 + 5 = 25" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting by Partitioning",
      difficulty: "Medium",
      question: "56 + 37 = ? (Partition both numbers)",
      options: ["83", "87", "93", "97"],
      correctAnswer: "93",
      methodSteps: [
        { step: "1", detail: "Split: 56 = 50+6, 37 = 30+7" },
        { step: "2", detail: "Add tens: 50 + 30 = 80" },
        { step: "3", detail: "Add ones: 6 + 7 = 13" },
        { step: "4", detail: "80 + 13 = 93" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting by Partitioning",
      difficulty: "Medium",
      question: "72 - 38 = ? (Use partitioning)",
      options: ["32", "34", "36", "38"],
      correctAnswer: "34",
      methodSteps: [
        { step: "1", detail: "Split: 72 = 70+2, 38 = 30+8" },
        { step: "2", detail: "Subtract tens: 70 - 30 = 40" },
        { step: "3", detail: "Subtract ones: 2 - 8 (need to borrow)" },
        { step: "4", detail: "Regroup: 40 becomes 30+10, so 12-8=4. Answer: 30+4=34" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    },
    {
      subject: "Mathematics",
      topic: "Adding and Subtracting by Partitioning",
      difficulty: "Hard",
      question: "145 + 67 = ? (Partition into hundreds, tens, ones)",
      options: ["202", "210", "212", "220"],
      correctAnswer: "212",
      methodSteps: [
        { step: "1", detail: "Split: 145 = 100+40+5, 67 = 60+7" },
        { step: "2", detail: "Add hundreds: 100" },
        { step: "3", detail: "Add tens: 40 + 60 = 100" },
        { step: "4", detail: "Add ones: 5 + 7 = 12. Total: 100+100+12 = 212" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 90
    }
  ];
}

// Topic 19: Measuring Length
function generateMeasuringLength(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Measuring Length",
      difficulty: "Easy",
      question: "How many centimeters are in 1 meter?",
      options: ["10", "50", "100", "1000"],
      correctAnswer: "100",
      methodSteps: [
        { step: "1", detail: "1 meter is a unit of length" },
        { step: "2", detail: "1 meter = 100 centimeters" },
        { step: "3", detail: "Remember: 1 m = 100 cm" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Measuring Length",
      difficulty: "Easy",
      question: "Which is longer: 50 cm or 1 meter?",
      options: ["50 cm", "1 meter", "Same length", "Cannot tell"],
      correctAnswer: "1 meter",
      methodSteps: [
        { step: "1", detail: "1 meter = 100 cm" },
        { step: "2", detail: "Compare: 50 cm vs 100 cm" },
        { step: "3", detail: "100 cm is longer than 50 cm" },
        { step: "4", detail: "So 1 meter is longer" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Measuring Length",
      difficulty: "Medium",
      question: "A pencil is 15 cm long. A ruler is 30 cm. How much longer is the ruler?",
      options: ["10 cm", "15 cm", "20 cm", "25 cm"],
      correctAnswer: "15 cm",
      methodSteps: [
        { step: "1", detail: "Ruler = 30 cm, Pencil = 15 cm" },
        { step: "2", detail: "Find the difference: 30 - 15" },
        { step: "3", detail: "30 - 15 = 15 cm" },
        { step: "4", detail: "The ruler is 15 cm longer" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Measuring Length",
      difficulty: "Medium",
      question: "A rope is 2 meters long. How many centimeters is that?",
      options: ["20 cm", "50 cm", "100 cm", "200 cm"],
      correctAnswer: "200 cm",
      methodSteps: [
        { step: "1", detail: "1 meter = 100 cm" },
        { step: "2", detail: "2 meters = 2 × 100 cm" },
        { step: "3", detail: "2 × 100 = 200 cm" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Measuring Length",
      difficulty: "Hard",
      question: "A string is 150 cm. You cut off 75 cm. How many centimeters are left?",
      options: ["65 cm", "70 cm", "75 cm", "80 cm"],
      correctAnswer: "75 cm",
      methodSteps: [
        { step: "1", detail: "Start with 150 cm" },
        { step: "2", detail: "Cut off 75 cm" },
        { step: "3", detail: "150 - 75 = ?" },
        { step: "4", detail: "150 - 75 = 75 cm left" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 20: Measuring Capacity
function generateMeasuringCapacity(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Measuring Capacity",
      difficulty: "Easy",
      question: "How many milliliters are in 1 liter?",
      options: ["10", "100", "1000", "10000"],
      correctAnswer: "1000",
      methodSteps: [
        { step: "1", detail: "1 liter is a unit of capacity (how much liquid fits)" },
        { step: "2", detail: "1 liter = 1000 milliliters" },
        { step: "3", detail: "Remember: 1 L = 1000 mL" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Measuring Capacity",
      difficulty: "Easy",
      question: "Which holds more: 500 mL or 1 liter?",
      options: ["500 mL", "1 liter", "Same amount", "Cannot tell"],
      correctAnswer: "1 liter",
      methodSteps: [
        { step: "1", detail: "1 liter = 1000 mL" },
        { step: "2", detail: "Compare: 500 mL vs 1000 mL" },
        { step: "3", detail: "1000 mL is more than 500 mL" },
        { step: "4", detail: "So 1 liter holds more" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Measuring Capacity",
      difficulty: "Medium",
      question: "A bottle holds 2 liters. How many milliliters is that?",
      options: ["200 mL", "500 mL", "1000 mL", "2000 mL"],
      correctAnswer: "2000 mL",
      methodSteps: [
        { step: "1", detail: "1 liter = 1000 mL" },
        { step: "2", detail: "2 liters = 2 × 1000 mL" },
        { step: "3", detail: "2 × 1000 = 2000 mL" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Measuring Capacity",
      difficulty: "Medium",
      question: "You drink 250 mL of juice from a 1-liter carton. How much is left?",
      options: ["500 mL", "650 mL", "750 mL", "850 mL"],
      correctAnswer: "750 mL",
      methodSteps: [
        { step: "1", detail: "Start with 1 liter = 1000 mL" },
        { step: "2", detail: "You drank 250 mL" },
        { step: "3", detail: "1000 - 250 = 750 mL" },
        { step: "4", detail: "750 mL is left" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Measuring Capacity",
      difficulty: "Hard",
      question: "Three cups each hold 200 mL. How many milliliters total? How many liters?",
      options: ["600 mL (less than 1 L)", "600 mL (more than 1 L)", "800 mL", "1 L"],
      correctAnswer: "600 mL (less than 1 L)",
      methodSteps: [
        { step: "1", detail: "3 cups × 200 mL each" },
        { step: "2", detail: "3 × 200 = 600 mL" },
        { step: "3", detail: "1 liter = 1000 mL" },
        { step: "4", detail: "600 mL is less than 1 liter" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 21: Numbers on a Number Line
function generateNumbersOnNumberLine(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Numbers on a Number Line",
      difficulty: "Easy",
      question: "On a number line marked 0, 5, 10, 15, 20, what comes after 10?",
      options: ["11", "12", "13", "15"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "Look at the pattern: 0, 5, 10, 15, 20" },
        { step: "2", detail: "Going up by 5s each time" },
        { step: "3", detail: "After 10 comes 15" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Numbers on a Number Line",
      difficulty: "Easy",
      question: "On a number line from 20 to 30, what number is in the middle?",
      options: ["22", "24", "25", "26"],
      correctAnswer: "25",
      methodSteps: [
        { step: "1", detail: "Find the middle of 20 and 30" },
        { step: "2", detail: "Count: 20 to 25 is 5, 25 to 30 is 5" },
        { step: "3", detail: "25 is exactly in the middle" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Numbers on a Number Line",
      difficulty: "Medium",
      question: "On a number line, you start at 18 and move 7 spaces forward. Where are you?",
      options: ["23", "24", "25", "26"],
      correctAnswer: "25",
      methodSteps: [
        { step: "1", detail: "Start at 18" },
        { step: "2", detail: "Move forward 7 (add 7)" },
        { step: "3", detail: "18 + 7 = 25" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Numbers on a Number Line",
      difficulty: "Medium",
      question: "A number line shows: 40, 50, ?, 70. What's the missing number?",
      options: ["55", "60", "65", "68"],
      correctAnswer: "60",
      methodSteps: [
        { step: "1", detail: "Look at pattern: 40, 50, ?, 70" },
        { step: "2", detail: "Going up by 10s" },
        { step: "3", detail: "50 + 10 = 60" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "Numbers on a Number Line",
      difficulty: "Hard",
      question: "On a number line marked in 2s (0, 2, 4, 6...), what is the 10th mark?",
      options: ["18", "20", "22", "24"],
      correctAnswer: "20",
      methodSteps: [
        { step: "1", detail: "Starting at 0, counting by 2s" },
        { step: "2", detail: "1st=2, 2nd=4, 3rd=6... 10th=?" },
        { step: "3", detail: "10 marks × 2 = 20" },
        { step: "4", detail: "The 10th mark is at 20" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 22: More Subtraction on Counting Up
function generateMoreSubtractionCountingUp(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "More Subtraction on Counting Up",
      difficulty: "Easy",
      question: "51 - 48 = ? (Count up from 48)",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3",
      methodSteps: [
        { step: "1", detail: "Count up from 48 to 51" },
        { step: "2", detail: "48, 49, 50, 51" },
        { step: "3", detail: "That's 3 steps" },
        { step: "4", detail: "51 - 48 = 3" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "More Subtraction on Counting Up",
      difficulty: "Easy",
      question: "What is 44 - 39? (Use counting up)",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
      methodSteps: [
        { step: "1", detail: "Count up from 39 to 44" },
        { step: "2", detail: "39 to 40 is 1" },
        { step: "3", detail: "40 to 44 is 4" },
        { step: "4", detail: "1 + 4 = 5" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 45
    },
    {
      subject: "Mathematics",
      topic: "More Subtraction on Counting Up",
      difficulty: "Medium",
      question: "87 - 79 = ? (Count up through 80)",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      methodSteps: [
        { step: "1", detail: "Count from 79 to 87" },
        { step: "2", detail: "79 to 80 is 1" },
        { step: "3", detail: "80 to 87 is 7" },
        { step: "4", detail: "1 + 7 = 8" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "More Subtraction on Counting Up",
      difficulty: "Medium",
      question: "What is 103 - 97? (Count up)",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6",
      methodSteps: [
        { step: "1", detail: "Count up from 97 to 103" },
        { step: "2", detail: "97 to 100 is 3" },
        { step: "3", detail: "100 to 103 is 3" },
        { step: "4", detail: "3 + 3 = 6" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "More Subtraction on Counting Up",
      difficulty: "Hard",
      question: "215 - 198 = ? (Count up through 200)",
      options: ["13", "15", "17", "19"],
      correctAnswer: "17",
      methodSteps: [
        { step: "1", detail: "Count up from 198 to 215" },
        { step: "2", detail: "198 to 200 is 2" },
        { step: "3", detail: "200 to 215 is 15" },
        { step: "4", detail: "2 + 15 = 17" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 23: Revising Times Tables
function generateTimesTables(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Revising Times Tables",
      difficulty: "Easy",
      question: "What is 3 × 5?",
      options: ["12", "15", "18", "20"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "3 × 5 means 5 + 5 + 5" },
        { step: "2", detail: "Or count by 5s three times: 5, 10, 15" },
        { step: "3", detail: "3 × 5 = 15" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Revising Times Tables",
      difficulty: "Easy",
      question: "What is 4 × 2?",
      options: ["6", "8", "10", "12"],
      correctAnswer: "8",
      methodSteps: [
        { step: "1", detail: "4 × 2 means 4 groups of 2" },
        { step: "2", detail: "2 + 2 + 2 + 2 = 8" },
        { step: "3", detail: "4 × 2 = 8" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    },
    {
      subject: "Mathematics",
      topic: "Revising Times Tables",
      difficulty: "Medium",
      question: "What is 6 × 4?",
      options: ["20", "22", "24", "26"],
      correctAnswer: "24",
      methodSteps: [
        { step: "1", detail: "6 × 4 means 6 groups of 4" },
        { step: "2", detail: "Count by 4s six times: 4, 8, 12, 16, 20, 24" },
        { step: "3", detail: "Or think: 5 × 4 = 20, plus 1 more 4 = 24" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Revising Times Tables",
      difficulty: "Medium",
      question: "What is 7 × 3?",
      options: ["18", "21", "24", "27"],
      correctAnswer: "21",
      methodSteps: [
        { step: "1", detail: "7 × 3 means 7 groups of 3" },
        { step: "2", detail: "Count by 3s: 3, 6, 9, 12, 15, 18, 21" },
        { step: "3", detail: "7 × 3 = 21" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Revising Times Tables",
      difficulty: "Hard",
      question: "What is 8 × 5?",
      options: ["35", "40", "45", "50"],
      correctAnswer: "40",
      methodSteps: [
        { step: "1", detail: "8 × 5 means 8 groups of 5" },
        { step: "2", detail: "Use doubling: 4 × 5 = 20" },
        { step: "3", detail: "Double it: 20 + 20 = 40" },
        { step: "4", detail: "8 × 5 = 40" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    }
  ];
}

// Topic 24: Division with Remainders
function generateDivisionWithRemainders(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Division with Remainders",
      difficulty: "Easy",
      question: "13 ÷ 5 = ? with remainder ?",
      options: ["2 R 3", "2 R 2", "3 R 2", "3 R 3"],
      correctAnswer: "2 R 3",
      methodSteps: [
        { step: "1", detail: "How many 5s fit into 13?" },
        { step: "2", detail: "5 × 2 = 10 (fits)" },
        { step: "3", detail: "5 × 3 = 15 (too big)" },
        { step: "4", detail: "So 2 groups of 5 = 10, with 3 left over: 2 R 3" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Division with Remainders",
      difficulty: "Easy",
      question: "What is 17 ÷ 4?",
      options: ["3 R 1", "4 R 1", "4 R 2", "5 R 1"],
      correctAnswer: "4 R 1",
      methodSteps: [
        { step: "1", detail: "How many 4s in 17?" },
        { step: "2", detail: "4 × 4 = 16 (fits)" },
        { step: "3", detail: "4 × 5 = 20 (too big)" },
        { step: "4", detail: "4 groups of 4 = 16, with 1 left: 4 R 1" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 60
    },
    {
      subject: "Mathematics",
      topic: "Division with Remainders",
      difficulty: "Medium",
      question: "23 ÷ 3 = ?",
      options: ["6 R 1", "7 R 1", "7 R 2", "8 R 1"],
      correctAnswer: "7 R 2",
      methodSteps: [
        { step: "1", detail: "How many 3s fit in 23?" },
        { step: "2", detail: "3 × 7 = 21 (fits)" },
        { step: "3", detail: "3 × 8 = 24 (too big)" },
        { step: "4", detail: "7 groups of 3 = 21, remainder 23-21 = 2" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    },
    {
      subject: "Mathematics",
      topic: "Division with Remainders",
      difficulty: "Medium",
      question: "What is 29 ÷ 5?",
      options: ["4 R 4", "5 R 3", "5 R 4", "6 R 1"],
      correctAnswer: "5 R 4",
      methodSteps: [
        { step: "1", detail: "How many 5s in 29?" },
        { step: "2", detail: "5 × 5 = 25 (fits)" },
        { step: "3", detail: "5 × 6 = 30 (too big)" },
        { step: "4", detail: "5 groups, remainder 29-25 = 4: answer 5 R 4" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 75
    },
    {
      subject: "Mathematics",
      topic: "Division with Remainders",
      difficulty: "Hard",
      question: "38 ÷ 4 = ?",
      options: ["8 R 2", "9 R 1", "9 R 2", "10 R 2"],
      correctAnswer: "9 R 2",
      methodSteps: [
        { step: "1", detail: "How many 4s in 38?" },
        { step: "2", detail: "4 × 9 = 36 (fits)" },
        { step: "3", detail: "4 × 10 = 40 (too big)" },
        { step: "4", detail: "9 groups of 4 = 36, remainder 38-36 = 2" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 90
    }
  ];
}

// Topic 25: Grid Method Multiplication
function generateGridMethodMultiplication(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Grid Method Multiplication",
      difficulty: "Easy",
      question: "Using the grid method: 3 × 12 = ?",
      options: ["30", "33", "36", "39"],
      correctAnswer: "36",
      methodSteps: [
        { step: "1", detail: "Split 12 into 10 + 2" },
        { step: "2", detail: "Multiply: 3 × 10 = 30" },
        { step: "3", detail: "Multiply: 3 × 2 = 6" },
        { step: "4", detail: "Add: 30 + 6 = 36" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Grid Method Multiplication",
      difficulty: "Medium",
      question: "4 × 24 = ?",
      options: ["88", "92", "96", "100"],
      correctAnswer: "96",
      methodSteps: [
        { step: "1", detail: "Split 24 into 20 + 4" },
        { step: "2", detail: "4 × 20 = 80" },
        { step: "3", detail: "4 × 4 = 16" },
        { step: "4", detail: "80 + 16 = 96" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Grid Method Multiplication",
      difficulty: "Hard",
      question: "6 × 35 = ?",
      options: ["200", "210", "220", "230"],
      correctAnswer: "210",
      methodSteps: [
        { step: "1", detail: "Split 35 into 30 + 5" },
        { step: "2", detail: "6 × 30 = 180" },
        { step: "3", detail: "6 × 5 = 30" },
        { step: "4", detail: "180 + 30 = 210" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 26: Perimeter  
function generatePerimeter(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Perimeter",
      difficulty: "Easy",
      question: "What is the perimeter of a square with sides of 4 cm?",
      options: ["12 cm", "16 cm", "20 cm", "24 cm"],
      correctAnswer: "16 cm",
      methodSteps: [
        { step: "1", detail: "A square has 4 equal sides" },
        { step: "2", detail: "Each side is 4 cm" },
        { step: "3", detail: "Perimeter = 4 + 4 + 4 + 4" },
        { step: "4", detail: "= 16 cm" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Perimeter",
      difficulty: "Medium",
      question: "A triangle has sides 6 cm, 4 cm, and 5 cm. What is the perimeter?",
      options: ["13 cm", "14 cm", "15 cm", "16 cm"],
      correctAnswer: "15 cm",
      methodSteps: [
        { step: "1", detail: "Perimeter = sum of all sides" },
        { step: "2", detail: "Add: 6 + 4 + 5" },
        { step: "3", detail: "6 + 4 = 10" },
        { step: "4", detail: "10 + 5 = 15 cm" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Perimeter",
      difficulty: "Hard",
      question: "A shape has 5 equal sides, each 6 cm long. What is the perimeter?",
      options: ["24 cm", "28 cm", "30 cm", "36 cm"],
      correctAnswer: "30 cm",
      methodSteps: [
        { step: "1", detail: "This is a pentagon (5 sides)" },
        { step: "2", detail: "Each side is 6 cm" },
        { step: "3", detail: "Perimeter = 6 + 6 + 6 + 6 + 6" },
        { step: "4", detail: "Or 5 × 6 = 30 cm" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 27: Ordering Numbers
function generateOrderingNumbers(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Ordering Numbers",
      difficulty: "Easy",
      question: "Order from largest to smallest: 321, 123, 231",
      options: ["321, 231, 123", "123, 231, 321", "231, 321, 123", "321, 123, 231"],
      correctAnswer: "321, 231, 123",
      methodSteps: [
        { step: "1", detail: "Compare hundreds: 3, 1, and 2" },
        { step: "2", detail: "321 has 3 hundreds (largest)" },
        { step: "3", detail: "231 has 2 hundreds (middle)" },
        { step: "4", detail: "123 has 1 hundred (smallest)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Ordering Numbers",
      difficulty: "Medium",
      question: "Order from largest to smallest: 481, 438, 538",
      options: ["538, 481, 438", "481, 538, 438", "438, 481, 538", "538, 438, 481"],
      correctAnswer: "538, 481, 438",
      methodSteps: [
        { step: "1", detail: "Compare hundreds: 4, 4, 5" },
        { step: "2", detail: "538 is largest (5 hundreds)" },
        { step: "3", detail: "Compare 481 and 438: both have 4 hundreds" },
        { step: "4", detail: "481 > 438 (8 tens > 3 tens)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Ordering Numbers",
      difficulty: "Hard",
      question: "Put in order from smallest to largest: 983, 933, 963",
      options: ["933, 963, 983", "963, 933, 983", "933, 983, 963", "983, 963, 933"],
      correctAnswer: "933, 963, 983",
      methodSteps: [
        { step: "1", detail: "All have 9 hundreds, compare tens" },
        { step: "2", detail: "933 has 3 tens (smallest)" },
        { step: "3", detail: "963 has 6 tens (middle)" },
        { step: "4", detail: "983 has 8 tens (largest)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 28: Comparing Fractions
function generateComparingFractions(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Comparing Fractions",
      difficulty: "Easy",
      question: "Which is bigger: 1/2 or 1/4?",
      options: ["1/2", "1/4", "They are equal", "Cannot tell"],
      correctAnswer: "1/2",
      methodSteps: [
        { step: "1", detail: "Imagine a pizza cut into 2 pieces vs 4 pieces" },
        { step: "2", detail: "1/2 means 1 out of 2 big pieces" },
        { step: "3", detail: "1/4 means 1 out of 4 smaller pieces" },
        { step: "4", detail: "1/2 is larger" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Comparing Fractions",
      difficulty: "Medium",
      question: "Is 1/4 bigger than 1/6?",
      options: ["Yes", "No", "They are equal", "Cannot tell"],
      correctAnswer: "Yes",
      methodSteps: [
        { step: "1", detail: "Compare 1/4 and 1/6" },
        { step: "2", detail: "4 < 6" },
        { step: "3", detail: "Smaller denominator = bigger fraction" },
        { step: "4", detail: "So 1/4 > 1/6" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Comparing Fractions",
      difficulty: "Hard",
      question: "Put in order from smallest to largest: 1/3, 1/2, 1/5",
      options: ["1/5, 1/3, 1/2", "1/2, 1/3, 1/5", "1/3, 1/2, 1/5", "1/5, 1/2, 1/3"],
      correctAnswer: "1/5, 1/3, 1/2",
      methodSteps: [
        { step: "1", detail: "Larger denominator = smaller fraction" },
        { step: "2", detail: "1/5 is smallest (5 is largest)" },
        { step: "3", detail: "1/3 is middle" },
        { step: "4", detail: "1/2 is largest (2 is smallest)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 29: Identifying Multiples
function generateIdentifyingMultiples(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Identifying Multiples",
      difficulty: "Easy",
      question: "Which of these is a multiple of 5?",
      options: ["12", "18", "20", "23"],
      correctAnswer: "20",
      methodSteps: [
        { step: "1", detail: "Multiples of 5 end in 0 or 5" },
        { step: "2", detail: "Check each: 12 (no), 18 (no), 20 (yes!)" },
        { step: "3", detail: "20 ends in 0" },
        { step: "4", detail: "20 = 5 × 4" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Identifying Multiples",
      difficulty: "Medium",
      question: "Which number is a multiple of BOTH 2 and 5?",
      options: ["12", "15", "20", "25"],
      correctAnswer: "20",
      methodSteps: [
        { step: "1", detail: "Multiples of 2 are even" },
        { step: "2", detail: "Multiples of 5 end in 0 or 5" },
        { step: "3", detail: "Need both: even AND ends in 0 or 5" },
        { step: "4", detail: "20 is even and ends in 0" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Identifying Multiples",
      difficulty: "Hard",
      question: "How many multiples of 3 are there between 10 and 20?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3",
      methodSteps: [
        { step: "1", detail: "List multiples of 3: 3, 6, 9, 12, 15, 18, 21..." },
        { step: "2", detail: "Between 10 and 20: 12, 15, 18" },
        { step: "3", detail: "Count them: 1, 2, 3" },
        { step: "4", detail: "There are 3 multiples" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 30: Number Patterns and Sequences
function generateNumberPatterns(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Number Patterns",
      difficulty: "Easy",
      question: "What comes next? 5, 10, 15, 20, ___",
      options: ["22", "25", "30", "35"],
      correctAnswer: "25",
      methodSteps: [
        { step: "1", detail: "Look at the pattern: 5, 10, 15, 20" },
        { step: "2", detail: "Each number goes up by 5" },
        { step: "3", detail: "20 + 5 = 25" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Number Patterns",
      difficulty: "Medium",
      question: "Fill in the missing number: 197, 198, 199, ___, 201",
      options: ["199", "200", "202", "203"],
      correctAnswer: "200",
      methodSteps: [
        { step: "1", detail: "The numbers go up by 1 each time" },
        { step: "2", detail: "After 199 comes 200" },
        { step: "3", detail: "Then 201" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Number Patterns",
      difficulty: "Hard",
      question: "What's the missing number? 850, 800, ___, 700, 650",
      options: ["725", "750", "775", "825"],
      correctAnswer: "750",
      methodSteps: [
        { step: "1", detail: "Look at the pattern going down" },
        { step: "2", detail: "850 to 800 = down 50" },
        { step: "3", detail: "Each time we go down 50" },
        { step: "4", detail: "800 - 50 = 750" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 31: Writing Numbers in Words
function generateNumberWords(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Writing Numbers in Words",
      difficulty: "Easy",
      question: "Write 40 in words.",
      options: ["four", "fourteen", "forty", "four hundred"],
      correctAnswer: "forty",
      methodSteps: [
        { step: "1", detail: "40 is 4 tens" },
        { step: "2", detail: "4 tens = forty" },
        { step: "3", detail: "Not four (that's 4) or fourteen (that's 14)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Writing Numbers in Words",
      difficulty: "Medium",
      question: "How do you write 9th in words?",
      options: ["nine", "nineth", "ninth", "ninety"],
      correctAnswer: "ninth",
      methodSteps: [
        { step: "1", detail: "9th is an ordinal number (position)" },
        { step: "2", detail: "It's spelled: ninth" },
        { step: "3", detail: "Not 'nineth' - the correct spelling is ninth" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Writing Numbers in Words",
      difficulty: "Hard",
      question: "Write 23rd in words.",
      options: ["twenty-three", "twenty-third", "twentieth-third", "two-third"],
      correctAnswer: "twenty-third",
      methodSteps: [
        { step: "1", detail: "23rd shows position (ordinal)" },
        { step: "2", detail: "Twenty for 20, third for 3rd" },
        { step: "3", detail: "Combined: twenty-third" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 32: Number Before and After
function generateNumberBeforeAfter(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Number Before and After",
      difficulty: "Easy",
      question: "What is the even number after 16?",
      options: ["17", "18", "19", "20"],
      correctAnswer: "18",
      methodSteps: [
        { step: "1", detail: "After 16 comes 17, 18, 19..." },
        { step: "2", detail: "Even numbers end in 0, 2, 4, 6, 8" },
        { step: "3", detail: "18 is even (ends in 8)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Number Before and After",
      difficulty: "Easy",
      question: "What number comes before 800?",
      options: ["700", "790", "799", "801"],
      correctAnswer: "799",
      methodSteps: [
        { step: "1", detail: "Count backwards from 800" },
        { step: "2", detail: "800, 799, 798..." },
        { step: "3", detail: "The number before 800 is 799" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Number Before and After",
      difficulty: "Medium",
      question: "What is 2 more than 379?",
      options: ["377", "380", "381", "382"],
      correctAnswer: "381",
      methodSteps: [
        { step: "1", detail: "Start at 379" },
        { step: "2", detail: "Count up 2: 380, 381" },
        { step: "3", detail: "379 + 2 = 381" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    }
  ];
}

// Topic 33: Odd and Even Numbers
function generateOddEven(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Odd and Even Numbers",
      difficulty: "Easy",
      question: "Which of these is an even number?",
      options: ["13", "17", "22", "25"],
      correctAnswer: "22",
      methodSteps: [
        { step: "1", detail: "Even numbers end in 0, 2, 4, 6, or 8" },
        { step: "2", detail: "Check: 13 (odd), 17 (odd), 22 (even!), 25 (odd)" },
        { step: "3", detail: "22 ends in 2, so it's even" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Odd and Even Numbers",
      difficulty: "Easy",
      question: "What is the odd number before 17?",
      options: ["14", "15", "16", "18"],
      correctAnswer: "15",
      methodSteps: [
        { step: "1", detail: "Before 17: 16, 15, 14..." },
        { step: "2", detail: "Odd numbers end in 1, 3, 5, 7, 9" },
        { step: "3", detail: "15 ends in 5, so it's odd" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Odd and Even Numbers",
      difficulty: "Medium",
      question: "Circle the even numbers: 16, 21, 30, 91",
      options: ["16, 30", "21, 91", "16, 21", "30, 91"],
      correctAnswer: "16, 30",
      methodSteps: [
        { step: "1", detail: "Even numbers end in 0, 2, 4, 6, 8" },
        { step: "2", detail: "16 ends in 6 (even)" },
        { step: "3", detail: "30 ends in 0 (even)" },
        { step: "4", detail: "21 and 91 end in 1 (odd)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    }
  ];
}

// Topic 34: Middle Numbers
function generateMiddleNumbers(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Finding Middle Numbers",
      difficulty: "Easy",
      question: "What number is halfway between 0 and 20?",
      options: ["5", "10", "15", "20"],
      correctAnswer: "10",
      methodSteps: [
        { step: "1", detail: "Halfway means in the middle" },
        { step: "2", detail: "0 to 10 is 10, and 10 to 20 is 10" },
        { step: "3", detail: "10 is exactly in the middle" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Finding Middle Numbers",
      difficulty: "Medium",
      question: "What number is halfway between 700 and 900?",
      options: ["750", "800", "850", "900"],
      correctAnswer: "800",
      methodSteps: [
        { step: "1", detail: "Find the middle of 700 and 900" },
        { step: "2", detail: "700 to 800 is 100" },
        { step: "3", detail: "800 to 900 is also 100" },
        { step: "4", detail: "800 is in the middle" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Finding Middle Numbers",
      difficulty: "Hard",
      question: "What's halfway between 450 and 550?",
      options: ["475", "500", "525", "550"],
      correctAnswer: "500",
      methodSteps: [
        { step: "1", detail: "450 to 500 = up 50" },
        { step: "2", detail: "500 to 550 = up 50" },
        { step: "3", detail: "Equal on both sides" },
        { step: "4", detail: "500 is in the middle" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 35: Money - Pounds and Pence
function generateMoneyConversion(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Money - Pounds and Pence",
      difficulty: "Easy",
      question: "How many pence in £1?",
      options: ["10p", "50p", "100p", "200p"],
      correctAnswer: "100p",
      methodSteps: [
        { step: "1", detail: "£1 = 100 pence" },
        { step: "2", detail: "This is always the same" },
        { step: "3", detail: "Remember: £1 = 100p" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Money - Pounds and Pence",
      difficulty: "Medium",
      question: "Write £3.61 in pence.",
      options: ["36p", "361p", "3061p", "3610p"],
      correctAnswer: "361p",
      methodSteps: [
        { step: "1", detail: "£3 = 3 × 100p = 300p" },
        { step: "2", detail: "Plus 61p more" },
        { step: "3", detail: "300p + 61p = 361p" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Money - Pounds and Pence",
      difficulty: "Hard",
      question: "Write 267p in pounds and pence.",
      options: ["£2.67", "£26.70", "£267.00", "£0.267"],
      correctAnswer: "£2.67",
      methodSteps: [
        { step: "1", detail: "100p = £1" },
        { step: "2", detail: "267p = 200p + 67p" },
        { step: "3", detail: "200p = £2" },
        { step: "4", detail: "Answer: £2.67" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 36: Making Change
function generateMakingChange(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Making Change",
      difficulty: "Easy",
      question: "You pay £1 for a 60p item. How much change?",
      options: ["30p", "40p", "50p", "60p"],
      correctAnswer: "40p",
      methodSteps: [
        { step: "1", detail: "£1 = 100p" },
        { step: "2", detail: "Item costs 60p" },
        { step: "3", detail: "Change = 100p - 60p = 40p" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Making Change",
      difficulty: "Medium",
      question: "Brian had £1 and spent 48p. How much is left?",
      options: ["42p", "48p", "52p", "58p"],
      correctAnswer: "52p",
      methodSteps: [
        { step: "1", detail: "Brian had £1 = 100p" },
        { step: "2", detail: "He spent 48p" },
        { step: "3", detail: "100p - 48p = 52p left" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Making Change",
      difficulty: "Hard",
      question: "Jane had £2 and spent £1.25. How much money is left?",
      options: ["£0.50", "£0.75", "£1.25", "£1.50"],
      correctAnswer: "£0.75",
      methodSteps: [
        { step: "1", detail: "Jane had £2.00" },
        { step: "2", detail: "She spent £1.25" },
        { step: "3", detail: "£2.00 - £1.25 = £0.75" },
        { step: "4", detail: "Or: 200p - 125p = 75p = £0.75" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 37: Word Problems
function generateWordProblems(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Word Problems",
      difficulty: "Easy",
      question: "There are 10 sweets in a packet. How many sweets in 5 packets?",
      options: ["15", "30", "50", "60"],
      correctAnswer: "50",
      methodSteps: [
        { step: "1", detail: "Each packet has 10 sweets" },
        { step: "2", detail: "We have 5 packets" },
        { step: "3", detail: "5 × 10 = 50 sweets" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Word Problems",
      difficulty: "Medium",
      question: "Anne has 245 books. Her brother has 50 books. How many books altogether?",
      options: ["195", "250", "285", "295"],
      correctAnswer: "295",
      methodSteps: [
        { step: "1", detail: "Anne: 245 books, Brother: 50 books" },
        { step: "2", detail: "Altogether means add: 245 + 50" },
        { step: "3", detail: "245 + 50 = 295 books" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Word Problems",
      difficulty: "Hard",
      question: "There were 168 greeting cards on the shelf. 35 were sold. How many left?",
      options: ["123", "133", "143", "153"],
      correctAnswer: "133",
      methodSteps: [
        { step: "1", detail: "Started with 168 cards" },
        { step: "2", detail: "35 were sold (subtract)" },
        { step: "3", detail: "168 - 35 = ?" },
        { step: "4", detail: "168 - 35 = 133 cards left" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 38: Number Pairs Making Totals
function generateNumberPairs(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Number Pairs",
      difficulty: "Easy",
      question: "Which pair adds to make 20?",
      options: ["8 + 10", "12 + 8", "15 + 6", "9 + 9"],
      correctAnswer: "12 + 8",
      methodSteps: [
        { step: "1", detail: "Check each pair" },
        { step: "2", detail: "8 + 10 = 18 (no)" },
        { step: "3", detail: "12 + 8 = 20 (yes!)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Number Pairs",
      difficulty: "Medium",
      question: "Which two numbers add to make 100?",
      options: ["25 + 85", "40 + 50", "45 + 60", "35 + 65"],
      correctAnswer: "35 + 65",
      methodSteps: [
        { step: "1", detail: "Check each pair" },
        { step: "2", detail: "25 + 85 = 110 (too big)" },
        { step: "3", detail: "35 + 65 = 100 (correct!)" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Number Pairs",
      difficulty: "Hard",
      question: "Find the pair that makes 1000: 600, 132, 800, 400, 200",
      options: ["600 + 400", "800 + 200", "600 + 200", "132 + 800"],
      correctAnswer: "800 + 200",
      methodSteps: [
        { step: "1", detail: "We need pairs that add to 1000" },
        { step: "2", detail: "600 + 400 = 1000 ✓" },
        { step: "3", detail: "800 + 200 = 1000 ✓" },
        { step: "4", detail: "Both work! 800 + 200 is one answer" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}

// Topic 39: Completing Fractions to 1
function generateCompletingFractions(): Omit<Question, "category">[] {
  return [
    {
      subject: "Mathematics",
      topic: "Completing Fractions to 1",
      difficulty: "Easy",
      question: "6/8 + ?/8 = 1. What goes in the blank?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      methodSteps: [
        { step: "1", detail: "1 whole = 8/8" },
        { step: "2", detail: "We have 6/8" },
        { step: "3", detail: "8 - 6 = 2" },
        { step: "4", detail: "Need 2/8 more: 6/8 + 2/8 = 8/8 = 1" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 15
    },
    {
      subject: "Mathematics",
      topic: "Completing Fractions to 1",
      difficulty: "Medium",
      question: "3/10 + ?/10 = 1",
      options: ["3", "5", "7", "10"],
      correctAnswer: "7",
      methodSteps: [
        { step: "1", detail: "1 whole = 10/10" },
        { step: "2", detail: "We have 3/10" },
        { step: "3", detail: "10 - 3 = 7" },
        { step: "4", detail: "3/10 + 7/10 = 10/10 = 1" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 20
    },
    {
      subject: "Mathematics",
      topic: "Completing Fractions to 1",
      difficulty: "Hard",
      question: "1/3 + ?/3 = 1",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      methodSteps: [
        { step: "1", detail: "1 whole = 3/3" },
        { step: "2", detail: "We have 1/3" },
        { step: "3", detail: "3 - 1 = 2" },
        { step: "4", detail: "1/3 + 2/3 = 3/3 = 1" }
      ],
      questionType: "mcq",
      estimatedTimeSeconds: 30
    }
  ];
}
