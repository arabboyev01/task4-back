import express from 'express';
import db from "../knexfile";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db('users').where('username', username).first();
        const getStatus = await db('users').where('username', username).select('status').first();

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (getStatus.status === "blocked") {
            return res.status(403).json({ error: "You are blocked account" });
        }

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (passwordMatch && getStatus.status === "active") {
            const token = jwt.sign({ username }, 'secret');
            res.json({ token });
        }

    } catch (error) {
        res.status(500).json({ error: "An error occurred during login." });
    }
});

export { loginRoute };