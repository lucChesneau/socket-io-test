import { Router } from "express";
import {rootDir} from "../../app.js";
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';


function connexion(req, res) {
        res.sendFile(rootDir + "/public/vues/connexion/connexion.html");
}

function tryConnect(req, res) {
        res.send("tryConnect");
}

function register(req, res) {
        res.sendFile(rootDir + "/public/vues/register/register.html");
}


async function tryRegister(req, res, next) {
        
        if(req.body.password === req.body.confirmPassword) {
                const user = await User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                });
                user.save();
                        
                next();
        } else {
                res.send("passwords don't match");
        }

        
}




let ConnexionRoute = {
        connexion : connexion,
        register : register,
        tryConnect : tryConnect,
        tryRegister : tryRegister
}

// app.get('/cacs', (req, res) => {
//         res.send("wtf");
// });

export default ConnexionRoute;

