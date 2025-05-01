import React, {useState} from 'react';
import "./setUpStep.css"
import female from "../images/female.png";
import male from "../images/male.png";
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
            paragraph: "This helps us determine appropriate fitness plans and recommendations for you",
            options:[{optionName: "Male", icon: male},{optionName: "Female", icon: female}],
            className: "gender-step",
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
        }, 
        ethnicity: { 
            title: "What Is Your Ethnic Origin?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            options: [{optionName: "Black, African, Caribbean Or Black British" }, {optionName: "Asian Or Asian British"}, {optionName: "Middle Eastern"}, {optionName: "White"}], 
            className: "ethnicity-step", 
        },
        goal: {
            title: "What Is Your Main Goal?", 
            paragraph: "Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            options: [{optionName: "Diet" ,icon: nutrition}, {optionName:"Exercise", icon: exercise }], 
            className: "goal-step",
        },
        };
    
    
    
  return (
    <div className="layout"id= {`form container ${stepFormat[step]?.className}`}>
        <h1 id='title'>{stepFormat[step]?.title}</h1>
        <p className="paragraph" id={`${stepFormat[step].className}-para`}>{stepFormat[step]?.paragraph}</p>

        <form>
            {stepFormat[step]?.options ? (
                //render buttons for multi-choice questions
                <div className='options'>
                    {stepFormat[step].options.map((option) => (
                        <div className='option'>
                        <button key={option.optionName} className='option-button'>
                           
                            {option.icon && <img src={option?.icon} alt= {option.optionName} id='icon' />}
                            
                        </button>
                        <p className='button-caption'>{option.optionName}</p>
                        </div>
                        
                     
                    ))}
                </div>

            )
            : (
                <ScrollableSlider 
                min={stepFormat[step].min} max={stepFormat[step].max} interval={stepFormat[step].interval} unit={stepFormat[step].unit}/>
                //otherwise put input fields for number based questions
                /*<input 
                type={stepFormat[step]?.type} 
                name={step}
                required
                value={formData[step]}
                onChange={handleChange}
                placeholder={stepFormat[step]?.title}/>
                */
            )
        
         }
        </form>
      
    </div>
  )
}

export default SetUpStep;
