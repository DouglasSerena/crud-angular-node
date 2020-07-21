import { Router } from 'express';
import userRoute from './routes/user';
import adressRoute from './routes/address';

const route = Router();

route.use(userRoute);
route.use(adressRoute);

export default route