'use client';

import { useState } from 'react';
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
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If on last step and user clicks Finish, show all steps
      setShowAllSteps(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleShowAll = () => {
    setShowAllSteps(true);
  };

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

      {!showAllSteps ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 border-2 border-blue-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {steps[currentStep].step}
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {steps[currentStep].detail}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={handleShowAll}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
              >
                Show All Steps
              </button>
            </div>
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
            >
              {currentStep < steps.length - 1 ? 'Next Step →' : 'Finish'}
            </button>
          </div>
        </div>
      ) : (
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
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-md"
            >
              Continue to Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
