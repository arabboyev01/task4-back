import express from 'express';
import db from "../knexfile";

const blockRouter = express.Router();

blockRouter.put('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.body;
    if(token){
        try {
            const result = await db('users')
                .where({ id })
                .update({ status: 'blocked' });
        
            if (result === 1) {
                res.json('User status updated successfully');
            } else {
                res.json('User not found or status already updated');
            }
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(501).json("Token problem")
    }
});

export { blockRouter };