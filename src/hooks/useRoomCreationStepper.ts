import { useState } from "react";

export function useRoomCreationStepper() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetStepper = () => {
    setCurrentStep(0);
  };

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetStepper,
  };
}
