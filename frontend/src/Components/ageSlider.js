import React, { useState, useRef, useEffect } from "react";
import "./ageSlider.css";

const AgeSlider = ({ min, max, interval, unit, onChange }) => {
  const [selectedValue, setSelectedValue] = useState((min + max) / 2);
  const sliderRef = useRef(null);
  const itemWidth = 70;

  const generateNumbers = () => {
    let numbers = [];
    for (let i = min; i <= max; i += interval) {
      numbers.push(i);
    }
    return numbers;
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollX = sliderRef.current.scrollLeft;
      const index = Math.round(scrollX / itemWidth);
      const newValue = generateNumbers()[index] || selectedValue;
      setSelectedValue(newValue);
      if (onChange) onChange(newValue);
    }
  };

  useEffect(() => {
    const index = generateNumbers().indexOf(selectedValue);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = index * itemWidth;
    }
  }, []);

  return (
    <div className="slider-container">
      <p className="slider-value">
        {selectedValue} <span className="unit">{unit}</span>
      </p>
      <div className="arrow-indicator">▲</div>
      <div className="scrollable-slider-wrapper">
        <div
          className="scrollable-slider"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {generateNumbers().map((num) => (
            <div
              key={num}
              className={`slider-item ${num === selectedValue ? "active" : ""}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeSlider;
