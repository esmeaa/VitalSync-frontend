import React, {useState} from 'react'
import SetUpStep from '../Components/SetUpStep'
import "./setUp.css";
const SetUp = () => {
    const [step, setStep] = useState("gender");
    const steps = ["gender", "age", "height", "weight", "ethnicity", "goal"];

    const nextStep = () => {
        const currentIndex = steps.indexOf(step);
        if(currentIndex < steps.length - 1){
            setStep(steps[currentIndex + 1]);
        }
    };
    const prevStep = () => {
        const currentIndex = steps.indexOf(step);
        if(currentIndex > 0){
            setStep(steps[currentIndex - 1]);
        }
    };




  return (
    <div>
       
        <SetUpStep step = {step}/>
        
        <button className = "back" onClick={prevStep} disabled = {step === "gender"}>
            Back
        </button>
        <button className='continue' onClick={nextStep} disabled = {steps.indexOf(step) === steps.length - 1 }>
            Continue
        </button>
      
    </div>
  )
}

export default SetUp;
