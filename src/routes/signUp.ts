// import express from 'express';
// import db from "../knexfile";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const signUpRoute = express.Router();

// signUpRoute.post('/', async (req, res) => {
//     const { firstname, lastname, username, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         await db('users').insert({ firstname, lastname, username, password: hashedPassword });

//         const token = jwt.sign({ username }, 'secret');

//         res.send({ token });
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred during sign-up." });
//     }
// });

// export { signUpRoute };

// import express from 'express';
// import db from "../knexfile";
// import jwt from "jsonwebtoken";
// import argon2 from "argon2";

// const signUpRoute = express.Router();

// signUpRoute.post('/', async (req, res) => {
//     const { firstname, lastname, username, password } = req.body;

//     try {
//         const hashedPassword = await argon2.hash(password);

//         await db('users').insert({ firstname, lastname, username, password: hashedPassword });

//         const token = jwt.sign({ username }, 'secret');

//         res.send({ token });
//     } catch (error) {
//         res.status(500).send({ error: "An error occurred during sign-up." });
//     }
// });

// export { signUpRoute };

import express from 'express';
import db from "../knexfile";
import jwt from "jsonwebtoken";

const signUpRoute = express.Router();

signUpRoute.post('/', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    try {
        await db('users').insert({ firstname, lastname, username, password });

        const token = jwt.sign({ username }, 'secret');

        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: "An error occurred during sign-up." });
    }
});

export { signUpRoute };

