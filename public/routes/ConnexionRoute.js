import { Router } from "express";
import {rootDir} from "../../app.js";
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


function connexion(req, res) {
        res.sendFile(rootDir + "/public/vues/connexion/connexion.html");
}

async function tryConnect(req, res) {

    const user = await User.findOne({ where : {email : req.body.email }});
        if(user){
            const password_valid = await bcrypt.compare(req.body.password,user.password);
        if(password_valid){
            const token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
            res.status(200).json({ token : token });
        } else {
            res.status(400).json({ error : "Password Incorrect" });
        }

        }else{
            res.status(404).json({ error : "User does not exist" });
        }
        
}

function register(req, res) {
        res.sendFile(rootDir + "/public/vues/register/register.html");
}


async function tryRegister(req, res, next) {

        const salt = await bcrypt.genSalt(10);
        
        if(req.body.password === req.body.confirmPassword) {
                const user = await User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        username: req.body.username,
                        password: await bcrypt.hash(req.body.password, salt)
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

