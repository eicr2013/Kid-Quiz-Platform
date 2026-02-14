'use client';

import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { CategoryProgress } from '@/contexts/ProgressContext';

const SUBJECT_EMOJIS: Record<string, string> = {
  'Mathematics': '🔢',
  'Science': '🔬',
  'English': '📚',
  'Sinhala': '🪷',
  'Social Studies': '🌍',
  'Buddhism': '☸️',
};

interface ProgressReviewProps {
  isOpen: boolean;
  onClose: () => void;
  onPracticeCategory: (category: string, subject?: string) => void;
  subject?: string | null;
}

export default function ProgressReview({ isOpen, onClose, onPracticeCategory, subject }: ProgressReviewProps) {
  const { getAllProgress, getWeakCategories, getStrongCategories } = useProgress();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string | null>(subject || null);
  
  if (!isOpen) return null;
  
  // If on home page (no subject selected), show all subjects or let user filter
  // If within a subject, show only that subject's progress
  const currentSubject = subject || selectedSubjectFilter;
  const allProgress = currentSubject ? getAllProgress(currentSubject) : getAllProgress();
  const weakCategories = currentSubject ? getWeakCategories(currentSubject) : getWeakCategories();
  const strongCategories = currentSubject ? getStrongCategories(currentSubject) : getStrongCategories();

  const getSuccessRate = (cat: CategoryProgress) => {
    if (cat.totalAttempted === 0) return 0;
    return Math.round((cat.totalCorrect / cat.totalAttempted) * 100);
  };

  const getColorClass = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">
              📊 {currentSubject ? `${SUBJECT_EMOJIS[currentSubject] || '📚'} ${currentSubject}` : 'My'} Progress
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Subject Filter - only show if not within a specific subject */}
          {!subject && (
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setSelectedSubjectFilter(null)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  !selectedSubjectFilter
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Subjects
              </button>
              {(['Mathematics', 'Science', 'English', 'Sinhala', 'Social Studies', 'Buddhism'] as const).map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubjectFilter(subj)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedSubjectFilter === subj
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {SUBJECT_EMOJIS[subj]} {subj === 'Mathematics' ? 'Math' : subj}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6">

        {allProgress.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🎯</span>
            <p className="text-xl text-gray-600">Start practicing to see your progress!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Areas to Improve */}
            {weakCategories.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                  <span>💪</span>
                  <span>Areas to Improve</span>
                </h3>
                <div className="space-y-3">
                  {weakCategories.map((cat) => (
                    <div
                      key={`${cat.subject}:${cat.category}`}
                      className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{cat.category}</h4>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>Attempted: {cat.totalAttempted}</span>
                            <span className="text-green-600">✓ {cat.totalCorrect}</span>
                            <span className="text-red-600">✗ {cat.totalWrong}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-4 py-2 rounded-full font-bold text-lg ${getColorClass(
                              getSuccessRate(cat)
                            )}`}
                          >
                            {getSuccessRate(cat)}%
                          </span>
                          <button
                            onClick={() => onPracticeCategory(cat.category, cat.subject)}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                          >
                            Practice
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strong Areas */}
            {strongCategories.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  <span>Strong Areas</span>
                </h3>
                <div className="space-y-3">
                  {strongCategories.map((cat) => (
                    <div
                      key={`${cat.subject}:${cat.category}`}
                      className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{cat.category}</h4>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>Attempted: {cat.totalAttempted}</span>
                            <span className="text-green-600">✓ {cat.totalCorrect}</span>
                            <span className="text-red-600">✗ {cat.totalWrong}</span>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full font-bold text-lg ${getColorClass(
                            getSuccessRate(cat)
                          )}`}
                        >
                          {getSuccessRate(cat)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Categories */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span>
                <span>All Categories</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allProgress
                  .sort((a, b) => b.totalAttempted - a.totalAttempted)
                  .map((cat) => (
                    <div
                      key={`${cat.subject}:${cat.category}`}
                      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {cat.category}
                            {!currentSubject && (
                              <span className="ml-2 text-xs text-gray-500">
                                ({SUBJECT_EMOJIS[cat.subject] || '📚'})
                              </span>
                            )}
                          </h4>
                          <div className="flex gap-3 text-xs text-gray-600 mt-1">
                            <span>{cat.totalAttempted} questions</span>
                            <span className="text-green-600">✓ {cat.totalCorrect}</span>
                            <span className="text-red-600">✗ {cat.totalWrong}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full font-bold ${getColorClass(
                            getSuccessRate(cat)
                          )}`}
                        >
                          {getSuccessRate(cat)}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
