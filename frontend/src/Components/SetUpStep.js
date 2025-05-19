import React, { useState } from 'react';
import "./setUpStep.css";
import female from "../images/female.svg";
import male from "../images/male.svg";
import ScrollableSlider from './scrollableSlider';
import AgeSlider from "./ageSlider";

const SetUpStep = ({ step, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(value || "");

  const stepFormat = {
    gender: {
      title: "What's Your Gender?",
      options: [
        { optionName: "Male", icon: male },
        { optionName: "Female", icon: female },
      ],
      className: "gender-step",
      displayType: "option-buttons"
    },
    age: {
      title: "How Old Are You?",
      type: "number",
      className: "age-step",
      min: 18,
      max: 100,
      interval: 1,
      unit: "",
      displayType: "slider-age"
    },
    height: {
      title: "What Is Your Height?",
      type: "number",
      unit: "cm",
      className: "height-step",
      min: 140,
      max: 220,
      interval: 1,
      displayType: "slider"
    },
    weight: {
      title: "What is Your Weight?",
      type: "number",
      unit: "kg",
      className: "weight-step",
      min: 40,
      max: 180,
      interval: 1,
      displayType: "slider"
    },
    ethnicity: {
      title: "What Is Your Ethnic Origin?",
      options: [
        { optionName: "Black, African, Caribbean Or Black British" },
        { optionName: "Asian Or Asian British" },
        { optionName: "Middle Eastern" },
        { optionName: "White" }
      ],
      className: "ethnicity-step",
      displayType: "dropdown"
    }
  };

  const format = stepFormat[step];

  return (
    <div className={`layout ${format?.className}`} key={step}>
      <h1 id='title'>{format?.title}</h1>
      {(() => {
        switch (format?.displayType) {
          case "option-buttons":
            return (
              <div className="options">
                {format.options.map((option) => (
                  <div
                    className={`option ${selectedOption === option.optionName ? "option-selected" : ""}`}
                    key={option.optionName}
                  >
                    <button
                      className="option-button"
                      onClick={(e) => {
                        e.preventDefault();
                        const selectedValue = option.optionName;
                        const newValue = selectedOption === selectedValue ? "" : selectedValue;
                        setSelectedOption(newValue);
                        onChange(step, newValue);
                      }}
                    >
                      {option.icon && <img src={option.icon} alt={option.optionName} id="icon" />}
                    </button>
                    <p className="button-caption">{option.optionName}</p>
                  </div>
                ))}
              </div>
            );

          case "slider":
            return (
              <ScrollableSlider
                min={format.min}
                max={format.max}
                interval={format.interval}
                unit={format.unit}
                onChange={(val) => onChange(step, val)}
              />
            );

          case "slider-age":
            return (
              <AgeSlider
                min={format.min}
                max={format.max}
                interval={format.interval}
                unit={format.unit}
                onChange={(val) => onChange(step, val)}
              />
            );

          case "dropdown":
            return (
              <select
                name={step}
                value={value}
                onChange={(e) => onChange(step, e.target.value)}
                required
                className='dropdown'
              >
                <option value="" disabled>Select an option</option>
                {format.options.map((option) => (
                  <option key={option.optionName} value={option.optionName}>
                    {option.optionName}
                  </option>
                ))}
              </select>
            );

          default:
            return <p>Unknown step type</p>;
        }
      })()}
    </div>
  );
};

export default SetUpStep;
