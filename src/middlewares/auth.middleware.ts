import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { APP_JWT_SECRET_KEY } from "../config/app.config";

export async function checkBearerToken(req: Request, res: Response, next: NextFunction) {
    try {
        let bearerToken = req.headers.authorization?.replace('Bearer ', '') ?? '';
        
        var decode:any = jwt.verify(bearerToken, APP_JWT_SECRET_KEY)

        req.user = decode.data;

        return next();
    } catch (error) {
        
    }
}