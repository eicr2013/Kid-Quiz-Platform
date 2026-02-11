'use client';

import { useState, useEffect } from 'react';

interface Topic {
  topic: string;
  questionCount: number;
}

interface TopicSelectionProps {
  onStartQuiz: (selectedTopics: string[]) => void;
}

export default function TopicSelection({ onStartQuiz }: TopicSelectionProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/quiz/topics');
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }
      const data = await response.json();
      setTopics(data.topics);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const selectAll = () => {
    setSelectedTopics(topics.map(t => t.topic));
  };

  const clearAll = () => {
    setSelectedTopics([]);
  };

  const handleStartQuiz = () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic!');
      return;
    }
    onStartQuiz(selectedTopics);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading topics...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-2">
              Choose Your Topics
            </h1>
            <p className="text-gray-600 text-lg">
              Select one or more topics to practice. You'll get 10 questions from your chosen topics!
            </p>
          </div>

          {/* Selected Count */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg">
              <span className="font-bold text-purple-600">{selectedTopics.length}</span>
              {' '}topic{selectedTopics.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          {/* Select All / Clear All Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={selectAll}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {topics.map(({ topic, questionCount }) => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTopics.includes(topic)
                    ? 'border-purple-500 bg-purple-100 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-1">{topic}</p>
                    <p className="text-sm text-gray-500">{questionCount} questions</p>
                  </div>
                  {selectedTopics.includes(topic) && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Start Quiz Button */}
          <button
            onClick={handleStartQuiz}
            disabled={selectedTopics.length === 0}
            className={`w-full py-4 px-8 rounded-lg font-bold text-xl transition-all ${
              selectedTopics.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {selectedTopics.length === 0 ? 'Select Topics to Start' : 'Start Quiz! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
