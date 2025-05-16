import React, {useState} from 'react'
import SetUpStep from '../Components/SetUpStep'
import "./setUp.css";
const SetUp = () => {
  
    const[formData, setFormData] = useState({
        gender: "",
        age:"",
        height:"",
        weight:"",
        ethnicity:"",
        goal:"",
    });

    const [step, setStep] = useState("gender");
    const steps = ["gender", "age", "height", "weight", "ethnicity", "goal"];

    const currentIndex = steps.indexOf(step);
    const isLastStep = step === steps[steps.length - 1];
    const handleChange = (field,value) => {
        setFormData(prev => ({...prev, [field]: value }));

    }

    const nextStep = async () => {
      if(!isLastStep){
        setStep(steps[currentIndex + 1]);
      }else{
        //Final step: submit data 
        try{
            const response = await fetch("http://localhost:3001/api/bmi-feedback/:userId", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),


            });
            if(!response.ok){
                throw new Error("Failed to sumbit setup data")
            }
            const data = await response.json();
            console.log("Server Response: ", data);
            //Redirect to show success message 
            alert("Setup completed!");
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred while submitting your data.");
        }
      }
    };
    const prevStep = () => {
        if(currentIndex > 0){
            setStep(steps[currentIndex - 1]);
        }
    };
    const isStepComplete = () => {
        const value = formData[step];
        return value !== "" && value !== null && value !== undefined;
      };




      console.log("formData", formData);
  return (
    <div>
       
        <SetUpStep step={step} value={formData} onChange={handleChange}/>
        
        <button className = "back" onClick={prevStep} disabled = {step === "gender"}>
            Back
        </button>
        <button className='continue' onClick={nextStep}  disabled={!isStepComplete()}>
            {isLastStep ? "Finish" : "Continue"}
        </button>
      
    </div>
  )
}

export default SetUp;
