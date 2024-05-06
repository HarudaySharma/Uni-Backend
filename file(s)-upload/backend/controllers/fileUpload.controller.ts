import { NextFunction, Request, Response } from "express";
import { httpError } from "../middlewares/errorHandler.js";

export const fileUpload = (req: Request, res: Response, next: NextFunction) => {
    console.log('route hit');
    if(!req.files) {
        console.log('no files');
        return next(new httpError('invalid file type', 401));
    }
    res.status(200).send('<h1> file uploaded successfully</h1>');
    return;
}
