// Step 2: Dietary Preferences + Allergies + Meal Types
import React, { useState } from "react";
import "../pages/MealPlans.css";

const options = {
  preferences: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "No preferences"],
  allergies: ["Nuts", "Dairy", "Shellfish", "Eggs", "No allergies"],
  types: ["Breakfast", "Lunch", "Dinner", "Snacks"]
};

const MealPreferences = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState({
    preferences: [],
    allergies: [],
    types: []
  });
  const [otherAllergy, setOtherAllergy] = useState("");
  const [errors, setErrors] = useState({});

  const toggleSelect = (category, value) => {
    setSelected((prev) => {
      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists ? prev[category].filter((v) => v !== value) : [...prev[category], value]
      };
    });
  };

  const handleNext = () => {
    const newErrors = {};
    if (selected.preferences.length === 0) newErrors.preferences = "Select at least one dietary preference.";
    if (selected.allergies.length === 0 && !otherAllergy.trim()) newErrors.allergies = "Select at least one allergy option or fill 'Other'.";
    if (selected.types.length === 0) newErrors.types = "Select at least one meal type.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Passes collected data to MealPlans.js
    onNext({ ...selected, allergies: fullAllergies });
  };

  return (
    <div className="meal-step">
      <h2 className="step-title">Meal Plans</h2>

      <div className="form-section">
        <h3 className="form-title">Dietary Preferences</h3>
        <p>What are your dietary preferences?</p>
        {errors.preferences && <p className="error-message">{errors.preferences}</p>}
        <div className="option-grid">
          {options.preferences.map((opt) => (
            <label key={opt} className={`circle-option ${selected.preferences.includes(opt) ? "selected" : ""}`}>
              <input type="checkbox" onChange={() => toggleSelect("preferences", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-title">Allergies</h3>
        <p>Do you have any food allergies we should know about?</p>
        {errors.allergies && <p className="error-message">{errors.allergies}</p>}
        <div className="option-grid">
          {options.allergies.map((opt) => (
            <label key={opt} className={`circle-option ${selected.allergies.includes(opt) ? "selected" : ""}`}>
              <input type="checkbox" onChange={() => toggleSelect("allergies", opt)} />
              {opt}
            </label>
          ))}
        </div>
        <input
          type="text"
          className="other-input"
          placeholder="Other allergies..."
          value={otherAllergy}
          onChange={(e) => setOtherAllergy(e.target.value)}
        />
      </div>

      <div className="form-section">
        <h3 className="form-title">Meal Types</h3>
        <p>Which meals do you want to plan?</p>
        {errors.types && <p className="error-message">{errors.types}</p>}
        <div className="option-grid">
          {options.types.map((opt) => (
            <label key={opt} className={`circle-option ${selected.types.includes(opt) ? "selected" : ""}`}>
              <input type="checkbox" onChange={() => toggleSelect("types", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button onClick={onBack} className="secondary-btn">Back</button>
        <button onClick={handleNext} className="primary-btn">Next</button>
      </div>
    </div>
  );
};

export default MealPreferences;