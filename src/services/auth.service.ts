import moment = require("moment");
import { db } from "./db.service";
import * as jwt from 'jsonwebtoken';
import { APP_JWT_SECRET_KEY } from "../config/app.config";
import { DefaultDeserializer } from "v8";

export class AuthService {


    static async loginOrRegister(authData: AuthData) {
        try {
            let checkEmail = await this.checkEmail(authData.email);
            let user = null;

            console.log(checkEmail)

            /* if user has not found, then create new account */
            if (!checkEmail) {
                user = await this.registerUser(authData)
            } else {
                user = checkEmail;
            }

            /* generate token JWT */
            var payload = {
                iat: Math.floor(Date.now() / 1000) - 30,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {}
            }

            var token = jwt.sign(payload, APP_JWT_SECRET_KEY, { algorithm: 'HS256' })


            return {
                token: token,
                user,
            }

        } catch (error) {
            throw error;
        }
    }

    static async checkEmail(email: string) {

        let query = await db.from('users').where('email', email);
        
    

        if (!query.length) {
            return false;
        } else {
            return query.at(0)
        }
    }

    static async registerUser(data: AuthData) {
        return await db('users').insert({
            'name': data.name,
            'email': data.email,
            'email_verified_at': moment().format('YYYY-MM-DD HH:mm:ss'),
            'avatar': data.avatar,
            'nickname': data.nickname,
        }).returning('*');
    }
}


export class AuthData {
    name: string;
    email: string;
    token: string;
    provider: string;
    providerId: any;
    avatar: any;
    nickname: any;
    data: any;

    constructor(
        name: any,
        email: any,
        token: any,
        provider: any,
        providerId: any,
        avatar: any,
        nickname: any,
        data: any,
    ) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.provider = provider;
        this.providerId = providerId;
        this.avatar = avatar;
        this.nickname = nickname;
        this.data = data;
    }
}