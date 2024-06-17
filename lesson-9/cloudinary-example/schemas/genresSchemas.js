import Joi from "joi";

export const genreAddSchema = Joi.object({
    title: Joi.string().required(),
})

export const genreUpdateSchema = Joi.object({
    title: Joi.string(),
})