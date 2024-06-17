import HttpError from "../helpers/HttpError.js"

const isEmptyBody = (req, res, next)=> {
    if(!Object.keys(req.body).length) {
        return next(HttpError(400, "Fields must be exist"))
    }
    next()
}

export default isEmptyBody;