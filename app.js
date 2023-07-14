import express from "express";
import userRouter from "./routes/users.js"
import taskRouter from "./routes/tasks.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path : "./data/config.env"
})


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI], // allow to server to accept request
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/",(req,res)=>{
    res.send("keep going kid")
})


app.use(errorMiddleware);