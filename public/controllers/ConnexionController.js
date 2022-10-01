import {rootDir} from "../../app.js";
import User from "../models/User.js";

const connexion = (req, res) => {
        res.sendFile(rootDir + "/public/vues/connexion/connexion.html");
}

export { connexion };