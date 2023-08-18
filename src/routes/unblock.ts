import express from 'express';
import db from "../knexfile";

const unblockRouter = express.Router();

unblockRouter.put('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.body;
    if(token){
        try {
            const result = await db('users')
                .where({ id })
                .update({ status: 'active' });
        
            if (result === 1) {
                res.json('User status updated successfully');
            } else {
                res.json('User not found or status already updated');
            }
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(501).json("Token error")
    }
});

export { unblockRouter };