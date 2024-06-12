import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const getAll = async (_, res) => {
    const result = await moviesServices.getMovies();

    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await moviesServices.getOneMovie({_id: id});

    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const result = await moviesServices.addMovie(req.body);

    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await moviesServices.updateOneMovie({_id: id}, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await moviesServices.deleteOneMovie({_id: id});
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