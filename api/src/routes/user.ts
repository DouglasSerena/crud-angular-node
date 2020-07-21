import { Router } from 'express';
import { UserController } from './../controllers/user.controller';

const userRoute = Router();

userRoute.get('/user', UserController.index);
userRoute.get('/user/:id', UserController.getById);
userRoute.post('/user/search', UserController.search);
userRoute.post('/user/store', UserController.store);
userRoute.post('/user/signin', UserController.signin);
userRoute.put('/user/update/:id', UserController.update);
userRoute.delete('/user/delete/:id', UserController.delete);

export default userRoute