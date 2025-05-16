const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const db = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'userdb',
    port: 5432,
});

db.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected to database');
    }
});


app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
}
);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.get('/api', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying DB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// // works always
// app.post("/api/login", async (req, res) => {
//     const { user_name, user_password } = req.body;
//     console.log("Received profile:", req.body);

//     try {
//         const result = await db.query(
//             "SELECT * FROM users WHERE user_name = $1 AND user_password = $2",
//             [user_name, user_password]
//         );

//         console.log("DB result:", result.rows)

//         if (result.rows.length > 0) {
//             // Successful login
//             res.status(200).json({

//                 message: "Login successful",
//                 login: "success",
//                 userId: result.rows[0].user_id,
//             }
//             );
//         } else {
//             // Invalid credentials
//             res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }

// });

app.post("/api/login", async (req, res) => {
    const { user_name, user_password } = req.body;
    try {
        const result = await db.query(
            "SELECT * FROM users WHERE user_name = $1 AND user_password = $2",
            [user_name, user_password]
        );

        if (result.rows.length > 0) {
            // Successful login
            res.status(200).json({
                message: "Login successful",
                login: "success",
                userId: result.rows[0].user_id,
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// new application user registration
// WORKING CODE

app.post("/api/register", async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;
    console.log("Received registration data:", req.body);

    // check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // check if username already exists
    try {
        const existingUser = await db.query(
            "SELECT * FROM users WHERE user_name = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // all checks passed, proceed to insert the new user
        const result = await db.query(
            "INSERT INTO users (first_name, last_name, user_name, user_password) VALUES ($1, $2, $3, $4)",
            [firstName, lastName, username, password]
        );

        res.status(200).json({ message: "Account created" });

    } catch (err) {
        console.error("Error checking username:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Update the user's profile based on their user_name
app.post('/api/editprofile', async (req, res) => {
    const { user_name, first_name, last_name, gender, age, height, weight, ethnicity } = req.body;

    if (!user_name) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        // Check if the user exists
        const result = await db.query("SELECT * FROM users WHERE user_name = $1", [user_name]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's profile information
        await db.query(
            `UPDATE users 
            SET first_name = $1, last_name = $2, gender = $3, age = $4, height = $5, weight = $6, ethnicity = $7
            WHERE user_name = $8`,
            [first_name, last_name, gender, age, height, weight, ethnicity, user_name]
        );

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to receive user setup data and insert into DB
// 



// Get food list
app.get("/api/food-items", async (req, res) => {
    const result = await db.query("SELECT * FROM food_items");
    res.json(result.rows);
});

// Add custom food item
app.post("/api/food-items", async (req, res) => {
    const { name } = req.body;
    const result = await db.query(
        "INSERT INTO food_items (name, is_custom) VALUES ($1, true) RETURNING *",
        [name]
    );
    res.status(201).json(result.rows[0]);
});

// Save a diet log
app.post("/api/diet-log", async (req, res) => {
    const { user_name, food_item_id, calories, meal_type } = req.body;

    // Validate user_name is provided
    if (!user_name) {
        return res.status(400).json({ message: "User not logged in" });
    }

    // Insert a new diet log record into the 'diet_logs' table in the database
    await db.query(
        `INSERT INTO diet_logs (user_name, food_item_id, calories, meal_type, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [user_name, food_item_id, calories, meal_type]
    );

    // Respond with success
    res.status(200).json({ message: "Diet log saved" });
});


app.post('/api/exercises', async (req, res) => {
    const { exerciseType, duration, distance, date, user_name } = req.body;

    if (!exerciseType || !duration || !distance || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await db.query(
            `INSERT INTO exercises (exercise_type, duration, distance, exercise_date, user_name)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [exerciseType, duration, distance, date, user_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error saving exercise:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/api/food-items", async (req, res) => {
    const result = await db.query("SELECT * FROM food_items");
    res.json(result.rows);
});

app.get("/api/diet-log", async (req, res) => {
    const { user_name } = req.query;
    if (!user_name) {
        return res.status(400).json({ message: "User not logged in" });
    }
    try {
        const result = await db.query(
            `SELECT dl.*, fi.name AS food_name
         FROM diet_logs dl
         JOIN food_items fi ON dl.food_item_id = fi.id
         WHERE dl.user_name = $1
         ORDER BY dl.created_at DESC`,
            [user_name]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching diet logs" });
    }
});

// BMI calculation helper
function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
}

// POST /api/bmi-feedback
app.post('/api/bmi-feedback', async (req, res) => {
    const { userId, gender, age, height, weight, ethnicity } = req.body;

    if (!userId || !gender || !age || !height || !weight || !ethnicity) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const bmi = calculateBMI(Number(weight), Number(height));

    try {
        const query = `
        SELECT feedback FROM bmi_feedback
        WHERE $1 BETWEEN min_bmi AND max_bmi
        LIMIT 1;
      `;
        const result = await db.query(query, [bmi]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No feedback found for BMI" });
        }

        const feedback = result.rows[0].feedback;

        res.json({
            userId,
            bmi: bmi.toFixed(2),
            feedback,
            receivedData: { gender, age, height, weight, ethnicity }
        });
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/api/setUp', async (req, res) => {
    try {
        const { first_name, last_name, user_name, user_password, gender, age, height, weight, ethnicity } = req.body;

        const query = `
            INSERT INTO users (first_name, last_name, user_name, user_password, gender, age, height, weight, ethnicity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        const values = [first_name, last_name, user_name, user_password, gender, age, height, weight, ethnicity];

        const result = await db.query(query, values);

        res.status(200).json({ message: "User setup saved", user: result.rows[0] });
    } catch (error) {
        console.error("Error saving setup data:", error);
        res.status(500).json({ message: "Failed to save setup data" });
    }
});
