// Final Step: Meal Results with Selections
import React, { useEffect, useState } from "react";
import "../pages/MealPlans.css";

const mealOptions = {
  Vegetarian: [
    { title: "Grilled Veggie Bowl", calories: 400, time: "15 min", servings: 1 },
    { title: "Tofu Stir Fry", calories: 350, time: "10 min", servings: 1 }
  ],
  Vegan: [
    { title: "Quinoa Salad", calories: 300, time: "10 min", servings: 1 },
    { title: "Chickpea Wrap", calories: 420, time: "15 min", servings: 1 }
  ],
  None: [
    { title: "Grilled Chicken", calories: 550, time: "20 min", servings: 1 },
    { title: "Beef Stir Fry", calories: 600, time: "25 min", servings: 1 }
  ]
};

const MealResults = ({ meals, onBack }) => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    const { preference } = meals;
    const mealList = mealOptions[preference] || [];
    setAvailableMeals(mealList);
  }, [meals]);

  const toggleSelectMeal = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal)
        ? prev.filter((m) => m !== meal)
        : [...prev, meal]
    );
  };

  return (
    <div className="meal-step">
      <h2 className="highlight-title">Your {meals.preference} Meal Options</h2>
      <p className="section-desc">Select the meals you'd like to include:</p>

      <div className="meal-list">
        {availableMeals.map((meal, idx) => (
          <div
            key={idx}
            className={`meal-card selectable ${selectedMeals.includes(meal) ? "selected" : ""}`}
            onClick={() => toggleSelectMeal(meal)}
          >
            <div className="meal-info">
              <h4>{meal.title}</h4>
              <div className="meal-meta">
                <span>{meal.time}</span>
                <span>{meal.calories} Cal</span>
              </div>
            </div>
            <div className="meal-thumb-placeholder">🍽️</div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button className="secondary-btn" onClick={onBack}>Back</button>
        <button className="primary-btn">Confirm Selection</button>
      </div>
    </div>
  );
};

export default MealResults;

