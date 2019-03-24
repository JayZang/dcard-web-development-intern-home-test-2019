import { Request, Response, NextFunction } from "express";

export const home = (req: Request, res: Response, next: NextFunction) => {
    res.send("Home");
};