import db from "./../config/database";
import { Address } from '../models/Address';

export class AddressDao {
    // LIST ALL
    static listAll(user_id: number): Promise<{status: Number, address: Address[], message:string}>{
        const result = {status: 200, address: null, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM addresses WHERE user_id = ?`;
            db.all(sql, [user_id],(error, addresses: Address[]) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                };
                if(addresses.length == 0) {
                    result.message = "Has no address";
                    result.status = 400;
                    resolve(result)
                }
                result.address = addresses
                resolve(result)
            })
        });
    }

    // GET BY ID
    static getById(user_id: number, id: number): Promise<{status: Number, address: Address, message:string}> {
        const result = {status: 200, address: null, message: ""}
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM addresses WHERE user_id = ? and id = ?`;
                db.all(sql, [user_id, id],(error, address: Address[]) => {
                    if (error) {
                        console.log(error);
                        result.status = 500;
                        result.message = "there was an error with the searches";
                        resolve(result)
                    };
                    if(address.length == 0) {
                        result.message = "Address not found";
                        result.status = 400;
                        resolve(result)
                    }
                    result.address = address
                    resolve(result)
            });
        })
    }

    // STORE
    static async store(keys: string[], value: string[], length: string[]): Promise<{status: number, message: string}> {
        const result = {status: 200, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO addresses (${keys.join(',')})
                VALUES (${length.join(',')})`;
            db.run(sql, value, (error, id) => {
                console.log(id)
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                };
                resolve(result)
            })
        })
    }

    // UPDATE
    static update(user_id: number, id: number, datas: string[]): Promise<{status: number, message: string}> {
        const result = {status: 200, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `UPDATE addresses SET ${datas.join(',')}, updated_at=(datetime('now','localtime')) WHERE id=${id} AND user_id=${user_id}`;
            db.run(sql, (error, user) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                }
                console.log(user)
                result.status = 201
                result.message = `Address ${id} updated successfully`
                resolve(result);
            })
        })
    }

    // DELETE
    static delete(user_id: number, id: number): Promise<{status: number, message: string}>  {
        const result = {status: 200, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM addresses WHERE id=${id} AND user_id=${user_id}`;
            db.run(sql, (error, address) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                }
                result.status = 200
                result.message = `Address ${id} removed successfully`
                resolve(result);
            })
        })
    }
}