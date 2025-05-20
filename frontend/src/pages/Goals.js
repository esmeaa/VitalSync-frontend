// import React, { useState, useEffect } from 'react';
// import './Goals.css';

// const Goals = () => {
//   const [goalType, setGoalType] = useState('');
//   const [target, setTarget] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [goals, setGoals] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [lastAddedGoal, setLastAddedGoal] = useState(null);

//   useEffect(() => {
//     const now = new Date();
//     goals.forEach(goal => {
//       const goalDate = new Date(goal.deadline);
//       if (goalDate < now) {
//         alert(`Goal "${goal.goalType}" is past its deadline.`);
//       }
//     });
//   }, [goals]);

//   const resetForm = () => {
//     setGoalType('');
//     setTarget('');
//     setDeadline('');
//     setEditingId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!goalType || !target || !deadline) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     const newGoal = {
//       id: editingId || Date.now(),
//       goalType,
//       target,
//       deadline,
//     };

//     if (editingId) {
//       setGoals(goals.map(g => (g.id === editingId ? newGoal : g)));
//     } else {
//       setGoals([newGoal, ...goals]);
//     }

//     resetForm();
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this goal?')) return;
//     setGoals(goals.filter(g => g.id !== id));
//   };

//   const handleEdit = (id) => {
//     const goal = goals.find(g => g.id === id);
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
//           <label htmlFor="goalType">Goal Type:</label>
//           <select
//             id="goalType"
//             value={goalType}
//             onChange={(e) => setGoalType(e.target.value)}
//             required
//           >
//             <option value="">--Select--</option>
//             <option value="Weight Loss">Weight Loss</option>
//             <option value="Weight Gain">Weight Gain</option>
//             <option value="Run Distance">Run Distance</option>
//           </select>

//           <label htmlFor="target">Target:</label>
//           <input
//             id="target"
//             type="text"
//             value={target}
//             onChange={(e) => setTarget(e.target.value)}
//             placeholder="e.g. 10 kg, 5 km"
//             required
//           />

//           <label htmlFor="deadline">Deadline:</label>
//           <input
//             id="deadline"
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             required
//           />

//           <button type="submit">{editingId ? 'Update Goal' : 'Set Goal'}</button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="cancel-button"
//             >
//               Cancel
//             </button>
//           )}
//         </form>

//         <div className="goals-list">
//           <h3>Current Goals</h3>
//           {goals.length === 0 ? (
//             <p>No goals set yet.</p>
//           ) : (
//             <ul>
//               {goals.map(goal => (
//                 <li key={goal.id} className="goal-item">
//                   <div>
//                     <strong>{goal.goalType}</strong>: {goal.target} by{' '}
//                     {new Date(goal.deadline).toLocaleDateString()}
//                   </div>
//                   <div className="goal-actions">
//                     <button onClick={() => handleEdit(goal.id)}>Edit</button>
//                     <button
//                       onClick={() => handleDelete(goal.id)}
//                       className="delete-button"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Displays the last added goal */}
//         {lastAddedGoal && (
//           <div className="last-goal-card">
//             <h3>Last Goal Added</h3>
//             <p><strong>Type:</strong> {lastAddedGoal.goalType}</p>
//             <p><strong>Target:</strong> {lastAddedGoal.target}</p>
//             <p><strong>Deadline:</strong> {new Date(lastAddedGoal.deadline).toLocaleDateString()}</p>
//             <p><strong>Created:</strong> {new Date(lastAddedGoal.created_at).toLocaleString()}</p>
//           </div>
//         )}
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

  useEffect(() => {
    const now = new Date();
    goals.forEach(goal => {
      const goalDate = new Date(goal.deadline);
      if (goalDate < now) {
        alert(`Goal "${goal.goalType}" is past its deadline.`);
      }
    });
  }, [goals]);

  const resetForm = () => {
    setGoalType('');
    setTarget('');
    setDeadline('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalType || !target || !deadline) {
      alert('Please fill in all fields.');
      return;
    }

    const newGoal = {
      id: editingId || Date.now(),
      goalType,
      target,
      deadline,
    };

    if (editingId) {
      setGoals(goals.map(g => (g.id === editingId ? newGoal : g)));
    } else {
      setGoals([newGoal, ...goals]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleEdit = (id) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      setGoalType(goal.goalType);
      setTarget(goal.target);
      setDeadline(goal.deadline);
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
