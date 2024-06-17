import express from "express";

import genresControllers from "../controllers/genres-controllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import validateBody from "../decorators/validateBody.js";

import {genreAddSchema} from "../schemas/genresSchemas.js"; 

const genresRouter = express.Router();

genresRouter.get("/", genresControllers.getAll);

genresRouter.post("/", isEmptyBody, validateBody(genreAddSchema), genresControllers.add);

export default genresRouter;