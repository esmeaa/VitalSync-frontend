
import React, { useState } from 'react';
import "./setUpStep.css"
import female from "../images/female.svg";
import male from "../images/male.svg";
import ScrollableSlider from './scrollableSlider';
import AgeSlider from "./ageSlider";


const SetUpStep = ({ step, value, onChange }) => {

  const [selectedOption, setSelectedOption] = useState(null);


  const stepFormat = {
    gender: {
      title: "What's Your Gender?",
      paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      options: [{ optionName: "Male", icon: male }, { optionName: "Female", icon: female }],
      className: "gender-step",
      displayType: "option-buttons"
    },
    age: {
      title: "How Old Are You?",
      paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "number",
      className: "age-step",
      min: 18,
      max: 22,
      interval: 1,
      unit: "",
      displayType: "slider-age"
    },
    height: {
      title: "What Is Your Height?",
      paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "number",
      unit: "cm",
      className: "height-step",
      min: 140,
      max: 190,
      interval: 1,
      displayType: "slider"
    },
    weight: {
      title: "What is Your Weight?",
      paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "number",
      unit: "kg",
      className: "weight-step",
      min: 40,
      max: 90,
      interval: 1,
      displayType: "slider"
    },
    ethnicity: {
      title: "What Is Your Ethnic Origin?",
      paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      options: [{ optionName: "Black, African, Caribbean Or Black British" }, { optionName: "Asian Or Asian British" }, { optionName: "Middle Eastern" }, { optionName: "White" }],
      className: "ethnicity-step",
      displayType: "dropdown"
    }
  };



  return (
    <div className="layout" id={`form container ${stepFormat[step]?.className}`} key={step} >
      <h1 id='title'>{stepFormat[step]?.title}</h1>
      <p className="paragraph" id={`${stepFormat[step].className}-para`}>{stepFormat[step]?.paragraph}</p>
      <form>
        {(() => {
          switch (stepFormat[step]?.displayType) {
            case "option-buttons":
              return (
                <div className="options">
                  {stepFormat[step].options.map((option) => (
                    <div className={`option ${selectedOption === option.optionName ? "option-selected" : ""}`}
                      key={option.optionName}>
                      <button className="option-button"
                        onClick={(e) => {
                          e.preventDefault();
                          const selectedValue = option.optionName;
                          console.log("button selected");

                          if (selectedOption === selectedValue) {
                            setSelectedOption(null); // Deselect
                            onChange(step, "");
                          } else {
                            setSelectedOption(selectedValue); // Select new
                            onChange(step, selectedValue);
                          }
                        }}>
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
                  min={stepFormat[step].min}
                  max={stepFormat[step].max}
                  interval={stepFormat[step].interval}
                  unit={stepFormat[step].unit}
                  onChange={(value) => onChange(step, value)}
                />
              );
            case "slider-age":
              return (
                <AgeSlider
                  min={stepFormat[step].min}
                  max={stepFormat[step].max}
                  interval={stepFormat[step].interval}
                  unit={stepFormat[step].unit}
                  onChange={(value) => onChange(step, value)}
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
                  {stepFormat[step].options.map((option) => (
                    <option className="dropdown-option" key={option.optionName} value={option.optionName}>
                      {option.optionName}
                    </option>
                  ))}
                </select>
              );

            case "image-buttons":
              return (
                <div className="options">
                  {stepFormat[step].options.map((option) => (
                    <div className="option" key={option.optionName}>
                      <button className="option-button"
                        onClick={(e) => {
                          e.preventDefault();
                          const selectedValue = option.optionName;
                          console.log("button selected");

                          if (selectedOption === selectedValue) {
                            setSelectedOption(null); // Deselect
                            onChange(step, "");
                          } else {
                            setSelectedOption(selectedValue); // Select new
                            onChange(step, selectedValue);
                          }
                        }}>
                        <img src={option.icon} alt={option.optionName} />
                      </button>
                      <p>{option.optionName}</p>
                    </div>
                  ))}
                </div>
              );

            default:
              return <p>Unknown step type</p>;
          }
        })()}
      </form>

    </div>
  )
}

export default SetUpStep;
