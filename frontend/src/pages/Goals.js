import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = () => {
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const BACKEND_URL = 'http://localhost:5000'; // replace with your backend port AYSHA

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/goals`);
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error('Error loading goals:', err);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    const now = new Date();
    goals.forEach(goal => {
      const goalDate = new Date(goal.deadline);
      if (goalDate < now) {
        alert(`Goal "${goal.goalType}" is past its deadline. Set a new one?`);
      }
    });
  }, [goals]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = { goalType, target, deadline };

    try {
      if (editingId) {
        const res = await fetch(`${BACKEND_URL}/api/goals/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        const updatedGoal = await res.json();
        updatedGoal.id = updatedGoal.id || editingId;
        setGoals(goals.map((g) => (g.id === editingId ? updatedGoal : g)));
        setEditingId(null);
      } else {
        const res = await fetch(`${BACKEND_URL}/api/goals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        const newGoal = await res.json();
        newGoal.id = newGoal.id || Date.now();
        setGoals([newGoal, ...goals]);
      }

      setGoalType('');
      setTarget('');
      setDeadline('');
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/api/goals/${id}`, {
        method: 'DELETE',
      });
      setGoals(goals.filter((g) => g.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (id) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setGoalType(goal.goalType);
      setTarget(goal.target);
      setDeadline(goal.deadline);
      setEditingId(id);
    }
  };

  return (
    <div className="goals-container">
      <h2>{editingId ? 'Edit Goal' : 'Create a Goal'}</h2>
      <form onSubmit={handleSubmit} className="goals-form">
        <label>Goal Type:</label>
        <select value={goalType} onChange={(e) => setGoalType(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Run Distance">Run Distance</option>
        </select>

        <label>Target:</label>
        <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} required />

        <label>Deadline:</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

        <button type="submit">{editingId ? 'Update Goal' : 'Set Goal'}</button>
      </form>

      <div className="goals-list">
        <h3>Current Goals</h3>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <div>
                <strong>{goal.goalType}</strong>: {goal.target} by {goal.deadline}
              </div>
              <div className="goal-actions">
                <button onClick={() => handleEdit(goal.id)}>Edit</button>
                <button onClick={() => handleDelete(goal.id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Goals;
