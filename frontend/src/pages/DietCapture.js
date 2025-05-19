
import React, { useState, useEffect } from "react";
import './DietCapture.css';

const DietCapture = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState("");
    const [customFood, setCustomFood] = useState("");
    const [calories, setCalories] = useState("");
    const [mealType, setMealType] = useState("Breakfast");
    const [lastAddedDiet, setLastAddedDiet] = useState(null);  // New state

    useEffect(() => {
        fetch("http://localhost:3001/api/food-items")
            .then(res => res.json())
            .then(data => setFoodList(data))
            .catch(err => console.error("Failed to fetch food items:", err));
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

    const submitLog = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/diet-log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_name: localStorage.getItem("user_name"),
                    food_item_id: parseInt(selectedFood),
                    calories: parseInt(calories),
                    meal_type: mealType,
                }),
            });
            if (res.ok) {
                const savedLog = await res.json();
                setLastAddedDiet(savedLog);
                setSelectedFood("");
                setCalories("");
                setMealType("Breakfast");
            } else {
                alert("Failed to save diet log.");
            }
        } catch (error) {
            console.error("Error submitting diet log:", error);
            alert("Error submitting diet log.");
        }
    };

    return (
        <div className="diet-capture">
            <div className="diet-capture-box">
                <h2>Log your Meal</h2>
                <p className="subtitle">Food/Drink types, Custom items, Calories and defined set of meal types </p>

                <select value={selectedFood} onChange={e => setSelectedFood(e.target.value)}>
                    <option value="">-- Select food/drink --</option>
                    {foodList.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Add custom food"
                    value={customFood}
                    onChange={e => setCustomFood(e.target.value)}
                />
                <button onClick={addCustomFood}>Add Custom Food</button>

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

                {/* Display last added diet log */}
                {lastAddedDiet && (
                    <div className="diet-log-card">
                        <h3>Diet Log Added</h3>
                        <p><strong>Food:</strong> {lastAddedDiet.food_name || lastAddedDiet.food_item_id}</p>
                        <p><strong>Calories:</strong> {lastAddedDiet.calories} kcal</p>
                        <p><strong>Meal Type:</strong> {lastAddedDiet.meal_type}</p>
                        <p><strong>Date:</strong> {new Date(lastAddedDiet.created_at).toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietCapture;
