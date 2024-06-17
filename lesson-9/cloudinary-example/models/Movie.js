import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

import { typeList, releaseYearRegexp } from "../constants/movie-constants.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: typeList,
        required: true,
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: "genre",
        required: true,
    },
    releaseYear: {
        type: String,
        match: releaseYearRegexp,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateSettings);

movieSchema.post("findOneAndUpdate", handleSaveError);

const Movie = model("movie", movieSchema);

export default Movie;