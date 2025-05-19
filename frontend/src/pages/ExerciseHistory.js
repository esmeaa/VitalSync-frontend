import React, { useEffect, useState } from "react";
import './ExerciseHistory.css';

const ExerciseHistory = () => {
    const [history, setHistory] = useState([]);
    const user_name = localStorage.getItem("user_name");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/exerciseLog?user_name=${encodeURIComponent(user_name)}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("Failed to fetch exercise history:", err);
            }
        };

        if (user_name) fetchHistory();
    }, [user_name]);

    return (
        <div className="exercise-history">
            <h2>Exercise History</h2>
            {history.length === 0 ? (
                <p>No exercises logged yet.</p>
            ) : (
                <ul>
                    {history.map((exercise) => (
                        <li key={exercise.exercise_id}>
                            <div className="exercise-type">{exercise.exercise_type}</div>
                            <div className="exercise-details">
                                {exercise.duration} min, {exercise.distance} km on {new Date(exercise.exercise_date).toLocaleDateString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExerciseHistory;
