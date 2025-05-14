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

app.get('/api/bmi-feedback/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userRes = await db.query(`SELECT height, weight FROM users WHERE id = $1`, [userId]);

        if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });

        const { height, weight } = userRes.rows[0];
        const heightMeters = height / 100;
        const bmi = weight / (heightMeters * heightMeters);

        const feedbackRes = await db.query(
            `SELECT feedback FROM bmi_feedback WHERE $1 BETWEEN min_bmi AND max_bmi`,
            [bmi]
        );

        const feedback = feedbackRes.rows[0]?.feedback || "No feedback available";
        res.json({ bmi: bmi.toFixed(2), feedback });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get BMI feedback" });
    }
});

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(EXPRESS_SERVER_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_name: formData.username,
                user_password: formData.password,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Login failed:", errorText);
            alert("Login failed: " + res.statusText);
            return;
        }

        const data = await res.json();
        console.log("✅ Login success:", data);

        // ✅ Save user_name in localStorage
        localStorage.setItem("user_name", formData.username);

        // 🔁 Redirect or show dashboard
        // navigate("/editprofile"); // or similar

    } catch (err) {
        console.error("❌ Login error:", err);
        alert("An error occurred during login.");
    }
};
  

//works
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

// new application user registration
// WORKING CODE
// app.post("/api/register", async (req, res) => {
//     const { firstName, lastName, username, password, confirmPassword } = req.body;
//     console.log("Received registration data:", req.body);

//     // check if password and confirmPassword match
//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // check if username already exists
//     try {
//         const existingUser = await db.query(
//             "SELECT * FROM users WHERE user_name = $1",
//             [username]
//         );

//         if (existingUser.rows.length > 0) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         // all checks passed, proceed to insert the new user
//         const result = await db.query(
//             "INSERT INTO users (first_name, last_name, user_name, user_password) VALUES ($1, $2, $3, $4)",
//             [firstName, lastName, username, password]
//         );

//     } catch (err) {
//         console.error("Error checking username:", err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });
app.post("/api/register", async (req, res) => {
    const {
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
        gender,
        age,
        height,
        weight,
        ethnicity
    } = req.body;

    console.log("Received registration data:", req.body);

    // Password confirmation check
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if username already exists
        const existingUser = await db.query(
            "SELECT * FROM users WHERE user_name = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists. Please log in." });
        }

        // Insert new user with all fields
        await db.query(
            `INSERT INTO users 
             (first_name, last_name, user_name, user_password, gender, age, height, weight, ethnicity)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [firstName, lastName, username, password, gender, age, height, weight, ethnicity]
        );

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// // add profile data to the users table
app.post("/api/editprofile", async (req, res) => {
    console.log("Received editprofile request body:", req.body);
    const { firstName, lastName, username, password, gender, age, height, weight, ethnicity } = req.body;

    try {
        const existingUser = await db.query(
            "SELECT * FROM users WHERE user_name = $1",
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already exists, please log in instead." });
        }

        let { age, height, weight, gender, ethnicity } = req.body;

        console.log("Received data:", { age, height, weight, gender, ethnicity });

        // Convert inputs to numbers
        age = parseInt(age, 10);
        height = parseFloat(height); // cm
        weight = parseFloat(weight); // kg

        // Validate age
        if (isNaN(age) || age < 18 || age > 24) {
            return res.status(400).json({ message: "Invalid age. Please enter an age between 18 and 24." });
        }

        // Validate weight (kg)
        if (isNaN(weight) || weight < 0 || weight > 500) {
            return res.status(400).json({ message: "Invalid weight. Please enter a valid weight in kilograms." });
        }

        // Validate height (cm)
        if (isNaN(height) || height < 0 || height > 300) {
            return res.status(400).json({ message: "Invalid height. Please enter a valid height in centimeters." });
        }

        // Validate ethnicity
        const allowedEthnicities = ["Caucasian", "Asian", "Black"];
        if (!allowedEthnicities.includes(ethnicity)) {
            return res.status(400).json({ message: "Invalid ethnicity value" });
        }

        // Validate gender
        const allowedGender = ["Male", "Female"];
        if (!allowedGender.includes(gender)) {
            return res.status(400).json({ message: "Invalid gender value" });
        }


        // Insert new user with profile details
        await db.query(
            "INSERT INTO users (first_name, last_name, user_name, user_password, gender, age, height, weight, ethnicity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [firstName, lastName, username, password, gender, age, height, weight, ethnicity]
        );

        return res.status(201).json({ message: "Profile updated/created successfully" });

    } catch (err) {
        console.error("Error in editprofile:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});



// app.post('/api/groups', async (req, res) => {
//     const { group_name, user_id } = req.body;

//     try {
//         const groupRes = await db.query(
//             `INSERT INTO groups (group_name, created_by) VALUES ($1, $2) RETURNING id`,
//             [group_name, user_id]
//         );

//         const groupId = groupRes.rows[0].id;

//         // Add the creator as the first member
//         await db.query(
//             `INSERT INTO group_members (user_id, group_id) VALUES ($1, $2)`,
//             [user_id, groupId]
//         );

//         res.status(201).json({ message: 'Group created', groupId });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to create group' });
//     }
// });

// app.post('/api/groups/:groupId/join', async (req, res) => {
//     const { groupId } = req.params;
//     const { user_id } = req.body;

//     try {
//         await db.query(
//             `INSERT INTO group_members (user_id, group_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
//             [user_id, groupId]
//         );
//         res.status(200).json({ message: 'Joined group' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to join group' });
//     }
// });

// app.get('/api/groups/:groupId/members', async (req, res) => {
//     const { groupId } = req.params;

//     try {
//         const result = await db.query(
//             `SELECT users.id, users.first_name, users.last_name, users.user_name
//        FROM users
//        JOIN group_members ON users.id = group_members.user_id
//        WHERE group_members.group_id = $1`,
//             [groupId]
//         );

//         res.json({ members: result.rows });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to get group members' });
//     }
// });
