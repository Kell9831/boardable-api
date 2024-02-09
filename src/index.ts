import express from "express";
import userRouter from "./routers/user-router";
import errorHandler from "./middlewares/error";
import logRequest from "./middlewares/logRequest";
import authRouter from "./routers/auth-router";
import cors from "cors";
import { boardRouter } from "./routers/board";

const app = express();
const port = 5500;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));

app.use(express.json());

app.use(logRequest);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/boards", boardRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
