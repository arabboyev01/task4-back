import express from 'express';
import db from "../knexfile";
import jwt from "jsonwebtoken";

const usersRoute = express.Router();

usersRoute.get('/', (req, res) => {
    const token = req.headers.authorization;

    if (token) {
        db('users').select()
            .then(rows => res.json(rows))
            .catch(() => res.status(500).json({ error: "Database error" }));
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

export { usersRoute };
