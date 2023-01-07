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



// TODO POSSIBILITY TO CONNECT WITHOUT COOKIES
io.on("connection", (socket) => {
  console.log(cookie.token);

    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    let usernameToleft = jwt.decode(cookies.token, process.env.SECRET)?.username;

  socket.on("connexion_user", (cookie) => {
    let username = getUsername(cookie);
    if(username === null) {
      username = "Anonyme" + Math.floor(Math.random() * 1000);
    }
    if (username) {
      usernameConnected.push(username);
      socket.broadcast.emit("connexion_user", `${username} has joined the chat`);

      let count = 0;
      usernameConnected.find((usernamee, index) => {
        if (usernamee == username) {
          count == 0 ? count++ : usernameConnected.splice(index, 1);
        }
      });

      socket.emit("online_user", usernameConnected);
    } else {
      socket.broadcast.emit(
        "connexion_user",
        `An anonyme user has joined the chat`
      );
    }
  });

  socket.on("chat message", (msg, cookie) => {

    let username = "";
    cookie ? username = getUsername(cookie) : username = "Anonyme";
    if (username) {
      io.emit("chat message", username + " : " + msg);
    } else {
      io.emit("chat message", "Anonyme : " + msg);
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
  console.log("Server is running on port 3000");
});

export { rootDir };
