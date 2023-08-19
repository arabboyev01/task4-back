// import express from 'express';
// import db from "../knexfile";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const loginRoute = express.Router();

// loginRoute.post('/', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await db('users').where('username', username).first();
//         const getStatus = await db('users').where('username', username).select('status').first();

//         if (!user) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (getStatus.status === "blocked") {
//             return res.status(403).json({ error: "You are blocked account" });
//         }

//         if (!passwordMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }
//         if (passwordMatch && getStatus.status === "active") {
//             const token = jwt.sign({ username }, 'secret');
//             res.json({ token });
//         }

//     } catch (error) {
//         res.status(500).json({ error: "An error occurred during login." });
//     }
// });

// export { loginRoute };
// import express from 'express';
// import db from "../knexfile";
// import jwt from "jsonwebtoken";
// import argon2 from "argon2";

// const loginRoute = express.Router();

// loginRoute.post('/', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await db('users').where('username', username).first();
//         const getStatus = await db('users').where('username', username).select('status').first();

//         if (!user) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const passwordMatch = await argon2.verify(user.password, password);

//         if (getStatus.status === "blocked") {
//             return res.status(403).json({ error: "You are a blocked account" });
//         }

//         if (!passwordMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         if (passwordMatch && getStatus.status === "active") {
//             const token = jwt.sign({ username }, 'secret');
//             res.json({ token });
//         }

//     } catch (error) {
//         res.status(500).json({ error: "An error occurred during login." });
//     }
// });

// export { loginRoute };

import express from 'express';
import db from "../knexfile";
import jwt from "jsonwebtoken";

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db('users').where('username', username).first();
        const getStatus = await db('users').where('username', username).select('status').first();

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (getStatus.status === "blocked") {
            return res.status(403).json({ error: "You are a blocked account" });
        }

        if (user.password === password) {
            if (getStatus.status === "active") {
                const token = jwt.sign({ username }, 'secret');
                res.json({ token });
            } else {
                return res.status(403).json({ error: "Account status is not active" });
            }
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred during login." });
    }
});

export { loginRoute };

