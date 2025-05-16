import React, { useEffect, useState } from 'react';

function DietLogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userName = localStorage.getItem('username');

    useEffect(() => {
        fetch(`/api/diet-logs/${userName}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Received diet logs:', data);
                setLogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load diet logs', err);
                setLoading(false);
            });
    }, [userName]);  // added dependency array here

    if (loading) return <div>Loading...</div>;
    if (logs.length === 0) return <div>No diet logs found.</div>;

    return (
        <div>
            <h1>Your Diet Logs</h1>
            {logs.map(({ meal_type, foods, total_calories }) => (
                <div key={meal_type}>
                    <h2>{meal_type}</h2>
                    <p>Total Calories: {total_calories}</p>
                    <ul>
                        {foods.map(food => (
                            <li key={food}>{food}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DietLogsPage;
