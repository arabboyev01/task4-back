"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockRouter = void 0;
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../knexfile"));
const unblockRouter = express_1.default.Router();
exports.unblockRouter = unblockRouter;
unblockRouter.put('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.body;
    if (token) {
        try {
            const result = await (0, knexfile_1.default)('users')
                .where({ id })
                .update({ status: 'active' });
            if (result === 1) {
                res.json('User status updated successfully');
            }
            else {
                res.json('User not found or status already updated');
            }
        }
        catch (error) {
            res.send(error);
        }
    }
    else {
        res.status(501).json("Token error");
    }
});
