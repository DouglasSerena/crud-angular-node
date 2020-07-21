import { Response, Request } from 'express';
import { AddressDao } from './../dao/AddressDao'
import { Address } from 'cluster';
import axios from 'axios'

export class AddressController {
    // LIST ALL
    static async index(req: Request, res: Response) {
        const { user_id } = req.params;
        const result = await AddressDao.listAll(Number(user_id))
        if(result.status == 500)
            return res.status(500).json({...result});
        if(result.status == 400)
            return res.status(400).json({...result});
        return res.status(200).json(result.address);
    }

    // GET BY ID
    static async getById(req: Request, res: Response) {
        const { user_id, id } = req.params;
        
        const result = await AddressDao.getById(Number(user_id), Number(id));
        
        if(result.status == 500)
            return res.status(500).json({...result});
        if(result.status == 400)
            return res.status(400).json({...result});
            
        return res.status(200).json(result.address);

    }

    // STORE
    static async store(req: Request, res: Response) {
        const { user_id } = req.params
        const datas: Address = req.body;
        
        // fild null
        Object.keys(datas).forEach(key => {
            if(datas[key] == '' && key != 'complement') 
            return res.status(400).json({error: `fild ${key} required`});
        })
        
        datas['user_id'] = user_id
        const keys: string[] = []
        const values: string[] = []
        const length: string[] = []
        Object.keys(datas).forEach(key => {
            keys.push(key);
            values.push(datas[key]);
            length.push('?')
        });

        console.log(values, length)

        const result = await AddressDao.store(keys, values, length);

        if(result.status == 500)
            return res.status(500).json({...result});

        console.log('store address')
        return res.status(201).json(datas);
    }

    // UPDATE
    static async update(req: Request, res: Response) {
        const { user_id, id } = req.params;

        const addressExit = await AddressDao.getById(Number(user_id), Number(id)) ;

        if(addressExit.status == 500)
            return res.status(500).json({...addressExit});
        
        if(addressExit.status == 400)
            return res.status(400).json({...addressExit});
        
        const datas: Address[] = req.body;
        const newDatas: string[] = [];

        Object.keys(datas).forEach(key => {
            if(datas[key] != '') {
                newDatas.push(`${key}="${datas[key]}"`);
            }
        });

        const result = await AddressDao.update(Number(user_id), Number(id), newDatas);
        console.log(result)
        if(result.status == 500)
            return res.status(500).json({...result});

        return res.status(200).json({...result});
    }

    // DELETE
    static async delete(req: Request, res: Response) {
        const { user_id, id } = req.params;

        const userExit = await AddressDao.getById(Number(user_id), Number(id));

        if(userExit.status == 500)
            return res.status(500).json({...userExit});
        
        if(userExit.status == 400)
            return res.status(400).json({...userExit});
        
        const result = await AddressDao.delete(Number(user_id), Number(id));
        
        if(result.status == 500)
            return res.status(500).json({...result});

        return res.status(200).json({...result});
    }

    //  ZIP
    static async zip(req: Request, res: Response) {
        const { zip } = req.params;
        axios.get(`https://viacep.com.br/ws/${zip}/json`)
            .then(response => {
                res.status(200).json(response.data)
            }).catch(console.log)
    }
}