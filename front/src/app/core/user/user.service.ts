import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { User } from './User';
import * as jwt_decode from 'jwt-decode';
import { TokenService } from '../token/token.service';

const API_DATA = environment.API_DATA

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private name: string

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify()
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const datas = jwt_decode(token);
        console.log(datas)
        this.name = datas['name'];
    }

    getName() {
        return this.name;
    }

    logout() {
        this.tokenService.removeToken();
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    list(): Observable<User[]> {
        return this.http.get<User[]>(API_DATA + '/user');
    }
    getById(id: number) {
        return this.http.get(API_DATA + '/user/' + id);
    }
    store(datas: User) {
        return this.http.post(API_DATA + '/user/store', datas);
    }
    update(id: number, datas: {name: string, email: string, profission: string}) {
        return this.http.put(API_DATA + '/user/update/' + id, datas);
    }
    delete(id: number): Observable<User> {
        return this.http.delete<User>(API_DATA + '/user/delete/' + id);
    }
    checkDataTaken(datas) {
        return this.http.post(API_DATA + '/user/search', datas);
    }
}
