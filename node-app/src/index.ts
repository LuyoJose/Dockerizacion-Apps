import express, { Request, Response } from "express";
const app = express();

app.get("/health", (_: Request, res: Response) => res.send("OK"));

app.listen(3000, () => console.log("Node app running on port 3000"));
