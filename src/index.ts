import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

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

app.get('/', (req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
})

app.get('/ping', (req: Request, res: Response) => {
    return res.send('pong 🏓')
})

io.on("connection", (socket) => {
    console.log("new user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("connected", (message) => {
        console.log("recieved from client: ", message);
    })

    io.emit("message", "message from server");
});

server.listen(PORT, () => {
    console.log(`listening on port: http://localhost:${PORT}`);
});