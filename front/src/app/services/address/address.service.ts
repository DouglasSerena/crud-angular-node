import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

import { City } from './City';
import { State } from './State';
import { ZipCode } from './ZipCode';
import { Address } from './Address';

const API_DATA = environment.API_DATA
const API_LOCATION = 'https://servicodados.ibge.gov.br/api/v1/localidades/';
const API_ZIP_CODE = 'https://viacep.com.br/ws/';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
    constructor(
        private http: HttpClient
    ) {}

    fetchState() {
        return this.http.get<State[]>(API_LOCATION + 'estados');
    }
    fetchCity(uf: string) {
        return this.http.get<City[]>(API_LOCATION + 'estados/' + uf + '/municipios');
    }
    fetchZipCode(zip: string) {
        return this.http.get<ZipCode>(API_ZIP_CODE + zip + '/json')
    }
    store(user_id: number, address: Address) {
        return this.http.post(API_DATA + '/user/' + user_id + '/address/store', address)
    }
    list(user_id: number) {
        return this.http.get<Address[]>(API_DATA + '/user/' + user_id + '/address/list')
    }
    getById(user_id: number, id: number) {
        return this.http.get<Address[]>(API_DATA + '/user/' + user_id + '/address/' + id)
    }
    delete(user_id: number, id: number) {
        return this.http.delete(API_DATA + '/user/' + user_id + '/address/delete/' + id)
    }
}
