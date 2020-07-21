import { Request, NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken';

export class Token {
    static create(datas) {
        return jwt.sign(datas, process.env.SECRET, {
            expiresIn: 3600
        });
    }
    static verifyJWT(req: Request , res: Response, next: NextFunction) {
        const token = req.headers['x-access-token'] as string;
        if(!token)
            return res.status(401).send({ auth: false, message: 'Token not Info.' });
        jwt.verify(token, process.env.SECRET, function(error, decoded) {
            if(error) 
                return res.status(500).send({ auth: false, message: 'Token invalid.' });
            req['userId'] = decoded['id'];
            console.log('user Id: ' + decoded['id']);
            next(); 
        })
    }
}