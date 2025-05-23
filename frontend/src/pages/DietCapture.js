import React, { useState, useEffect } from "react";
import './DietCapture.css';

const DietCapture = () => {
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [customFood, setCustomFood] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("Breakfast");

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
    await fetch("http://localhost:3001/api/diet-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: localStorage.getItem("username"),
        food_item_id: selectedFood,
        calories: parseInt(calories),
        meal_type: mealType,
      }),
    });

    alert("Log saved!");
    setSelectedFood("");
    setCalories("");
    setMealType("Breakfast");
  };

  return (
    <div className="diet-capture">
      <div className="diet-capture-box">
        <h2>Log your Meal</h2>
        <p className="subtitle">Register Your Meal with VitalSync!</p>

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
      </div>
    </div>
  );
};

export default DietCapture;