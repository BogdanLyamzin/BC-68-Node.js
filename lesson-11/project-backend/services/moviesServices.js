import Movie from "../models/Movie.js"

export const getMovies = (params = {})=> {
    const {filter, fields, settings} = params;
    return Movie.find(filter, fields, settings).populate("genre", "title");
};

export const getOneMovie =  filter => Movie.findOne(filter);

export const addMovie = data => Movie.create(data);

export const updateOneMovie = (filter, data)=> Movie.findOneAndUpdate(filter, data);

export const deleteOneMovie = filter => Movie.findOneAndDelete(filter);