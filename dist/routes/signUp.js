"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRoute = void 0;
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../knexfile"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpRoute = express_1.default.Router();
exports.signUpRoute = signUpRoute;
signUpRoute.post('/', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await (0, knexfile_1.default)('users').insert({ firstname, lastname, username, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ username }, 'secret');
        res.send({ token });
    }
    catch (error) {
        res.status(500).send({ error: "An error occurred during sign-up." });
    }
});
