import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import boardRouter from "./routes/board";

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});

app.use("/board", boardRouter);