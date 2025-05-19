import React, { useState } from "react";
import "./ageSlider.css";

const AgeSlider = ({ min, max, unit, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (delta) => {
    const newValue = Math.min(Math.max(min, value + delta), max);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="slider-container">
      <div className="arrow-box">
        <button className="arrow-btn" onClick={() => handleChange(-1)}>◀</button>
        <span className="slider-value">
          {value} <span className="unit">{unit}</span>
        </span>
        <button className="arrow-btn" onClick={() => handleChange(1)}>▶</button>
      </div>
    </div>
  );
};

export default AgeSlider;
