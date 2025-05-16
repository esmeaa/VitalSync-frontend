import React, { useState, useEffect } from 'react';
import './Exercise.css';

const Exercise = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/exercises`);
        const data = await response.json();
        setExerciseHistory(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };
    fetchExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = { exerciseType, duration, distance, date };

    try {
      if (editingId) {
        const response = await fetch(`${BACKEND_URL}/api/exercises/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        const updatedEntry = await response.json();
        updatedEntry.id = updatedEntry.id || editingId;
        setExerciseHistory((prev) =>
          prev.map((e) => (e.id === editingId ? updatedEntry : e))
        );
        setEditingId(null);
      } else {
        const response = await fetch(`${BACKEND_URL}/api/exercises`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        const newEntry = await response.json();
        newEntry.id = newEntry.id || Date.now();
        setExerciseHistory([newEntry, ...exerciseHistory]);
      }

      setExerciseType('');
      setDuration('');
      setDistance('');
      setDate('');
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  const handleEdit = (id) => {
    const ex = exerciseHistory.find((e) => e.id === id);
    if (ex) {
      setExerciseType(ex.exerciseType);
      setDuration(ex.duration);
      setDistance(ex.distance);
      setDate(ex.date);
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/api/exercises/${id}`, { method: 'DELETE' });
      setExerciseHistory(exerciseHistory.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
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
          <h2>{editingId ? 'Edit Exercise' : 'Log Exercise'}</h2>
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

            <button type="submit">{editingId ? 'Update Exercise' : 'Add Exercise'}</button>
          </form>

          <div className="exercise-history">
            <h3>Exercise History</h3>
            <ul>
              {exerciseHistory.map((entry) => (
                <li key={entry.id}>
                  <div>{entry.date} – {entry.exerciseType}, {entry.duration} mins, {entry.distance} km</div>
                  <div className="goal-actions">
                    <button onClick={() => handleEdit(entry.id)}>Edit</button>
                    <button onClick={() => handleDelete(entry.id)} className="delete-button">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Exercise;
