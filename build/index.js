"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT;
var app = (0, express_1.default)();
app.use(cors_1.default);
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.get('/', function (req, res) {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', function (req, res) {
    return res.send('pong 🏓');
});
io.on("connection", function (socket) {
    console.log("new user connected");
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
    socket.on("connected", function (message) {
        console.log("recieved from client: ", message);
    });
    io.emit("message", "message from server");
});
server.listen(PORT, function () {
    console.log("listening on port: http://localhost:".concat(PORT));
});
