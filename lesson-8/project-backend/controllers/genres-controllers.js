import * as genresServices from "../services/genresServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const getAll = async(req, res)=> {
    const result = await genresServices.getGenres();

    res.json(result);
}

const add = async(req, res)=> {
    const result = await genresServices.addGenre(req.body);

    res.status(201).json(result);
}

export default {
    getAll: ctrlWrapper(getAll),
    add: ctrlWrapper(add),
}