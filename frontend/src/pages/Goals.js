// import React, { useState, useEffect } from 'react';
// import './Goals.css';

// const Goals = () => {
//   const [goalType, setGoalType] = useState('');
//   const [target, setTarget] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [goals, setGoals] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const BACKEND_URL = 'http://localhost:3001'; 

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const res = await fetch(`${BACKEND_URL}/api/goals`);
//         const data = await res.json();
//         setGoals(data);
//       } catch (err) {
//         console.error('Error loading goals:', err);
//       }
//     };
//     fetchGoals();
//   }, []);

//   useEffect(() => {
//     const now = new Date();
//     goals.forEach(goal => {
//       const goalDate = new Date(goal.deadline);
//       if (goalDate < now) {
//         alert(`Goal "${goal.goalType}" is past its deadline. Set a new one?`);
//       }
//     });
//   }, [goals]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const entry = { goalType, target, deadline };

//     try {
//       if (editingId) {
//         const res = await fetch(`${BACKEND_URL}/api/goals/${editingId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(entry),
//         });
//         const updatedGoal = await res.json();
//         updatedGoal.id = updatedGoal.id || editingId;
//         setGoals(goals.map((g) => (g.id === editingId ? updatedGoal : g)));
//         setEditingId(null);
//       } else {
//         const res = await fetch(`${BACKEND_URL}/api/goals`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(entry),
//         });
//         const newGoal = await res.json();
//         newGoal.id = newGoal.id || Date.now();
//         setGoals([newGoal, ...goals]);
//       }

//       setGoalType('');
//       setTarget('');
//       setDeadline('');
//     } catch (err) {
//       console.error('Submit failed:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`${BACKEND_URL}/api/goals/${id}`, {
//         method: 'DELETE',
//       });
//       setGoals(goals.filter((g) => g.id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleEdit = (id) => {
//     const goal = goals.find((g) => g.id === id);
//     if (goal) {
//       setGoalType(goal.goalType);
//       setTarget(goal.target);
//       setDeadline(goal.deadline);
//       setEditingId(id);
//     }
//   };

//   return (
//     <div className="goals-container">
//       <div className="goals-box">
//         <h2>{editingId ? 'Edit Goal' : 'Create a Goal'}</h2>
//         <p className="subtitle">Set and manage your fitness goals</p>

//         <form onSubmit={handleSubmit} className="goals-form">
//           <label>Goal Type:</label>
//           <select value={goalType} onChange={(e) => setGoalType(e.target.value)} required>
//             <option value="">--Select--</option>
//             <option value="Weight Loss">Weight Loss</option>
//             <option value="Weight Gain">Weight Gain</option>
//             <option value="Run Distance">Run Distance</option>
//           </select>

//           <label>Target:</label>
//           <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} required />

//           <label>Deadline:</label>
//           <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

//           <button type="submit">{editingId ? 'Update Goal' : 'Set Goal'}</button>
//         </form>

//         <div className="goals-list">
//           <h3>Current Goals</h3>
//           <ul>
//             {goals.map((goal) => (
//               <li key={goal.id}>
//                 <div>
//                   <strong>{goal.goalType}</strong>: {goal.target} by {goal.deadline}
//                 </div>
//                 <div className="goal-actions">
//                   <button onClick={() => handleEdit(goal.id)}>Edit</button>
//                   <button onClick={() => handleDelete(goal.id)} className="delete-button">Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Goals;


import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = () => {
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const BACKEND_URL = 'http://localhost:3001';

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/goals`);
        if (!res.ok) throw new Error('Failed to fetch goals');
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error('Error loading goals:', err);
      }
    };
    fetchGoals();
  }, []);

  // Alert if any goal deadline has passed
  useEffect(() => {
    const now = new Date();
    goals.forEach(goal => {
      if (goal.deadline) {
        const goalDate = new Date(goal.deadline);
        if (goalDate < now) {
          alert(`Goal "${goal.goalType}" is past its deadline. Consider updating it.`);
        }
      }
    });
  }, [goals]);

  const resetForm = () => {
    setGoalType('');
    setTarget('');
    setDeadline('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goalType || !target || !deadline) {
      alert('Please fill in all fields.');
      return;
    }

    const entry = { goalType, target, deadline };

    try {
      if (editingId) {
        // Update existing goal
        const res = await fetch(`${BACKEND_URL}/api/goals/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        if (!res.ok) throw new Error('Failed to update goal');
        const updatedGoal = await res.json();

        setGoals(goals.map(g => (g.id === editingId ? updatedGoal : g)));
      } else {
        // Create new goal
        const res = await fetch(`${BACKEND_URL}/api/goals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        if (!res.ok) throw new Error('Failed to create goal');
        const newGoal = await res.json();

        setGoals([newGoal, ...goals]);
      }

      resetForm();
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Error saving goal. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/goals/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete goal');
      setGoals(goals.filter(g => g.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Error deleting goal. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      setGoalType(goal.goalType);
      setTarget(goal.target);
      setDeadline(goal.deadline.slice(0, 10)); // format date for input[type=date]
      setEditingId(id);
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-box">
        <h2>{editingId ? 'Edit Goal' : 'Create a Goal'}</h2>
        <p className="subtitle">Set and manage your fitness goals</p>

        <form onSubmit={handleSubmit} className="goals-form">
          <label htmlFor="goalType">Goal Type:</label>
          <select
            id="goalType"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            required
          >
            <option value="">--Select--</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Run Distance">Run Distance</option>
          </select>

          <label htmlFor="target">Target:</label>
          <input
            id="target"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g. 10 kg, 5 km"
            required
          />

          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />

          <button type="submit">{editingId ? 'Update Goal' : 'Set Goal'}</button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="cancel-button"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="goals-list">
          <h3>Current Goals</h3>
          {goals.length === 0 ? (
            <p>No goals set yet.</p>
          ) : (
            <ul>
              {goals.map(goal => (
                <li key={goal.id} className="goal-item">
                  <div>
                    <strong>{goal.goalType}</strong>: {goal.target} by{' '}
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                  <div className="goal-actions">
                    <button onClick={() => handleEdit(goal.id)}>Edit</button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
