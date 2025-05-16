import React, { useState } from 'react';
import './Exercise.css';

const Exercise = () => {
const [showMainContent, setShowMainContent] = useState(false);
const [exerciseType, setExerciseType] = useState('');
const [duration, setDuration] = useState('');
const [distance, setDistance] = useState('');
const [date, setDate] = useState('');
const [lastAdded, setLastAdded] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
const newEntry = {
exerciseType,
duration,
distance,
date,
};
try {
const response = await fetch("http://localhost:5000/api/exercises", { // CHANGE BACKEND
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newEntry),
});
if (response.ok) {
const saved = await response.json();
setLastAdded(saved);
} else {
console.error("Failed to save exercise");
}
} catch (err) {
console.error("Error saving exercise:", err);
}
// Clear form
setExerciseType('');
setDuration('');
setDistance('');
setDate('');
};

return (
<>
{!showMainContent ? (
<div className="exercise-intro">
<div className="exercise-intro-overlay">
<h2 className="section-title">Log Your Exercises</h2>
<p className="section-desc">Track distance, time, and activity type</p>
<button className="primary-btn" onClick={() => setShowMainContent(true)}>
Get Started
</button>
</div>
</div>
) : (
<div className="exercise-container">
<h2>Log Exercise</h2>
<form onSubmit={handleSubmit} className="exercise-form">
<label>Exercise Type:</label>
<select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} required>
<option value="">--Select--</option>
<option value="Running">Running</option>
<option value="Cycling">Cycling</option>
<option value="Swimming">Swimming</option>
<option value="Walking">Walking</option>
</select>

<label>Duration (minutes):</label>
<input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

<label>Distance (km):</label>
<input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} required />

<label>Date:</label>
<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

<button type="submit">Add Exercise</button>
</form>

{lastAdded && (
<div className="exercise-card">
<div className="exercise-card-header">
<h3>✅ Exercise Logged</h3>
</div>
<div className="exercise-card-body">
<p><strong>{lastAdded.exerciseType}</strong></p>
<p>⏱ {lastAdded.duration} min &nbsp;&nbsp; 📏 {lastAdded.distance} km</p>
<p>📅 {lastAdded.date}</p>
</div>
</div>
)}

<div className="exercise-history-button">
<button onClick={() => window.location.href = "/exercise-history"} className="primary-btn">
View Full Exercise History
</button>
</div>
</div>
)}
</>
);
};

export default Exercise;