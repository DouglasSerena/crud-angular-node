import { Response, Request } from 'express';
import { UserDao } from './../dao/UserDao';
import { User } from './../models/User';
import { Token } from './../config/Token';
import { Cryptography } from '../config/Cryptography';

export class UserController {
    // LIST ALL
    static async index(req: Request, res: Response) {
        const result = await UserDao.listAll()
        if (result.status == 500)
            return res.status(500).json({ ...result });
        console.log("get list");
        return res.status(200).json(result.user);
    }

    // GET BY ID
    static async getById(req: Request, res: Response) {
        const { id } = req.params;

        const result = await UserDao.getById(Number(id));

        if (result.status == 500)
            return res.status(500).json({ ...result });
        if (result.status == 400)
            return res.status(400).json({ ...result });

        console.log("get user " + result.user.id);
        return res.status(200).json(result.user);

    }

    // STORE
    static async store(req: Request, res: Response) {
        const datas: User = req.body;

        // fild null
        if (datas.name == "" || datas.email == "" || datas.password == "")
            return res.status(400).json({ error: 'fild required' });

        // criptografar
        datas.password = Cryptography.encrypt(datas.password);

        const keys: string[] = []
        const values: string[] = []
        const length: string[] = []
        Object.keys(datas).forEach(key => {
            keys.push(key);
            values.push(datas[key]);
            length.push('?')
        });

        const result = await UserDao.store(keys, values, length, datas.name);

        if (result.status == 500)
            return res.status(500).json({status: result.status, message: 'there was an error with the searches'});

        console.log("user save");
        datas['id'] = result.id
        return res.status(201).json(datas);
    }

    // UPDATE
    static async update(req: Request, res: Response) {
        const { id } = req.params;

        const userExit = await UserDao.getById(Number(id));

        if (userExit.status == 500)
            return res.status(500).json({ ...userExit });

        if (userExit.status == 400)
            return res.status(400).json({ ...userExit });

        const datas: User[] = req.body;
        const newDatas: string[] = [];

        Object.keys(datas).forEach(key => {
            if (datas[key] != '') {
                newDatas.push(`${key}="${datas[key]}"`);
            }
        });

        const result = await UserDao.update(Number(id), newDatas);

        if (result.status == 500)
            return res.status(500).json({ ...result });

        console.log("user update");
        return res.status(200).json({ ...result });
    }

    // DELETE
    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        const userExit = await UserDao.getById(Number(id));

        if (userExit.status == 500)
            return res.status(500).json({ ...userExit });

        if (userExit.status == 400)
            return res.status(400).json({ ...userExit });

        const result = await UserDao.delete(Number(id));

        if (result.status == 500)
            return res.status(500).json({ ...result });

        console.log("user delete " + id);
        return res.status(200).json({ ...result });
    }

    // SIGNIN
    static async signin(req: Request, res: Response) {
        const { email, password } = req.body;


        const result = await UserDao.signin(email);
        console.log(result)
        if(!result) {
            return res.status(400).send({ auth: false, message: "different emails" });
        }

        const userObject = await UserDao.getById(result['id']);
        const user = userObject.user
        
        const emailsEqual = user.email === email

        const passwordEqual = Cryptography.decrypts(password, user.password);

        if (emailsEqual)
            if (passwordEqual) {
                const token = Token.create({ id: user.id, name: user.name, email });
                return res.status(200).send({ auth: true, token: token });
            } else {
                return res.status(400).send({ auth: false, message: "different password and email." });
            }
        return res.status(400).send({ auth: false, message: "different emails" });
    }

    // SEARCH
    static async search(req: Request, res: Response) {
        const data = req.body;

        const key = Object.keys(data).join('');

        const result = await UserDao.search(key, data[key]);

        res.status(200).json(result)
    }
}