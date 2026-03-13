'use client';

import { useState, useEffect } from 'react';
import { useSound } from '@/contexts/SoundContext';

interface Category {
  category: string;
  questionCount: number;
}

interface CategorySelectionProps {
  onStartQuiz: (selectedCategories: string[]) => void;
  onOpenSettings?: () => void;
  onOpenProgress?: () => void;
  onOpenDemo?: () => void;
  onBackToSubjects?: () => void;
  subject?: string | null;
}

// Emoji mapping for categories
const CATEGORY_EMOJIS: Record<string, string> = {
  // Mathematics
  'Addition': '➕',
  'Subtraction': '➖',
  'Multiplication': '✖️',
  'Division': '➗',
  'Shapes and Measure': '📐',
  'Fractions': '🍰',
  'Mixed Operations': '🔢',
  'Units of Time': '⏰',
  'Money': '💰',
  'Measurement - Weight': '⚖️',
  'Measurement - Length': '📏',
  'Measurement - Capacity': '🥤',
  'Place Value': '🔢',
  'Number Properties': '🔢',
  // Science
  'Rocks and Soils': '🪨',
  'Living Things': '🌱',
  'Animals': '🦁',
  'Plants': '🌿',
  'Human Body': '👤',
  'Food Chains': '🦊',
  'Water Cycle': '💧',
  'Materials': '🧪',
  'Forces': '⚡',
  // Computing
  'Internet and Web': '🌐',
  'Internet Safety': '🔒',
  'Storage Devices': '💾',
  'Printers': '🖨️',
  'Input Devices': '⌨️',
  'File Management': '📁',
  'Software Applications': '💿',
  'Hardware': '🖥️',
  // Education in Human Values
  'Values of Love': '❤️',
  'Respect': '🙏',
  'Truth and Perseverance': '✨',
  'Contentment': '😊',
  'Kindness and Compassion': '🤗',
  'Peace': '☮️',
  'Patience': '⏳',
  'Truth': '💯',
  'Environmental Care': '🌍',
  'Kindness to Animals': '🐾',
  'Helping the Poor and Needy': '🤝',
  'Anger Management': '😌',
  'Respect for Teachers': '👨‍🏫',
  'Understanding Values': '💡',
  'Friendship': '👫',
  // Social Studies
  'Community': '🏘️',
  'Family and Roles': '👨‍👩‍👧‍👦',
  'Rules and Laws': '📜',
  'Maps and Places': '🗺️',
  'Culture and Festivals': '🎉',
  'Citizenship': '🏛️',
  'Environment': '🌳',
  'Goods and Services': '🛒',
  'History and Heritage': '🏛️',
  'Transport': '🚌',
  // English
  'Listening Comprehension': '👂',
  'Grammar - Verbs': '📝',
  'Grammar - Adjectives': '📝',
  'Grammar - Pronouns': '📝',
  'Grammar - Tenses': '📝',
  'Grammar - Modals': '📝',
  'Vocabulary - Opposites': '📖',
  'Wh-questions': '❓',
  'Prepositions': '📍',
  'Comprehension': '📄',
  // Sinhala (Comprehension already above)
  'Letters and Sounds': '🔤',
  'Vocabulary': '📖',
  'Grammar': '📝',
  'Word Meaning': '💬',
  // Buddhism
  'Buddha and His Life': '🙏',
  'Temple and Worship': '🛕',
  'Precepts and Morality': '📿',
  'Buddhist History - Sri Lanka': '🇱🇰',
  'Jataka Stories': '📖',
  'Good Qualities': '💛',
};

// Subject emoji mapping
const SUBJECT_EMOJIS: Record<string, string> = {
  'Mathematics': '🔢',
  'Science': '🔬',
  'English': '📚',
  'Social Studies': '🌍',
  'Buddhism': '☸️',
  'Computing': '💻',
  'Education in Human Values': '💎',
};

export default function CategorySelection({ onStartQuiz, onOpenSettings, onOpenProgress, onOpenDemo, onBackToSubjects, subject }: CategorySelectionProps) {
  const { playClick } = useSound();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [subject]);

  const fetchCategories = async () => {
    try {
      const params = new URLSearchParams();
      if (subject) {
        params.append('subject', subject);
      }
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`/api/quiz/categories${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    playClick();
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAll = () => {
    playClick();
    setSelectedCategories(categories.map(c => c.category));
  };

  const clearAll = () => {
    playClick();
    setSelectedCategories([]);
  };

  const handleStartQuiz = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category!');
      return;
    }
    onStartQuiz(selectedCategories);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
          <div className="text-red-500 text-center">
            <p className="text-xl font-bold mb-2">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 relative">
      {/* Top Right Buttons - same location as quiz page */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        {onOpenDemo && (
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 bg-amber-400 text-gray-800 rounded-lg font-semibold hover:bg-amber-300 transition-colors shadow-lg border-2 border-amber-500"
          >
            🎬 Demo
          </button>
        )}
        {onOpenProgress && (
          <button
            onClick={onOpenProgress}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            📊 Progress
          </button>
        )}
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            ⚙️ Settings
          </button>
        )}
        {onBackToSubjects && (
          <button
            onClick={onBackToSubjects}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
          >
            🏠 Home
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-2">
              {SUBJECT_EMOJIS[subject || 'Mathematics'] || '📚'} {subject || 'Mathematics'} Topics
            </h1>
            <p className="text-gray-600 text-lg">
              Select one or more topics. You'll get 10 questions to practice!
            </p>
          </div>

          {/* Selected Count */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg">
              <span className="font-bold text-purple-600">{selectedCategories.length}</span>
              {' '}topic{selectedCategories.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          {/* Start Quiz Button - Top (visible without scrolling) */}
          <button
            onClick={handleStartQuiz}
            disabled={selectedCategories.length === 0}
            className={`w-full py-4 px-8 rounded-lg font-bold text-xl transition-all mb-6 ${
              selectedCategories.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {selectedCategories.length === 0 ? 'Select Topics to Start' : 'Start Quiz! 🚀'}
          </button>

          {/* Select All / Clear All Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={selectAll}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {categories.map(({ category, questionCount }) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedCategories.includes(category)
                    ? 'border-purple-500 bg-purple-100 shadow-lg transform scale-105'
                    : 'border-gray-300 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{CATEGORY_EMOJIS[category] || '📚'}</span>
                      <p className="font-bold text-gray-800 text-xl">{category}</p>
                    </div>
                    <p className="text-sm text-gray-500">{questionCount} questions available</p>
                  </div>
                  {selectedCategories.includes(category) && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Start Quiz Button - Bottom */}
          <button
            onClick={handleStartQuiz}
            disabled={selectedCategories.length === 0}
            className={`w-full py-4 px-8 rounded-lg font-bold text-xl transition-all ${
              selectedCategories.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {selectedCategories.length === 0 ? 'Select Topics to Start' : 'Start Quiz! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
