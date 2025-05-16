// Step 2: Dietary Preference Only
import React, { useState } from "react";
import "../pages/MealPlans.css";

const dietOptions = ["Vegan", "Vegetarian", "None"];

const MealPreferences = ({ onNext }) => {
  const [preference, setPreference] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!preference) {
      setError("Please select one option to continue.");
      return;
    }
    setError("");
    onNext({ preference });
  };

  return (
    <div className="meal-step">
      <h2 className="step-title">Meal Plans</h2>
      <div className="form-section">
        <h3 className="form-title">Dietary Preference</h3>
        <p>Please choose one of the following options:</p>
        {error && <p className="error-message">{error}</p>}
        <div className="option-grid">
          {dietOptions.map((opt) => (
            <label key={opt} className={`circle-option ${preference === opt ? "selected" : ""}`}>
              <input
                type="radio"
                name="diet"
                value={opt}
                onChange={() => setPreference(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button className="primary-btn" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default MealPreferences;