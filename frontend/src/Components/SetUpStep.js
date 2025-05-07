import React, {useState} from 'react';
import "./setUpStep.css"
import female from "../images/female.svg";
import male from "../images/male.svg";
import nutrition from "../images/Nutrition.png";
import exercise from "../images/exercise.png";
import ScrollableSlider from './scrollableSlider';



const SetUpStep = ({step}) => {
    const[formData, setFormData] = useState({
        gender: "",
        age:"",
        height:"",
        weight:"",
        ethnicity:"",
        goal:"",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }
        );
    
    };
    
    const stepFormat = {
        gender: {
            title: "What's Your Gender?",
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            options:[{optionName: "Male", icon: male},{optionName: "Female", icon: female}],
            className: "gender-step",
            displayType: "option-buttons"
        },
        age: {
            title: "How Old Are You?",
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            type: "number", 
            className: "age-step",
            min:0,
            max:100,
            interval:1,
            unit:"",
            displayType: "slider"
        }, 
        height: { 
            title: "What Is Your Height?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            type: "number", 
            unit: "cm", 
            className: "height-step", 
            min:140,
            max:200,
            interval:1,
            displayType: "slider"
        }, 
        weight: { 
            title: "What is Your Weight?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            type: "number", 
            unit: "kg", 
            className: "weight-step", 
            min:140,
            max:200,
            interval:1,
            displayType: "slider"
        }, 
        ethnicity: { 
            title: "What Is Your Ethnic Origin?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            options: [{optionName: "Black, African, Caribbean Or Black British" }, {optionName: "Asian Or Asian British"}, {optionName: "Middle Eastern"}, {optionName: "White"}], 
            className: "ethnicity-step", 
            displayType: "dropdown"
        },
        goal: {
            title: "What Is Your Main Goal?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            options: [{optionName: "Diet" ,icon: nutrition}, {optionName:"Exercise", icon: exercise }], 
            className: "goal-step",
            displayType: "option-buttons"
        },
        };
    
    
    
  return (
    <div className="layout" id= {`form container ${stepFormat[step]?.className}`}>
        <h1 id='title'>{stepFormat[step]?.title}</h1>
        <p className="paragraph" id={`${stepFormat[step].className}-para`}>{stepFormat[step]?.paragraph}</p>

        <form>
        {(() => {
    switch (stepFormat[step]?.displayType) {
      case "option-buttons":
        return (
          <div className="options">
            {stepFormat[step].options.map((option) => (
              <div className="option" key={option.optionName}>
                <button className="option-button">
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
          />
        );

      case "dropdown":
        return (
          <select
            name={step}
            value={formData[step]}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an option</option>
            {stepFormat[step].options.map((option) => (
              <option key={option.optionName} value={option.optionName}>
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
                <button className="option-button">
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
