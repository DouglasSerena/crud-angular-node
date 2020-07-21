import express from 'express';
import routes from '../routes';
import dotenv from 'dotenv';
import cors from 'cors';
// start db
import './database';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();

        this.middleware();
        this.routes();
    }

    middleware() {
        // variable
        dotenv.config();
        // cors
        this.express.use(cors())
        // parser body
        this.express.use(express.json())
    }
    routes() {
        this.express.use(routes)
    }
}

export default new App().express