import User from "../models/User.js";

export const deleteAllUser = () => User.deleteMany();

export const findUser = filter => User.findOne(filter);

export const updateUser = (filter, data)=> User.findOneAndUpdate(filter, data);

export const signup = data => User.create(data);