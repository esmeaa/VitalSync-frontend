import React, { useState, useEffect } from "react";
import './DietCapture.css'; // Correct relative path


const DietCapture = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState("");
    const [customFood, setCustomFood] = useState("");
    const [calories, setCalories] = useState("");
    const [mealType, setMealType] = useState("Breakfast");

    useEffect(() => {
        fetch("http://localhost:3001/api/food-items")
            .then(res => res.json())
            .then(data => setFoodList(data));
    }, []);

    const addCustomFood = async () => {
        const res = await fetch("http://localhost:3001/api/food-items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: customFood }),
        });
        const newItem = await res.json();
        setFoodList([...foodList, newItem]);
        setSelectedFood(newItem.id);
        setCustomFood("");
    };

    // const submitLog = async () => {
    //     await fetch("http://localhost:3001/api/diet-log", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             user_name: localStorage.getItem("username"),
    //             food_item_id: selectedFood,
    //             calories: parseInt(calories),
    //             meal_type: mealType,
    //         }),
    //     });
    //     alert("Log saved!");
    //     setSelectedFood("");
    //     setCalories("");
    //     setMealType("Breakfast");
    // };

    const submitLog = async () => {
        const user_name = localStorage.getItem("user_name");

        if (!user_name) {
            alert("You must be logged in.");
            return;
        }
        if (!selectedFood) {
            alert("Please select a food or drink.");
            return;
        }
        if (!calories || calories <= 0) {
            alert("Please enter valid calories.");
            return;
        }

        const response = await fetch("http://localhost:3001/api/diet-log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_name,
                food_item_id: selectedFood,
                calories: parseInt(calories),
                meal_type: mealType,
            }),
        });

        if (response.ok) {
            alert("Log saved!");
            setSelectedFood("");
            setCalories("");
            setMealType("Breakfast");
        } else {
            alert("Failed to save log.");
        }
    };
      

    return (
        <div>
            <h2>Log your Meal</h2>
            <select value={selectedFood} onChange={e => setSelectedFood(e.target.value)}>
                <option value="">-- Select food/drink --</option>
                {foodList.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>

            <div>
                <input
                    type="text"
                    placeholder="Add custom food"
                    value={customFood}
                    onChange={e => setCustomFood(e.target.value)}
                />
                <button onClick={addCustomFood}>Add</button>
            </div>

            <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={e => setCalories(e.target.value)}
            />

            <select value={mealType} onChange={e => setMealType(e.target.value)}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>

            <button onClick={submitLog}>Submit</button>
        </div>
    );
};

export default DietCapture;
