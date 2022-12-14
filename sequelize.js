import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./public/db/db.js";
import User from "./public/models/User.js";


async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
      await User.sync({alter : false});
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default dbConnect;