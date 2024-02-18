import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { RoomHandler } from "./room";

dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();
app.use(cors);
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    RoomHandler(socket);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`listening on port: http://localhost:${PORT}`);
});