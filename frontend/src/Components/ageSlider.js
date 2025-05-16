import React, { useState, useRef, useEffect } from "react";
import "./ageSlider.css"; // Import the CSS for styling

const AgeSlider = ({ min, max, interval, unit, onChange}) => {
  const [selectedValue, setSelectedValue] = useState((min + max) / 2);
  const sliderRef = useRef(null);

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
      const itemWidth = 100;
      const index = Math.round(scrollX / itemWidth); // Adjust based on item width
      const newValue = generateNumbers()[index] || selectedValue;
      setSelectedValue(newValue);
      if (onChange)onChange(newValue)
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const initialIndex = generateNumbers().indexOf(selectedValue);
      const itemWidth = 100; 
      sliderRef.current.scrollLeft = initialIndex * itemWidth; // Adjust for width
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
console.log("ageSlider is rendering");

export default AgeSlider;
