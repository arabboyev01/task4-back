"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../knexfile"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginRoute = express_1.default.Router();
exports.loginRoute = loginRoute;
loginRoute.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await (0, knexfile_1.default)('users').where('username', username).first();
        const getStatus = await (0, knexfile_1.default)('users').where('username', username).select('status').first();
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (getStatus.status === "blocked") {
            return res.status(403).json({ error: "You are blocked account" });
        }
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (passwordMatch && getStatus.status === "active") {
            const token = jsonwebtoken_1.default.sign({ username }, 'secret');
            res.json({ token });
        }
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred during login." });
    }
});
