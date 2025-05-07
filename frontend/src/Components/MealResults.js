// Step 5: Meal Plan Results
import React from "react";
import "../pages/MealPlans.css";

const MealResults = ({ meals }) => {
  return (
    <div className="meal-step">
      <h2 className="highlight-title">Breakfast Plan For You</h2>
      <p className="section-desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>

      <div className="meal-list">
        {meals.map((meal, index) => (
          <div key={index} className="meal-card">
            <div className="meal-info">
              <h4>{meal.title}</h4>
              <div className="meal-meta">
                <span>{meal.time}</span>
                <span>{meal.calories} Cal</span>
              </div>
            </div>
            <img src={meal.image} alt={meal.title} className="meal-thumb" />
          </div>
        ))}
      </div>

      <button className="primary-btn">See Recipe</button>
    </div>
  );
};

export default MealResults;
