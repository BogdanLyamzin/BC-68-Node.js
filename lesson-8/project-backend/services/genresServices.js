import Genre from "../models/Genre.js";

export const getGenres = (params = {})=> {
    const {filter, fields, settings} = params;
    return Genre.find(filter, fields, settings);
};

export const addGenre = data => Genre.create(data);