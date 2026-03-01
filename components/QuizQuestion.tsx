'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types/question';
import StepByStepExplanation from './StepByStepExplanation';
import FractionShape from './FractionShape';
import AnalogClock from './AnalogClock';
import { useSettings } from '@/contexts/SettingsContext';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuizQuestionProps) {
  const { settings } = useSettings();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    methodSteps?: any[];
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(settings.timerEnabled ? settings.timerSeconds : 0);

  // Reset state when question changes
  useEffect(() => {
    setTimeLeft(settings.timerEnabled ? settings.timerSeconds : 0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setResult(null);
  }, [question.id, settings.timerEnabled, settings.timerSeconds]);

  // Countdown timer
  useEffect(() => {
    if (submitted || !settings.timerEnabled) return; // Stop timer when submitted or disabled

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, settings.timerEnabled]);

  // Auto-advance when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !submitted && settings.timerEnabled) {
      // Time's up! Mark as wrong and move to next question
      setSubmitted(true);
      setResult({
        isCorrect: false,
        correctAnswer: question.correctAnswer,
        methodSteps: undefined, // Don't show explanation for timeout
      });
      
      // Auto-advance after 3 seconds to show timeout message
      setTimeout(() => {
        handleContinue();
      }, 3000);
    }
  }, [timeLeft, submitted, settings.timerEnabled]);

  const handleSelectAnswer = (answer: string) => {
    if (submitted) return;
    
    setSelectedAnswer(answer);
    setSubmitted(true);
    onAnswer(answer);

    // Check answer
    const isCorrect = answer === question.correctAnswer;
    setResult({
      isCorrect,
      correctAnswer: question.correctAnswer,
      methodSteps: !isCorrect ? question.methodSteps : undefined,
    });
  };

  // Auto-advance for correct answers after 2 seconds
  useEffect(() => {
    if (result?.isCorrect && submitted) {
      const timer = setTimeout(() => {
        onNext();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [result, submitted, onNext]);

  const handleContinue = () => {
    onNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">{question.topic}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getDifficultyColor(
              question.difficulty
            )}`}
          >
            {question.difficulty}
          </span>
          {settings.timerEnabled && (
            <div className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-3xl ${
              timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 
              timeLeft <= 10 ? 'bg-yellow-100 text-yellow-600' : 
              'bg-blue-100 text-blue-600'
            }`}>
              <span>⏱️</span>
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Visual Image */}
        {question.image && (
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            {question.image.type === 'fraction-shape' && question.image.numerator !== undefined && question.image.denominator !== undefined && (
              <FractionShape
                numerator={question.image.numerator}
                denominator={question.image.denominator}
                shape={question.image.shape}
              />
            )}
            {question.image.type === 'clock' && question.image.hours !== undefined && question.image.minutes !== undefined && (
              <AnalogClock
                hours={question.image.hours}
                minutes={question.image.minutes}
              />
            )}
          </div>
        )}

        {/* Options - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;
            const showCorrect = submitted && isCorrect;
            const showIncorrect = submitted && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={submitted}
                className={`p-5 rounded-xl text-left font-medium text-lg transition-all duration-200 border-2 ${
                  showCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : showIncorrect
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : isSelected
                    ? 'bg-blue-100 border-blue-500 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700'
                } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <span className="text-2xl">✓</span>}
                  {showIncorrect && <span className="text-2xl">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Result Feedback */}
        {result && (
          <div className="mt-6">
            {/* Next Question - Top (visible without scrolling) */}
            <div className="mb-4">
              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-md"
              >
                Next Question →
              </button>
            </div>
            {result.isCorrect ? (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🎉</span>
                  <h3 className="text-2xl font-bold text-green-800">
                    Excellent Work!
                  </h3>
                </div>
                <p className="text-green-700 mb-2">
                  You got it right! Keep up the great work!
                </p>
                <p className="text-center text-sm text-gray-600 italic">
                  Next question in 2 seconds...
                </p>
              </div>
            ) : (
              <div>
                {timeLeft === 0 && !selectedAnswer ? (
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">⏰</span>
                      <h3 className="text-2xl font-bold text-orange-800">
                        Time's Up!
                      </h3>
                    </div>
                    <p className="text-orange-700 text-lg mb-4">
                      The correct answer was: <strong className="text-2xl">{result.correctAnswer}</strong>
                    </p>
                    <p className="text-gray-600 text-sm">Moving to next question...</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">🤔</span>
                        <h3 className="text-2xl font-bold text-orange-800">
                          Not quite right, but that's okay!
                        </h3>
                      </div>
                      <p className="text-orange-700">
                        Let's learn how to solve this together!
                      </p>
                    </div>
                    {result.methodSteps && (
                      <StepByStepExplanation
                        steps={result.methodSteps}
                        correctAnswer={result.correctAnswer}
                        onContinue={handleContinue}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
