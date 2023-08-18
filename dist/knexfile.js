"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dataBase = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'mac',
        password: '',
        database: 'task4-db',
    },
    searchPath: ['knex', 'public'],
});
exports.default = dataBase;
