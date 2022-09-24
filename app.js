import express from "express";
import routes from "./routes/routes.js";
import Db from "./db/db.js";

const app = express();

app.use(routes);

Db.sync()
.then(console.log("Database is synced"))
.catch(error => console.log(error));
app.listen(3001, () => {console.log("Server is running on port 3000")});

