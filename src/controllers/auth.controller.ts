import { NextFunction, Request, Response } from "express";

export class AuthController {

    static  async login(req: Request, res: Response, next: NextFunction) {

        try {
          

        } catch (error) {
            // res.sendStatus(401);

            res.json({
                status: error,
                message: '',
            })
        }

    }

}