import app from './config/App';
import http from 'http';

http.createServer(app)
    .listen(process.env.PORT, () =>
        console.log("> server start at port: " + process.env.PORT)
    )
