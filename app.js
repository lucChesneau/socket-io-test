import express from "express";
import routes from "./public/routes/routes.js";
const app = express();
import * as http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import { dirname } from "path";
import { fileURLToPath } from "url";
import dbConnect from "./sequelize.js";
import { getUsername } from "./public/vues/connected.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";

dbConnect();

const __dirname = dirname(fileURLToPath(import.meta.url));

const rootDir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use("/public", express.static("public"));
app.use("/models", express.static("models"));




io.on("connection", (socket) => {

    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const usernameToleft = jwt.verify(cookies.token, process.env.SECRET).username;
    console.log(usernameToleft);

  socket.on("connexion_user", (cookie) => {
    const username = getUsername(cookie);
    if (username) {
      socket.broadcast.emit("connexion_user", `${username} has joined the chat`);
      socket.emit("online_user", username);
    } else {
      socket.broadcast.emit(
        "connexion_user",
        `An anonyme user has joined the chat`
      );
    }
  });

  socket.on("chat message", (msg, cookie) => {
    const username = getUsername(cookie);
    if (username) {
      io.emit("chat message", username + " : " + msg);
    } else {
      io.emit("chat message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("disconnection_message", usernameToleft)
  });

});

app.listen(3001, () => {
  console.log("listening on *:3001");
});

server.listen(3000, () => {
  console.log("Server is running on port 3001");
});

export { rootDir };
