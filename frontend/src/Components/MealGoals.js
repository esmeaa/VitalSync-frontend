// Step 3: Goals (Calories, Time, Servings)
import React, { useState } from "react";
import "../pages/MealPlans.css";

const MealGoals = ({ onNext, onBack }) => {
  const [goals, setGoals] = useState({
    calories: "",
    time: "",
    servings: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setGoals((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    const newErrors = {};
    if (!goals.calories) newErrors.calories = "Please select a calorie goal.";
    if (!goals.time) newErrors.time = "Please select a cooking time.";
    if (!goals.servings) newErrors.servings = "Please select servings.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(goals);
  };

  return (
    <div className="meal-step">
      <h2 className="step-title">Meal Plans</h2>

      <div className="form-section">
        <h3 className="form-title">Caloric Goal</h3>
        <p>What is your daily caloric intake goal?</p>
        {errors.calories && <p className="error-message">{errors.calories}</p>}
        <div className="option-grid">
          {["<1500", "1500-2000", ">2000", "No goal"].map((opt) => (
            <label key={opt} className={`circle-option ${goals.calories === opt ? "selected" : ""}`}>
              <input type="radio" name="calories" onChange={() => handleChange("calories", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-title">Cooking Time Preference</h3>
        <p>How much time are you willing to spend cooking each meal?</p>
        {errors.time && <p className="error-message">{errors.time}</p>}
        <div className="option-grid">
          {["<15 minutes", "15-30 minutes", ">30 minutes"].map((opt) => (
            <label key={opt} className={`circle-option ${goals.time === opt ? "selected" : ""}`}>
              <input type="radio" name="time" onChange={() => handleChange("time", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-title">Number Of Servings</h3>
        <p>How many servings do you need per meal?</p>
        {errors.servings && <p className="error-message">{errors.servings}</p>}
        <div className="option-grid">
          {["1", "2", "3-4", ">4"].map((opt) => (
            <label key={opt} className={`circle-option ${goals.servings === opt ? "selected" : ""}`}>
              <input type="radio" name="servings" onChange={() => handleChange("servings", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button onClick={onBack} className="secondary-btn">Back</button>
        <button onClick={handleCreate} className="primary-btn">Create</button>
      </div>
    </div>
  );
};

export default MealGoals;