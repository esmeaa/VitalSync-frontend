// const { Pool } = require('pg');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;
// app.use(cors());
// // app.use(express.json()); 

// const db = new Pool({
//     host: 'cmpstudb-01.cmp.uea.ac.uk',
//     user: 'tdn23mvu',
//     password: 'QuiteSharpYours70%',
//     database: 'tdn23mvu',
//     port: 5432,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err);
//     } else {
//         console.log('Connected to database');
//     }
// });


// // app.get('/api', (req, res) => {
// //     res.json({ message: 'Hello from the server!' });
// //     });

// app.listen(3001, () => {
//     console.log('Server is running on http://localhost:3001');
// }
// );
// app.get('/api', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM logininfo');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error querying DB:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.post("/api/login", (req, res) => {
//     const { username, userpassword } = req.body;
//     // Validate user, check DB, return token/user
// });
//secomd try
// app.post("/api/login", async (req, res) => {
//     const { username, userpassword } = req.body;

//     try {
//         const result = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1 AND userpassword = $2",
//             [username, userpassword]
//         );

//         if (result.rows.length > 0) {
//             // Successful login
//             res.json({
//                 message: "Login successful",
//                 user: result.rows[0]
//             });
//         } else {
//             // Invalid credentials
//             res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


// const { Pool } = require('pg');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json()); // Needed to parse JSON body

// const db = new Pool({
//     host: 'cmpstudb-01.cmp.uea.ac.uk',
//     user: 'tdn23mvu',
//     password: 'QuiteSharpYours70%',
//     database: 'tdn23mvu',
//     port: 5432,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err);
//     } else {
//         console.log('Connected to database');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// // Example route to test DB
// app.get('/api', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM logininfo');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error querying DB:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // ✅ Login route
// app.post("/api/login", async (req, res) => {
//     const { username, userpassword } = req.body;
//     try {
//         const result = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1 AND userpassword = $2",
//             [username, userpassword]
//         );
//         if (result.rows.length > 0) {
//             res.json({ success: true, user: result.rows[0] });
//         } else {
//             res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ success: false, error: "Internal server error" });
//     }

//     app.post('/api/register', async (req, res) => {
//         try {
//             // Handle registration logic here
//             const { username, password, firstName, lastName } = req.body;

//             // Registration logic (e.g., save user to database)
//             // If successful, send a response
//             res.status(200).json({ message: 'Registration successful' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Registration failed' });
//         }
//     });

//     res.json({ user: { username: newUser.username }, message: "User created" });


// });


// const { Pool } = require('pg');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json()); // Needed to parse JSON body

// const db = new Pool({
//     host: 'cmpstudb-01.cmp.uea.ac.uk',
//     user: 'tdn23mvu',
//     password: 'QuiteSharpYours70%',
//     database: 'tdn23mvu',
//     port: 5432,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err);
//     } else {
//         console.log('Connected to database');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// // Example route to test DB connection
// app.get('/api', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM logininfo');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error querying DB:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Login route
// app.post("/api", async (req, res) => {
//     const { username, userpassword } = req.body;
//     try {
//         const result = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1 AND userpassword = $2",
//             [username, userpassword]
//         );
//         if (result.rows.length > 0) {
//             res.json({ success: true, user: result.rows[0] });
//         } else {
//             res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ success: false, error: "Internal server error" });
//     }
// });

// // Register route
// app.post('/api', async (req, res) => {
//     const { username, password, firstName, lastName } = req.body;
//     try {
//         // You can perform validation and check if the username already exists before inserting into the database
//         const result = await db.query(
//             "INSERT INTO logininfo (username, userpassword, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
//             [username, password, firstName, lastName]
//         );
//         res.status(200).json({ message: 'Registration successful', user: result.rows[0] });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// const { Pool } = require('pg');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json()); // Needed to parse JSON body

// const db = new Pool({
//     host: 'cmpstudb-01.cmp.uea.ac.uk',
//     user: 'tdn23mvu',
//     password: 'QuiteSharpYours70%',
//     database: 'tdn23mvu',
//     port: 5432,
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err);
//     } else {
//         console.log('Connected to database');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// // Example route to test DB connection
// app.get('/api', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM logininfo');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error querying DB:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Login route
// app.post("/api/login", async (req, res) => {
//     const { username, userpassword } = req.body;
//     try {
//         const result = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1 AND userpassword = $2",
//             [username, userpassword]
//         );
//         if (result.rows.length > 0) {
//             res.json({ success: true, user: result.rows[0] });
//         } else {
//             res.status(401).json({ success: false, message: "Invalid credentials" });
//         }
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ success: false, error: "Internal server error" });
//     }
// });

// // Register route
// app.post('/api/register', async (req, res) => {
//     const { username, password, firstName, lastName } = req.body;
//     try {
//         // You can perform validation and check if the username already exists before inserting into the database
//         const result = await db.query(
//             "INSERT INTO logininfo (username, userpassword, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
//             [username, password, firstName, lastName]
//         );
//         res.status(200).json({ message: 'Registration successful', user: result.rows[0] });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });


const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Needed to parse JSON body

const db = new Pool({
    host: 'cmpstudb-01.cmp.uea.ac.uk',
    user: 'tdn23mvu',
    password: 'QuiteSharpYours70%',
    database: 'tdn23mvu',
    port: 5432,
});

db.connect((err) => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected to database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// // Registration route
// app.post('/api/register', async (req, res) => {
//     const { username, password, firstName, lastName } = req.body;

//     try {
//         // Check if the username already exists
//         const existingUser = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1",
//             [username]
//         );

//         if (existingUser.rows.length > 0) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         // Hash the password before inserting
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user with hashed password
//         const result = await db.query(
//             "INSERT INTO logininfo (username, userpassword, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
//             [username, hashedPassword, firstName, lastName]
//         );
//         res.status(200).json({ message: 'Registration successful', user: result.rows[0] });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

// app.post('/api/register', async (req, res) => {
//     const { username, password, firstName, lastName } = req.body;
//     try {
//         // Check if the username already exists
//         const existingUser = await db.query(
//             "SELECT * FROM logininfo WHERE username = $1",
//             [username]
//         );

//         if (existingUser.rows.length > 0) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         // Hash the password before inserting
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user with hashed password
//         const result = await db.query(
//             "INSERT INTO logininfo (username, userpassword, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
//             [username, hashedPassword, firstName, lastName]
//         );
//         res.status(200).json({ message: 'Registration successful', user: result.rows[0] });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ error: 'Registration failed' });
//     }
// });

const express = require("express");
const app = express();
const PORT = 3001;
const bcrypt = require('bcryptjs');
const db = require('./db');  // Assuming you have a db module to interact with your database

// Register route handling POST requests
app.post("/api/register", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    // Perform registration logic here (e.g., save to a database)
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database (assuming 'users' table exists)
        const result = await db.query(
            "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, hashedPassword, firstName, lastName]
        );

        const newUser = result.rows[0];
        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// app.use(express.json()); // Middleware to parse JSON body

// // Register route handling POST requests
// app.post("/api/register", (req, res) => {
//     const { username, password, firstName, lastName } = req.body;

//     // Perform registration logic here (e.g., save to a database)
//     // For this example, let's just return a success message
//     if (!username || !password || !firstName || !lastName) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     res.status(200).json({ message: "Registration successful" });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// Login route
app.post("/api/login", async (req, res) => {
    const { username, userpassword } = req.body;
    try {
        const result = await db.query(
            "SELECT * FROM logininfo WHERE username = $1",
            [username]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Compare the provided password with the stored hashed password
            const match = await bcrypt.compare(userpassword, user.userpassword);

            if (match) {
                res.json({ success: true, user });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});
