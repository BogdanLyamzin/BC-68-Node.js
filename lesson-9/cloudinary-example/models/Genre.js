import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

const genreSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
}, {versionKey: false, timestamps: true});

genreSchema.post("save", handleSaveError);

genreSchema.pre("findOneAndUpdate", setUpdateSettings);

genreSchema.post("findOneAndUpdate", handleSaveError);

const Genre = model("genre", genreSchema);

export default Genre;