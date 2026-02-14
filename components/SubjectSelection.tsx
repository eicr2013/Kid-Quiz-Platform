'use client';

interface SubjectSelectionProps {
  onSelectSubject: (subject: string) => void;
  userName: string;
  onLogout: () => void;
  onOpenSettings: () => void;
  onOpenProgress: () => void;
  onOpenAdmin?: () => void;
}

const SUBJECTS = [
  { name: 'Mathematics', emoji: '🔢', color: 'from-blue-500 to-purple-500' },
  { name: 'Science', emoji: '🔬', color: 'from-green-500 to-teal-500' },
  { name: 'English', emoji: '📚', color: 'from-pink-500 to-rose-500' },
  { name: 'Sinhala', emoji: '🪷', color: 'from-amber-500 to-orange-500' },
  { name: 'Social Studies', emoji: '🌍', color: 'from-orange-500 to-yellow-500' },
  { name: 'Buddhism', emoji: '☸️', color: 'from-amber-600 to-yellow-600' },
];

export default function SubjectSelection({
  onSelectSubject,
  userName,
  onLogout,
  onOpenSettings,
  onOpenProgress,
  onOpenAdmin,
}: SubjectSelectionProps) {
  // Check if user is admin (teacher or admin)
  const isAdmin = userName.toLowerCase() === 'admin' || userName.toLowerCase() === 'teacher';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative">
      {/* User Info - Top Left */}
      <div className="fixed top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg border-2 border-purple-300 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <span className="font-bold text-gray-800">{userName}</span>
          <button
            onClick={onLogout}
            className="ml-2 text-xs text-red-600 hover:text-red-800 underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-50">
        {isAdmin && onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
          >
            👨‍🏫 Admin
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

          {/* Note for subjects */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Mathematics, Science, and Social Studies available now. English coming soon! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
