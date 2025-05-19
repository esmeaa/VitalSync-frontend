import React, { useState } from "react";
import "./scrollableSlider.css";

const ScrollableSlider = ({ min, max, interval, unit, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (delta) => {
    const newValue = Math.min(Math.max(min, value + delta), max);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="slider-container">
      <div className="arrow-box">
        <button className="arrow-btn" onClick={() => handleChange(-interval)}>◀</button>
        
        <div className="slider-display">
          <span className="slider-number">{value}</span>
          <span className="slider-unit">{unit}</span>
        </div>
        
        <button className="arrow-btn" onClick={() => handleChange(interval)}>▶</button>
      </div>
    </div>
  );
};

export default ScrollableSlider;