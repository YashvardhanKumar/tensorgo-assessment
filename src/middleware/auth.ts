import { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect(process.env.FRONTEND_URL || '')
}