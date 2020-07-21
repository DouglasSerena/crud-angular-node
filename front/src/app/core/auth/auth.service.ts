import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { UserService } from '../user/user.service';

const API = environment.API_DATA;

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    authenticate(email: string, password: string) {
        return this.http.post(
            API + '/user/signin',
            { email, password },
            { observe: 'response' }
        ).pipe(tap(res => {
            if(res.body['auth']) {
                this.userService.setToken(res.body['token']);
            }
        }));
    }
}
