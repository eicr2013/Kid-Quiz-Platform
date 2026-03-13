'use client';

interface SubjectSelectionProps {
  onSelectSubject: (subject: string) => void;
  onOpenSettings: () => void;
  onOpenProgress: () => void;
  onOpenDemo?: () => void;
}

const SUBJECTS = [
  { name: 'Mathematics', emoji: '🔢', color: 'from-blue-500 to-purple-500' },
  { name: 'Science', emoji: '🔬', color: 'from-green-500 to-teal-500' },
  { name: 'English', emoji: '📚', color: 'from-pink-500 to-rose-500' },
  { name: 'Social Studies', emoji: '🌍', color: 'from-orange-500 to-yellow-500' },
  { name: 'Buddhism', emoji: '☸️', color: 'from-amber-600 to-yellow-600' },
  { name: 'Computing', emoji: '💻', color: 'from-blue-600 to-cyan-500' },
  { name: 'Education in Human Values', emoji: '💎', color: 'from-pink-600 to-rose-600' },
];

export default function SubjectSelection({
  onSelectSubject,
  onOpenSettings,
  onOpenProgress,
  onOpenDemo,
}: SubjectSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative">
      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        {onOpenDemo && (
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 bg-amber-400 text-gray-800 rounded-lg font-semibold hover:bg-amber-300 transition-colors shadow-lg border-2 border-amber-500"
          >
            🎬 Demo
          </button>
        )}
        <button
          onClick={onOpenProgress}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
        >
          📊 Progress
        </button>
        <button
          onClick={onOpenSettings}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border-2 border-gray-200"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Choose Your Subject! 📖
            </h1>
            <p className="text-gray-600 text-lg">
              Select a subject to start practicing
            </p>
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUBJECTS.map((subject) => (
              <button
                key={subject.name}
                onClick={() => onSelectSubject(subject.name)}
                className={`group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${subject.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
              >
                <div className="text-center">
                  <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {subject.emoji}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {subject.name}
                  </h2>
                  <p className="text-white opacity-90">
                    Practice and improve!
                  </p>
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
