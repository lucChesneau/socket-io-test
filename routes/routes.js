import { Router } from "express";
import { connexion, getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/ctrl.js';
const router = Router();

router.get('/connexion', connexion);
router.get('/getAll', getAll);
router.get('getOne/:id', getOne);
router.post('createOne', createOne);
router.put( 'updateOne/:id', updateOne);
router.delete('deleteOne/:id', deleteOne);

export default router;
