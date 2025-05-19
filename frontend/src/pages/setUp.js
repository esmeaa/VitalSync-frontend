import React, { useState } from 'react';
import SetUpStep from '../Components/SetUpStep';
import { useNavigate } from "react-router-dom";
import "./setUp.css";

const SetUp = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    ethnicity: "",
  });

  const [step, setStep] = useState("gender");
  const steps = ["gender", "age", "height", "weight", "ethnicity"];

  const currentIndex = steps.indexOf(step);
  const isLastStep = step === steps[steps.length - 1];

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    if (!isLastStep) {
      setStep(steps[currentIndex + 1]);
    } else {
      try {
        const userId = localStorage.getItem("userId") || "testUserId";
        const response = await fetch(`http://localhost:3001/api/bmi-feedback`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, ...formData }),
        });

        if (!response.ok) throw new Error("Failed to submit setup data");

        const data = await response.json();
        alert("Setup completed! Your BMI feedback: " + data.feedback);
        navigate("/home");
      } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while submitting your data.");
      }
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const isStepComplete = () => {
    const value = formData[step];
    return value !== "" && value !== null && value !== undefined;
  };

  return (
    <div className="setup-wrapper">
      <SetUpStep step={step} value={formData[step]} onChange={handleChange} />
      <div className="setup-buttons">
        {step !== "gender" && (
          <button className="back" onClick={prevStep}>Back</button>
        )}
        <button className="continue" onClick={nextStep} disabled={!isStepComplete()}>
          {isLastStep ? "Finish" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default SetUp;
