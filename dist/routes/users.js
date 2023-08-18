"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = __importDefault(require("express"));
const knexfile_1 = __importDefault(require("../knexfile"));
const usersRoute = express_1.default.Router();
exports.usersRoute = usersRoute;
usersRoute.get('/', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        (0, knexfile_1.default)('users').select()
            .then(rows => res.json(rows))
            .catch(() => res.status(500).json({ error: "Database error" }));
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
});
