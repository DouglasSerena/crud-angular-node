import { Router } from 'express';
import { AddressController } from './../controllers/address.controller';

import { Token } from './../config/Token';

const adressRoute = Router();

adressRoute.get('/zip/:zip', Token.verifyJWT , AddressController.zip);
adressRoute.get('/user/:user_id/address/list', Token.verifyJWT,  AddressController.index);
adressRoute.get('/user/:user_id/address/:id', Token.verifyJWT,  AddressController.getById);
adressRoute.post('/user/:user_id/address/store', Token.verifyJWT,  AddressController.store);
adressRoute.put('/user/:user_id/address/update/:id', Token.verifyJWT, AddressController.update);
adressRoute.delete('/user/:user_id/address/delete/:id', Token.verifyJWT ,AddressController.delete);

export default adressRoute