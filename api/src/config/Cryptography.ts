import bcrypt from 'bcrypt';

export class Cryptography {
    static encrypt(password) {
        return bcrypt.hashSync(password, 12);
    }
    static decrypts(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}