import React, { useState } from "react";
import MealIntro from "../Components/MealIntro";
import MealPreferences from "../Components/MealPreferences";
import MealGoals from "../Components/MealGoals";
import MealLoading from "../Components/MealLoading";
import MealResults from "../Components/MealResults";
import "./MealPlans.css"; 

const MealPlans = () => {
  const [step, setStep] = useState(1);
  const [userSelections, setUserSelections] = useState({});
  const [mealPlan, setMealPlan] = useState(null);

  // Move to next step
  const nextStep = () => setStep((prev) => prev + 1);

  // Move to previous step
  const prevStep = () => setStep((prev) => prev - 1);

  // Collect form data from step component
  const handleData = (stepData) => {
    setUserSelections((prev) => ({ ...prev, ...stepData }));
    nextStep();
  };

  // Trigger meal plan generation via backend API
  const generateMealPlan = async () => {
    setStep(4); // show loading spinner

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getMealPlans", { //<------ INSERT API URL HERE (AYSHA)
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            preferences: userSelections.preferences,
            allergies: userSelections.allergies,
            types: userSelections.types,
          }),
        });

        const data = await response.json();
        setMealPlan(data);     // store result
        setStep(5);            // go to results screen
      } catch (error) {
        console.error("Failed to fetch meal plans:", error);
      }
    }, 1500); // simulated delay
  };

  return (
    <div className="meal-plans-container">
      {step === 1 && <MealIntro onNext={nextStep} />}
      {step === 2 && <MealPreferences onNext={handleData} onBack={prevStep} />}
      {step === 3 && <MealGoals onNext={generateMealPlan} onBack={prevStep} />}
      {step === 4 && <MealLoading />}
      {step === 5 && <MealResults meals={mealPlan} />}
    </div>
  );
};

export default MealPlans;