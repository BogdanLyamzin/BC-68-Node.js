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
    await authServices.updateUser({_id: id}, {token});

    res.json({
        token, 
    })
}

const getCurrent = (req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await authServices.updateUser({_id}, {token: ""});

    res.json({
        message: "Logout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}