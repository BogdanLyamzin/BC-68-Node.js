import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import getFilterWithIdOwner from "../helpers/getFilterWithIdOwner.js";

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const filter = {
        owner,
    };
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const settings = {skip, limit};

    const result = await moviesServices.getMovies({filter, settings});

    res.json(result);
}

const getById = async (req, res) => {
    const filter = getFilterWithIdOwner(req);

    const result = await moviesServices.getOneMovie(filter);

    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await moviesServices.addMovie({...req.body, owner});

    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const filter = getFilterWithIdOwner(req);
    const result = await moviesServices.updateOneMovie(filter, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const filter = getFilterWithIdOwner(req);
    const result = await moviesServices.deleteOneMovie(filter);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}