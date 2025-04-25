const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("clientMessage", (message) => {
        console.log(`A new Message from Client-End`,message)
        io.emit('message', message)
    });
    
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

server.listen(5000, () => console.log(`Server started at http://localhost:5000`));
