import React, { useState, useRef, useEffect } from "react";
import "./scrollableSlider.css"; 

const ScrollableSlider = ({ min, max, interval, unit, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(min);
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
      const index = Math.round(scrollX / 60); // Adjust based on item width
      const newValue = generateNumbers()[index] || selectedValue;
      setSelectedValue(newValue);
      if (onChange) onChange (newValue);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const initialIndex = generateNumbers().indexOf(selectedValue);
      sliderRef.current.scrollLeft = initialIndex * 60; // Adjust for width
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


export default ScrollableSlider;
