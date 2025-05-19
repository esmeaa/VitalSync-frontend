import React, { useEffect, useState } from "react";
import './DietHistory.css';

const DietHistory = () => {
    const [history, setHistory] = useState([]);
    const user_name = localStorage.getItem("user_name");

    useEffect(() => {
        const fetchDietHistory = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/diet-log?user_name=${encodeURIComponent(user_name)}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("Failed to fetch diet history:", err);
            }
        };

        if (user_name) fetchDietHistory();
    }, [user_name]);

    return (
        <div className="diet-history">
            <h2>Diet History</h2>
            {history.length === 0 ? (
                <p className="no-logs">No diet logs found.</p>
            ) : (
                <ul className="diet-list">
                    {history.map((log) => (
                        <li key={log.id} className="diet-item">
                            <div className="food-name">{log.food_name}</div>
                            <div className="diet-details">
                                <span className="calories">{log.calories} kcal</span>,{' '}
                                <span className="meal-type">{log.meal_type}</span> on{' '}
                                <span className="date">{new Date(log.created_at).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DietHistory;
