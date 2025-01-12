import { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    console.log(req.isAuthenticated());
    
    if (req.isAuthenticated()) {
        console.log(req.headers);
        next();
        return;
    }
    res.redirect(process.env.FRONTEND_URL || '')
}