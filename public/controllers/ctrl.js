import { dirname } from "path";
import { fileURLToPath } from "url";
import {rootDir} from "../../app.js";

import {connexion} from "./ConnexionController.js";

const index = (req, res) => {
        res.sendFile(rootDir + "/public/vues/index.html");
}

const getAll = (req, res) => {}
const getOne = (req, res) => {}
const createOne = (req, res) => {}
const updateOne = (req, res) => {}
const deleteOne = (req, res) => {}

export { index, connexion, getAll, getOne, createOne, updateOne, deleteOne };