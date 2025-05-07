// First screen in Meal Plan flow
import React from "react";
import "../pages/MealPlans.css";
import berries from "../images/berriesBackground.png"; 

const MealIntro = ({ onNext }) => {
  return (
    <div className="meal-intro">
      <img src={berries} alt="Berries" className="meal-image" />
      <div className="meal-intro-overlay">
        <h2 className="section-title">🍽️ Meal Plans</h2>
        <p className="section-desc">
          Welcome to VitalSync's Meal Plan!
          Click below to continue
        </p>
        <button className="primary-btn" onClick={onNext}>Know Your Plan</button>
      </div>
    </div>
  );
};

export default MealIntro;