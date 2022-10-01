import { Router } from "express";
import { rootDir } from "../../app.js";
import { index, connexion, getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/ctrl.js';
import User from '../models/User.js';
import ConnexionRoute from './ConnexionRoute.js';
const router = Router();

router.get('/', index,);

router.get('/jsp', (req, res) => {

        const UseFul = User.create({
                firstName: "John",
                lastName: "Hancock"
        });
        res.send(UseFul);

});

router.get('/connexion', ConnexionRoute.connexion);
router.post('/connexion', ConnexionRoute.tryConnect);

router.get('/register', ConnexionRoute.register);
router.post('/register', ConnexionRoute.tryRegister, function(req, res) {
        res.redirect('/connexion');
        // res.sendFile(rootDir + "/public/vues/connexion/connexion.html");
      });

router.get('/getAll', getAll);
router.get('getOne/:id', getOne);
router.post('createOne', createOne);
router.put( 'updateOne/:id', updateOne);
router.delete('deleteOne/:id', deleteOne);

export default router;
