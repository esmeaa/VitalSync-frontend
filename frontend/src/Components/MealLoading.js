// Step 4: Loading Animation
import React from "react";
import "../pages/MealPlans.css";

const MealLoading = () => {
  return (
    <div className="meal-step">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
      </div>
      <h3 className="loading-text">Creating A Plan For You</h3>
    </div>
  );
};

export default MealLoading;