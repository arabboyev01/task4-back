import express from 'express';
import db from "../knexfile";

const deleteRouter = express.Router();

deleteRouter.delete('/', async (req, res) => {
    const token = req.headers.authorization;
    const {id} = req.body;

    if (token) {
        try {
            const deletedCount = await db('users').where({ id }).del();
            res.json(`${deletedCount} user(s) deleted.`);
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

export { deleteRouter };