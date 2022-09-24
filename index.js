import express from 'express';
const app = express();
import * as http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.broadcast.emit('hi');
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
