import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const connexion = (req, res) => {
        res.sendFile("/Users/chesneau-luc/Desktop/Github/soketio-chat/vues/connexion/connexion.html");
}
const getAll = (req, res) => {}
const getOne = (req, res) => {}
const createOne = (req, res) => {}
const updateOne = (req, res) => {}
const deleteOne = (req, res) => {}

export { connexion, getAll, getOne, createOne, updateOne, deleteOne };