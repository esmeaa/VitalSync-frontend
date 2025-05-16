import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExerciseHistory.css';

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/exercises"); // change BACKEND !!!
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          console.error("Failed to load exercises");
        }
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };
  
    fetchExercises();
  }, []);
  

  const getImage = (type) => {
    switch (type) {
      case 'Running': return '/images/running.jpg';
      case 'Walking': return '/images/walking.jpg';
      case 'Cycling': return '/images/cycling.jpg';
      case 'Swimming': return '/images/swimming.jpg';
      default: return '/images/default.jpg';
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/exercises/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setHistory(history.filter((e) => e.id !== id));
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/exercises/${editingExercise.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingExercise),
      });
  
      if (response.ok) {
        const updated = history.map((entry) =>
          entry.id === editingExercise.id ? editingExercise : entry
        );
        setHistory(updated);
        setEditingExercise(null);
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating:", err);
    }
  };
  

  return (
    <div className="history-container">
        <button
        onClick={() => navigate('/exercise')}
        style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: '#896CFE',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
            }}> ← Back to Log Exercise
            </button>

      <h2 className="history-title">Exercise Logged</h2>

      {history.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>No entries yet.</p>
      ) : (
        <div className="exercise-grid">
          {history.map((e) => (
            <div className="exercise-tile" key={e.id}>
              <img src={getImage(e.exerciseType)} alt={e.exerciseType} className="exercise-img" />
              <div className="exercise-info">
                <h4>{e.exerciseType}</h4>
                <p>⏱ {e.duration} min</p>
                <p>📏 {e.distance} km</p>
                <p>📅 {e.date}</p>
              </div>
              <div className="tile-actions">
                <button onClick={() => setEditingExercise(e)}>✏️</button>
                <button onClick={() => handleDelete(e.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingExercise && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Exercise</h3>
            <form onSubmit={handleEditSubmit}>
              <label>Type:</label>
              <select
                value={editingExercise.exerciseType}
                onChange={(e) => setEditingExercise({ ...editingExercise, exerciseType: e.target.value })}
              >
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Walking">Walking</option>
              </select>

              <label>Duration (min):</label>
              <input
                type="number"
                value={editingExercise.duration}
                onChange={(e) => setEditingExercise({ ...editingExercise, duration: e.target.value })}
              />

              <label>Distance (km):</label>
              <input
                type="number"
                value={editingExercise.distance}
                onChange={(e) => setEditingExercise({ ...editingExercise, distance: e.target.value })}
              />

              <label>Date:</label>
              <input
                type="date"
                value={editingExercise.date}
                onChange={(e) => setEditingExercise({ ...editingExercise, date: e.target.value })}
              />

              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingExercise(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseHistory;

