import { AbstractControl } from '@angular/forms'
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { map, first } from 'rxjs/operators';
import { User } from 'src/app/core/user/User';

@Injectable({
  providedIn: 'root',
})
export class DataTakenValidatorService {
    user: User;

    constructor(
        private userService: UserService
    ) {

    }

    checkDataToken(dataName: string) {
        return (control: AbstractControl) => {
            const data = {};

            data[dataName] = control.value.trim()

            return this.userService.checkDataTaken(data)
                .pipe(map(isTaken => isTaken ? { isTaken: true } : null ));
        }
    }
    checkDataTokenUpdate(dataName: string, id: number) {
        this.userService.getById(id)
            .subscribe((user: User) => this.user = user);
        return (control: AbstractControl) => {
            const data = {};
            data[dataName] = control.value.trim()
            return this.userService.checkDataTaken(data)
                .pipe(map(isTaken => {
                    if(this.user[dataName] == data[dataName]) {
                        return null
                    }
                    return isTaken ? { isTaken: true } : null;
                }))
        }
    }
}

