import db from "./../config/database";
import { User } from '../models/User';

export class UserDao {
    // LIST ALL
    static listAll(): Promise<{status: Number, user: User[], message:string}>{
        const result = {status: 200, user: null, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users`;
            db.all(sql, (error, user: User[]) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                };
                result.user = user
                resolve(result)
            })
        });
    }

    // GET BY ID
    static getById(id: number): Promise<{status: Number, user: User, message:string}> {
        const result = {status: 200, user: null, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE id=?`;
            db.get(sql, [id], (error, user: User) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                };
                if(user == null) {
                    result.message = "User not found";
                    result.status = 400;
                    resolve(result)
                }
                result.user = user
                resolve(result)
            })
        })
    }

    // STORE
    static async store(keys: string[], value: string[], length: string[], name: string): Promise<{status: number, id: number}> {
        const result = {status: 200, id: 0}
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO users (${keys.join(',')})
                VALUES (${length.join(',')})`;
            db.run(sql, value, (error, id) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    resolve(result)
                };
                sql = `SELECT id FROM users WHERE name="${name}"`;
                db.get(sql, (error, id) => {
                    console.log(id)
                    resolve(id)
                })
            })
        })
    }

    // UPDATE
    static update(id: number, datas: string[]): Promise<{status: number, message: string}> {
        const result = {status: 200, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users SET ${datas.join(',')}, updated_at=(datetime('now','localtime'))  WHERE id=${id}`;
            db.run(sql, (error, user) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                }
                result.status = 201
                result.message = `User ${id} updated successfully`
                resolve(result);
            })
        })
    }

    // DELETE
    static delete(id: number): Promise<{status: number, message: string}>  {
        const result = {status: 200, message: ""}
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE id=${id}`;
            db.run(sql, (error, user) => {
                if (error) {
                    console.log(error);
                    result.status = 500;
                    result.message = "there was an error with the searches";
                    resolve(result)
                }
                db.run('DELETE FROM addresses WHERE user_id = ?', [id], (error,res) => {
                    if (error) {
                        console.log(error);
                        result.status = 500;
                        result.message = "there was an error with the searches";
                        resolve(result)
                    }
                    result.status = 200
                    result.message = `User ${id} removed successfully`
                    resolve(result);
                })
            })
        })
    }

    // SEARCH
    static search(key: string, value: string): Promise<boolean>  {
        return new Promise((resolve, reject) => {
            const sql = `SELECT ${key} FROM users WHERE ${key}="${value}"`;
            db.all(sql, (error, res: []) => {
                if(res.length == 0) {
                    resolve(null);
                }
                resolve(true);
            })
        });
    }

    // SIGNIN
    static signin(email: string) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM users WHERE email="${email}"`;
            db.get(sql, (error, id: number) => {
                if(error)
                    resolve(false)
                resolve(id)
            })
        })
    }
}