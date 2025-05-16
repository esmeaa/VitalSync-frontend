import React, { useState } from "react";
import MealIntro from "../Components/MealIntro";
import MealPreferences from "../Components/MealPreferences";
import MealLoading from "../Components/MealLoading";
import MealResults from "../Components/MealResults";
import "./MealPlans.css";

const MealPlans = () => {
  const [step, setStep] = useState(1);
  const [userSelections, setUserSelections] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleData = (stepData) => {
    setUserSelections((prev) => ({ ...prev, ...stepData }));
    nextStep();
  };

  const generateMealPlan = () => {
    setStep(3); // loading screen
    setTimeout(() => setStep(4), 1500); // go to results
  };

  return (
    <div className="meal-plans-container">
      {step === 1 && <MealIntro onNext={nextStep} />}
      {step === 2 && <MealPreferences onNext={handleData} />}
      {step === 3 && <MealLoading />}
      {step === 4 && <MealResults meals={userSelections} onBack={() => setStep(2)} />}
    </div>
  );
};

export default MealPlans;