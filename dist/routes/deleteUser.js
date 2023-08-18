"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../knexfile"));
const deleteRouter = express_1.default.Router();
exports.deleteRouter = deleteRouter;
deleteRouter.delete('/', async (req, res) => {
    const token = req.headers.authorization;
    const { id } = req.body;
    if (token) {
        try {
            const deletedCount = await (0, knexfile_1.default)('users').where({ id }).del();
            res.json(`${deletedCount} user(s) deleted.`);
        }
        catch (error) {
            res.send(error);
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
});
