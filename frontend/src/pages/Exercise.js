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
      user_name: localStorage.getItem('user_name'), 
    };
    try {
      const response = await fetch("http://localhost:3001/api/exercises", {
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
            <p className="section-desc">Type of Exercise, Duration, Distance</p>
            <button className="primary-btn" onClick={() => setShowMainContent(true)}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="exercise-capture">
          <div className="exercise-capture-box">
            <h2>Log Exercise</h2>
            <p className="subtitle">Record your physical activities with VitalSync!</p>
            <form onSubmit={handleSubmit} className="exercise-form">
              <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)} required>
                <option value="">--Select Exercise Type--</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Walking">Walking</option>
              </select>

              <input type="number" placeholder="Duration (minutes)" value={duration} onChange={(e) => setDuration(e.target.value)} required />

              <input type="number" placeholder="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} required />

              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

              <button type="submit">Add Exercise</button>
            </form>

            {lastAdded && (
              <div className="exercise-card">
                <div className="exercise-card-header">
                  <h3>Exercise Logged</h3>
                </div>
                <div className="exercise-card-body">
                  <p><strong>{lastAdded.exerciseType}</strong></p>
                  <p>{lastAdded.duration} min &nbsp;&nbsp; {lastAdded.distance} km</p>
                  <p> {lastAdded.date}</p>
                </div>
              </div>
            )}

            <div className="exercise-history-button">
              <button onClick={() => window.location.href = "/ExerciseHistory"} className="primary-btn">
                View Full Exercise History
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Exercise;