import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

const signup = async(req, res)=> {
    const {email, password} = req.body;

    const user = await authServices.findUser({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({...req.body, password: hashPassword});

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;

    const payload = {
        id,
    };

    const token = createToken(payload);

    res.json({
        token, 
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}