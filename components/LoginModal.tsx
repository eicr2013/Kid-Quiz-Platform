'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (name: string, password?: string) => void;
}

export default function LoginModal({ isOpen, onLogin }: LoginModalProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isAdminUser = name.trim().toLowerCase() === 'admin' || name.trim().toLowerCase() === 'teacher';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    // For admin/teacher, require password
    if (isAdminUser && !password.trim()) {
      setError('Password required for admin access');
      return;
    }

    onLogin(name.trim(), password.trim() || undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-4 border-purple-300">
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">👋</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600">What's your name?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-purple-500 transition-colors"
              autoFocus
              maxLength={30}
            />
          </div>

          {/* Show password field for admin/teacher */}
          {isAdminUser && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-indigo-600">🔒 Admin Access</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">Admin password is required for teacher/admin accounts</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm font-semibold">❌ {error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={!name.trim() || (isAdminUser && !password.trim())}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdminUser ? '🔐 Admin Login' : 'Start Learning! 🚀'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Your progress will be saved locally on this device
        </p>
      </div>
    </div>
  );
}
