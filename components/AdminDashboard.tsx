'use client';

import { useState, useEffect } from 'react';
import { CategoryProgress } from '@/contexts/ProgressContext';

interface UserProgressData {
  userName: string;
  lastActivity: string;
  categories: Record<string, CategoryProgress>;
}

interface ReviewQuestion {
  id: string;
  subject: string;
  category: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  source: 'database' | 'template';
  templateId?: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUBJECTS = ['Mathematics', 'Science', 'Social Studies'] as const;

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [tab, setTab] = useState<'progress' | 'questions'>('progress');
  const [allUsersProgress, setAllUsersProgress] = useState<Record<string, UserProgressData>>({});
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'weak' | 'strong'>('all');

  // Review questions state
  const [reviewSubject, setReviewSubject] = useState<string>('Mathematics');
  const [reviewCategory, setReviewCategory] = useState<string>('');
  const [categoriesForSubject, setCategoriesForSubject] = useState<{ category: string; questionCount: number }[]>([]);
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAllProgress();
    }
  }, [isOpen]);

  // Load categories when subject changes (for Review questions tab)
  useEffect(() => {
    if (!isOpen || tab !== 'questions') return;
    const loadCategories = async () => {
      try {
        const res = await fetch(`/api/quiz/categories?subject=${encodeURIComponent(reviewSubject)}`);
        if (res.ok) {
          const data = await res.json();
          setCategoriesForSubject(data.categories || []);
          if (!reviewCategory && data.categories?.length) {
            setReviewCategory(''); // All
          }
        }
      } catch (e) {
        console.error('Failed to load categories:', e);
        setCategoriesForSubject([]);
      }
    };
    loadCategories();
  }, [isOpen, tab, reviewSubject]);

  // Load questions when subject/category changes
  useEffect(() => {
    if (!isOpen || tab !== 'questions') return;
    const loadQuestions = async () => {
      setReviewLoading(true);
      try {
        const params = new URLSearchParams({ subject: reviewSubject });
        if (reviewCategory) params.set('category', reviewCategory);
        const res = await fetch(`/api/admin/questions?${params}`);
        if (res.ok) {
          const data = await res.json();
          setReviewQuestions(data.questions || []);
        } else {
          setReviewQuestions([]);
        }
      } catch (e) {
        console.error('Failed to load questions:', e);
        setReviewQuestions([]);
      } finally {
        setReviewLoading(false);
      }
    };
    loadQuestions();
  }, [isOpen, tab, reviewSubject, reviewCategory]);

  const loadAllProgress = async () => {
    try {
      const res = await fetch('/api/admin/progress');
      if (res.ok) {
        const data = await res.json();
        setAllUsersProgress(data);
        return;
      }
    } catch (e) {
      console.error('Failed to load admin progress from API:', e);
    }
    // Fallback: localStorage (same device only)
    try {
      const adminListKey = 'adminProgressList';
      const existingData = localStorage.getItem(adminListKey);
      if (existingData) {
        setAllUsersProgress(JSON.parse(existingData));
      }
    } catch (error) {
      console.error('Failed to load admin progress:', error);
    }
  };

  if (!isOpen) return null;

  const userNames = Object.keys(allUsersProgress);
  const selectedUserData = selectedUser ? allUsersProgress[selectedUser] : null;

  const getSuccessRate = (cat: CategoryProgress) => {
    if (cat.totalAttempted === 0) return 0;
    return Math.round((cat.totalCorrect / cat.totalAttempted) * 100);
  };

  const getColorClass = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Calculate aggregate statistics
  const calculateAggregateStats = () => {
    const stats: Record<string, { category: string; subject: string; totalAttempts: number; totalCorrect: number; users: number }> = {};
    
    Object.values(allUsersProgress).forEach(userData => {
      Object.values(userData.categories).forEach(catProgress => {
        const key = `${catProgress.subject}:${catProgress.category}`;
        if (!stats[key]) {
          stats[key] = {
            category: catProgress.category,
            subject: catProgress.subject,
            totalAttempts: 0,
            totalCorrect: 0,
            users: 0,
          };
        }
        stats[key].totalAttempts += catProgress.totalAttempted;
        stats[key].totalCorrect += catProgress.totalCorrect;
        stats[key].users += 1;
      });
    });

    return Object.values(stats).sort((a, b) => {
      const rateA = a.totalCorrect / a.totalAttempts;
      const rateB = b.totalCorrect / b.totalAttempts;
      return rateA - rateB; // Weakest first
    });
  };

  const aggregateStats = calculateAggregateStats();
  const weakAreas = aggregateStats.filter(stat => {
    const rate = stat.totalCorrect / stat.totalAttempts;
    return rate < 0.70 && stat.totalAttempts >= 10;
  }).slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">👨‍🏫 Admin Dashboard</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => setTab('progress')}
              className={`px-4 py-2 rounded-lg font-semibold ${tab === 'progress' ? 'bg-white text-indigo-600' : 'bg-indigo-500/50 text-white hover:bg-indigo-500/70'}`}
            >
              📊 Student Progress
            </button>
            <button
              onClick={() => setTab('questions')}
              className={`px-4 py-2 rounded-lg font-semibold ${tab === 'questions' ? 'bg-white text-indigo-600' : 'bg-indigo-500/50 text-white hover:bg-indigo-500/70'}`}
            >
              📝 Review Questions
            </button>
          </div>
          <p className="mt-2 text-indigo-100">
            {tab === 'progress' ? 'Monitor and analyze student performance across all subjects' : 'Review questions and answers by subject and category'}
          </p>
        </div>
        
        <div className="p-6">
          {tab === 'questions' ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={reviewSubject}
                    onChange={(e) => { setReviewSubject(e.target.value); setReviewCategory(''); }}
                    className="border border-gray-300 rounded-lg px-4 py-2 min-w-[180px]"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category (subsection)</label>
                  <select
                    value={reviewCategory}
                    onChange={(e) => setReviewCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 min-w-[200px]"
                  >
                    <option value="">All categories</option>
                    {categoriesForSubject.map(c => (
                      <option key={c.category} value={c.category}>
                        {c.category} ({c.questionCount} questions)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {reviewLoading ? (
                <p className="text-gray-500">Loading questions…</p>
              ) : reviewQuestions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No questions found for this subject{reviewCategory ? ` and category (${reviewCategory})` : ''}.
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 font-medium">{reviewQuestions.length} question(s)</p>
                  <div className="space-y-6">
                    {reviewQuestions.map((q, idx) => (
                      <div key={q.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-500">#{idx + 1}</span>
                          <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs">{q.category}</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs">{q.difficulty}</span>
                          {q.source === 'template' && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs">Template (sample)</span>
                          )}
                        </div>
                        <p className="font-medium text-gray-900 mb-3">{q.question}</p>
                        <div className="space-y-1 mb-3">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`py-1.5 px-3 rounded-lg ${opt === q.correctAnswer ? 'bg-green-100 border border-green-400 text-green-800 font-medium' : 'bg-white border border-gray-200 text-gray-700'}`}
                            >
                              {opt === q.correctAnswer && '✓ '}{opt}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">Correct answer:</span>{' '}
                          <span className="text-green-700 font-semibold">{q.correctAnswer}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : userNames.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📊</span>
              <p className="text-xl text-gray-600">No student data available yet</p>
              <p className="text-sm text-gray-500 mt-2">Students' progress will appear here as they practice</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Statistics */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">📈 Overall Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm">Total Students</p>
                    <p className="text-3xl font-bold text-indigo-600">{userNames.length}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm">Total Categories Practiced</p>
                    <p className="text-3xl font-bold text-indigo-600">{aggregateStats.length}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm">Total Questions Attempted</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {aggregateStats.reduce((sum, stat) => sum + stat.totalAttempts, 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Class-Wide Weak Areas */}
              {weakAreas.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-orange-800 mb-4">⚠️ Class-Wide Areas Needing Attention</h3>
                  <p className="text-gray-600 mb-4">Categories where students are struggling (below 70% success rate)</p>
                  <div className="space-y-3">
                    {weakAreas.map((stat) => {
                      const rate = Math.round((stat.totalCorrect / stat.totalAttempts) * 100);
                      return (
                        <div key={`${stat.subject}:${stat.category}`} className="bg-white rounded-lg p-4 shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 text-lg">
                                {stat.category}
                                <span className="ml-2 text-sm text-gray-500">
                                  ({stat.subject === 'Science' ? '🔬' : '🔢'} {stat.subject})
                                </span>
                              </h4>
                              <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                <span>{stat.users} students practicing</span>
                                <span>{stat.totalAttempts} total attempts</span>
                                <span className="text-green-600">✓ {stat.totalCorrect}</span>
                                <span className="text-red-600">✗ {stat.totalAttempts - stat.totalCorrect}</span>
                              </div>
                            </div>
                            <span className={`px-4 py-2 rounded-full font-bold text-lg ${getColorClass(rate)}`}>
                              {rate}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 bg-orange-100 rounded-lg p-4">
                    <p className="text-orange-800 font-semibold">💡 Recommendation:</p>
                    <p className="text-orange-700 text-sm mt-1">
                      Consider reviewing these topics in class and providing additional practice materials
                    </p>
                  </div>
                </div>
              )}

              {/* Individual Students List */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">👥 Individual Student Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userNames.map((userName) => {
                    const userData = allUsersProgress[userName];
                    const categories = Object.values(userData.categories);
                    const totalAttempts = categories.reduce((sum, cat) => sum + cat.totalAttempted, 0);
                    const totalCorrect = categories.reduce((sum, cat) => sum + cat.totalCorrect, 0);
                    const overallRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

                    return (
                      <button
                        key={userName}
                        onClick={() => setSelectedUser(userName)}
                        className="bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-lg p-4 text-left transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">👤</span>
                          <h4 className="font-bold text-gray-800 text-lg">{userName}</h4>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{categories.length} categories practiced</p>
                          <p>{totalAttempts} questions attempted</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">Success Rate:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getColorClass(overallRate)}`}>
                              {overallRate}%
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected User Detail */}
              {selectedUserData && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-purple-800">
                      📊 Detailed Progress: {selectedUser}
                    </h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="px-4 py-2 bg-purple-200 hover:bg-purple-300 rounded-lg text-purple-800 font-semibold"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-3">
                    {Object.values(selectedUserData.categories)
                      .sort((a, b) => b.totalAttempted - a.totalAttempted)
                      .map((cat) => {
                        const rate = getSuccessRate(cat);
                        return (
                          <div key={`${cat.subject}:${cat.category}`} className="bg-white rounded-lg p-4 shadow">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800">
                                  {cat.category}
                                  <span className="ml-2 text-sm text-gray-500">
                                    ({cat.subject === 'Science' ? '🔬' : '🔢'} {cat.subject})
                                  </span>
                                </h4>
                                <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                  <span>Attempted: {cat.totalAttempted}</span>
                                  <span className="text-green-600">✓ {cat.totalCorrect}</span>
                                  <span className="text-red-600">✗ {cat.totalWrong}</span>
                                </div>
                              </div>
                              <span className={`px-4 py-2 rounded-full font-bold text-lg ${getColorClass(rate)}`}>
                                {rate}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
