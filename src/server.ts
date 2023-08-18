import express from 'express';
import cors from 'cors';
import { usersRoute } from './routes/users';
import { signUpRoute } from './routes/signUp';
import { loginRoute } from './routes/login';
import { deleteRouter } from "./routes/deleteUser";
import { blockRouter } from "./routes/block"
import { unblockRouter } from "./routes/unblock"

const app = express();
const port = process.env.PORT || 3006;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

app.use(express.json());
app.use(cors());

app.use('/users', usersRoute);
app.use('/api/sign-up', signUpRoute);
app.use('/api/login', loginRoute);
app.use("/api/delete-user", deleteRouter);
app.use('/api/block', blockRouter)
app.use("/api/unblock", unblockRouter)