import { NextFunction, Request, Response } from "express";
import { Cache } from "../utils/cache.util";
import { db } from "../services/db.service";

export async function apiKey(req: Request, res: Response, next: NextFunction) {

    let nonSecurePaths = ["/docs"]

    if (nonSecurePaths.includes(req.path)) return next();

    try {
        /* get apiKey from header or from query `api_key` */
        var apiKey = req.headers['x-api-key'] || req.query['api_key'];
        
        /* get apiKey from database and store to cache */
        var getApiKey = await Cache.remember(`apikey:${apiKey}`, 60*60, async function() {
            return await db.select('key').from('api_keys').where('key', apiKey);
        });

        console.log(getApiKey);

        /* check apiKey is exists or not exists, if not exists then give response 401 */
        if(getApiKey instanceof Array && getApiKey.length > 0) {
            
            return next();

        } else {
            /* set status code 401 if token is not found or broken key */
            res.status(401)
            res.json({
                status: 'error',
                message: '[Unauthorized] Invalid API Key (x-api-key OR api_keys)',
            })
        }
    } catch (error) {
        res.status(401)
        res.json({
            status: 'error',
            message: '[Unauthorized] Invalid API Key (x-api-key OR api_keys)',
            error: error,
        })
    }

}