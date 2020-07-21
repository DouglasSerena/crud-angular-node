import sqlite3 from 'sqlite3'; sqlite3.verbose;
import { Cryptography } from './Cryptography';
const db = new sqlite3.Database('./src/database/database.sqlite');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birth DATA,
    sex VARCHAR(20),
    profission VARCHAR(255),
    created_at DATATIME DEFAULT (datetime('now','localtime')),
    updated_at DATATIME DEFAULT (datetime('now','localtime'))
)`;
const INSERT_USER = `
INSERT INTO users (
    name,
    email,
    password,
    birth,
    sex,
    profission
) SELECT 'admin','admin','${Cryptography.encrypt('admin')}','0000-00-00','admin','admin'
    WHERE NOT EXISTS (SELECT * FROM users WHERE name='admin')
`;

const ADDRESSES_SCHEMA = `
CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    street VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    complement VARCHAR(255),
    created_at DATATIME DEFAULT (datetime('now','localtime')),
    updated_at DATATIME DEFAULT (datetime('now','localtime')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)`

function start() {
    db.run(USER_SCHEMA)
    db.run(INSERT_USER)
    db.run(ADDRESSES_SCHEMA)
}
db.serialize(start)

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

export default db;