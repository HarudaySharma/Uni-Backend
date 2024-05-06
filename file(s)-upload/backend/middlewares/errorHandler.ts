import { NextFunction, Request, Response } from "express";

export class httpError extends Error {
    statusCode: number;
    constructor(msg: string, statusCode?: number) {
        super(msg);
        this.statusCode = statusCode || 501;
    }
}

export const errorHandler = (err: httpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode) .json({ message: err.message });
    return;
}
