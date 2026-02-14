'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useSettings();
  const [timerEnabled, setTimerEnabled] = useState(settings.timerEnabled);
  const [timerSeconds, setTimerSeconds] = useState(settings.timerSeconds);

  useEffect(() => {
    setTimerEnabled(settings.timerEnabled);
    setTimerSeconds(settings.timerSeconds);
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      timerEnabled,
      timerSeconds,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Timer Enable/Disable */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">Enable Timer</label>
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                timerEnabled ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  timerEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Timer Duration */}
          {timerEnabled && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Time per Question (seconds)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  value={timerSeconds}
                  onChange={(e) => setTimerSeconds(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-2xl font-bold text-blue-600 w-16 text-center">
                  {timerSeconds}s
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15s</span>
                <span>180s</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
