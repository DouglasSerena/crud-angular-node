import { Router } from 'express';
import { UserController } from './../controllers/user.controller';
import { Token } from '../config/Token';

const userRoute = Router();

userRoute.get('/user',Token.verifyJWT, UserController.index);
userRoute.get('/user/:id',Token.verifyJWT, UserController.getById);
userRoute.post('/user/search',Token.verifyJWT, UserController.search);
userRoute.post('/user/store', UserController.store);
userRoute.post('/user/signin', UserController.signin);
userRoute.put('/user/update/:id',Token.verifyJWT, UserController.update);
userRoute.delete('/user/delete/:id',Token.verifyJWT, UserController.delete);

export default userRoute