'use client';

import { useRef, useEffect, useState } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** URL of the how-to video (default: /videos/Demo.mov) */
  videoSrc?: string;
}

const DEFAULT_VIDEO_SRC = '/videos/Demo.mov';

export default function DemoModal({ isOpen, onClose, videoSrc = DEFAULT_VIDEO_SRC }: DemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setVideoError(false);
    videoRef.current?.play().catch(() => {});
    return () => {
      videoRef.current?.pause();
    };
  }, [isOpen, videoSrc]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">🎬 How to use this app</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-4 bg-gray-900 aspect-video flex items-center justify-center min-h-[200px]">
          {videoError ? (
            <div className="text-center text-gray-400 p-6">
              <p className="font-medium mb-2">Video not found</p>
              <p className="text-sm">Add <code className="bg-gray-800 px-1 rounded">public/videos/Demo.mov</code> (or your how-to video).</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              className="max-w-full max-h-[70vh] w-full"
              onError={() => setVideoError(true)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <p className="px-6 py-3 text-sm text-gray-500 text-center">
          Select a subject → choose topics → Start Quiz! 🚀
        </p>
      </div>
    </div>
  );
}
