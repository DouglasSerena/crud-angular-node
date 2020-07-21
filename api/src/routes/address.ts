import { Router } from 'express';
import { AddressController } from './../controllers/address.controller';

const adressRoute = Router();

adressRoute.get('/user/:user_id/address/list', AddressController.index);
adressRoute.get('/user/:user_id/address/:id', AddressController.getById);
adressRoute.post('/user/:user_id/address/store', AddressController.store);
adressRoute.put('/user/:user_id/address/update/:id', AddressController.update);
adressRoute.delete('/user/:user_id/address/delete/:id', AddressController.delete);

export default adressRoute