import express from "express";
import routes from "./routes/routes.js";
const app = express();
import * as http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import { dirname } from "path";
import { fileURLToPath } from "url";
import dbConnect from "./sequelize.js";

dbConnect();


const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/vues/index.html");
});

app.use(routes);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.broadcast.emit("hi");
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});


app.listen(3000, () => {
  console.log("Server is running on port 3001");
});
