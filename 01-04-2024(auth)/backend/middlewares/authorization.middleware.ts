import { NextFunction, Request, Response } from "express";
import { USER } from "../controllers/auth.controller";

export default function authorization(req: Request, res: Response, next: NextFunction) {
    const user = req.session.user as USER;
    if (user.role === 'admin') {
        next();
        return;
    }
    else {
        res.redirect('/dashboard');
    }
}


