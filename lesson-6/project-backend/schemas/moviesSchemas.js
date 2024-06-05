import Joi from "joi";

import { typeList, releaseYearRegexp } from "../constants/movie-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList).required(),
    genre: Joi.string().required(),
    releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList).required(),
    genre: Joi.string(),
    releaseYear: Joi.string().pattern(releaseYearRegexp),
})