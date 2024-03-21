import { Request, Response, NextFunction } from "express";

export const usersAddPage = async (req: Request, res: Response, next: NextFunction) => {
    const { add } = req.body as { add: string };
    if (add == undefined) {
        next();
        return;
    }
    res.render('new')
    return;
}

