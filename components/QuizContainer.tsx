'use client';

import { useState } from 'react';
import { Question } from '@/types/question';
import QuizQuestion from './QuizQuestion';
import CategorySelection from './CategorySelection';
import SubjectSelection from './SubjectSelection';
import SettingsModal from './SettingsModal';
import ProgressReview from './ProgressReview';
import { useUser } from '@/contexts/UserContext';
import { useProgress } from '@/contexts/ProgressContext';

export default function QuizContainer() {
  const { user, login, logout } = useUser();
  const { recordAnswer } = useProgress();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const startNewSession = async (categories?: string[], subjectOverride?: string) => {
    try {
      setLoading(true);
      setError(null);
      const subjectToUse = subjectOverride ?? selectedSubject;
      // Build URL with categories and subject if provided
      const params = new URLSearchParams();
      if (categories && categories.length > 0) {
        params.append('categories', categories.join(','));
      }
      if (subjectToUse) {
        params.append('subject', subjectToUse);
      }
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const response = await fetch(`/api/quiz/session${queryString}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to create quiz session');
      }

      setQuestions(data.questions);
      setSessionId(data.sessionId);
      setCurrentQuestionIndex(0);
      setAnswers(new Map());
      setQuizComplete(false);
      setQuizStarted(true);
      setSelectedCategories(categories || []);
      if (subjectOverride) setSelectedSubject(subjectOverride);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelection = (categories: string[]) => {
    startNewSession(categories);
  };

  const handleRestartWithCategories = () => {
    setQuizStarted(false);
    setQuizComplete(false);
    setQuestions([]);
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
  };

  const handleBackToSubjects = () => {
    setQuizStarted(false);
    setQuizComplete(false);
    setQuestions([]);
    setAnswers(new Map());
    setCurrentQuestionIndex(0);
    setSelectedSubject(null);
    setSelectedCategories([]);
  };

  const handlePracticeCategory = (category: string, subject?: string) => {
    setShowProgress(false);
    startNewSession([category], subject);
  };

  const handleSelectSubject = (subject: string) => {
    if (subject !== 'Mathematics' && subject !== 'Science' && subject !== 'Social Studies' && subject !== 'English' && subject !== 'Buddhism') {
      alert(`${subject} is coming soon! For now, please try Mathematics, Science, English, Social Studies, or Buddhism. 🚀`);
      return;
    }
    setSelectedSubject(subject);
  };

  const handleAnswer = async (answer: string) => {
    if (!sessionId) return;

    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(new Map(answers.set(currentQuestion.id!, answer)));

    // Record answer in progress tracking
    const isCorrect = answer === currentQuestion.correctAnswer;
    recordAnswer(currentQuestion.category, isCorrect, selectedSubject || 'Mathematics');

    try {
      await fetch('/api/quiz/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          questionId: currentQuestion.id,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
        }),
      });
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      const userAnswer = answers.get(q.id!);
      if (userAnswer === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  // Brief loading until default user is set (no login screen)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show subject selection (go straight to game)
  if (!selectedSubject) {
    return (
      <>
        <SubjectSelection
          onSelectSubject={handleSelectSubject}
          onOpenSettings={() => setShowSettings(true)}
          onOpenProgress={() => setShowProgress(true)}
        />
        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <ProgressReview 
          isOpen={showProgress} 
          onClose={() => setShowProgress(false)}
          onPracticeCategory={handlePracticeCategory}
          subject={selectedSubject}
        />
      </>
    );
  }

  // Show category selection for selected subject
  if (!quizStarted) {
    return (
      <>
        <CategorySelection 
          onStartQuiz={handleCategorySelection} 
          onOpenSettings={() => setShowSettings(true)}
          onOpenProgress={() => setShowProgress(true)}
          onBackToSubjects={handleBackToSubjects}
          subject={selectedSubject}
        />
        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
        <ProgressReview 
          isOpen={showProgress} 
          onClose={() => setShowProgress(false)}
          onPracticeCategory={handlePracticeCategory}
          subject={selectedSubject}
        />
      </>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
        {/* Top Right Buttons */}
        <div className="fixed top-4 right-4 flex gap-2 z-50">
          <button
            onClick={handleRestartWithCategories}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            📚 Change Topics
          </button>
          <button
            onClick={handleBackToSubjects}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            🏠 Home
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-center">
            <span className="text-6xl mb-4 block">😕</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRestartWithCategories}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const score = calculateScore();
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 relative">
        {/* Top Right Buttons */}
        <div className="fixed top-4 right-4 flex gap-2 z-50">
          <button
            onClick={handleRestartWithCategories}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            📚 Change Topics
          </button>
          <button
            onClick={handleBackToSubjects}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            🏠 Home
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center">
            <span className="text-8xl mb-6 block">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz Complete!
            </h2>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 mb-6">
              <p className="text-6xl font-bold text-blue-600 mb-2">
                {score.correct}/{score.total}
              </p>
              <p className="text-xl text-gray-700">
                You scored {percentage}%
              </p>
            </div>
            <div className="mb-8">
              {percentage >= 80 ? (
                <p className="text-xl text-gray-700">
                  Fantastic job! You're a math superstar! ⭐
                </p>
              ) : percentage >= 60 ? (
                <p className="text-xl text-gray-700">
                  Great effort! Keep practicing and you'll get even better! 📚
                </p>
              ) : (
                <p className="text-xl text-gray-700">
                  Good try! Practice makes perfect. Let's try again! 💪
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => startNewSession(selectedCategories)}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
              >
                Same Topics Again
              </button>
              <button
                onClick={handleRestartWithCategories}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-lg"
              >
                Choose New Topics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 relative">
      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        <button
          onClick={() => setShowSettings(true)}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
        >
          ⚙️ Settings
        </button>
        <button
          onClick={handleRestartWithCategories}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
        >
          📚 Change Topics
        </button>
        <button
          onClick={handleBackToSubjects}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
        >
          🏠 Home
        </button>
      </div>
      
      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            {selectedSubject === 'Science' ? '🔬 Science' : selectedSubject === 'English' ? '📚 English' : selectedSubject === 'Social Studies' ? '🌍 Social Studies' : selectedSubject === 'Buddhism' ? '☸️ Buddhism' : '🔢 Math'} Quiz Challenge! 🎯
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Answer each question carefully and learn as you go!
          </p>
          {selectedCategories.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-3 inline-block">
              <p className="text-sm text-gray-600 mb-1">Practicing:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedCategories.map(category => (
                  <span
                    key={category}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
