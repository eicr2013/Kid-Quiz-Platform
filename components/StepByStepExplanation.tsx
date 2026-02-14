'use client';

import { MethodStep } from '@/types/question';

interface StepByStepExplanationProps {
  steps: MethodStep[];
  correctAnswer: string;
  onContinue?: () => void;
}

export default function StepByStepExplanation({
  steps,
  correctAnswer,
  onContinue,
}: StepByStepExplanationProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 my-4 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">💡</span>
        <h3 className="text-xl font-bold text-orange-800">
          Let's Learn Together!
        </h3>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-green-200">
        <p className="text-sm text-gray-600 mb-1">The correct answer is:</p>
        <p className="text-2xl font-bold text-green-600">{correctAnswer}</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-gray-800 mb-3">
          Complete Solution:
        </h4>
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              <p className="text-gray-800 leading-relaxed flex-1">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
        {onContinue && (
          <button
            onClick={onContinue}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-md mt-4"
          >
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
}
