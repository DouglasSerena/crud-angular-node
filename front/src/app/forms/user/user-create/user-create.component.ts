import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ageLimit } from '../../input/age-limit.validator';
import { isOverAge } from '../../input/is-over-age.validator';
import { UserService } from '../../../core/user/user.service';
import { Router } from '@angular/router';
import { DataTakenValidatorService } from '../../../shared/validators/data-taken.validator.service'
import { User } from 'src/app/core/user/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
    userForm: FormGroup;

    constructor(
        private formBuild: FormBuilder,
        private userService: UserService,
        private router: Router,
        private dataTaken: DataTakenValidatorService
    ) { }

    ngOnInit(): void {
        this.userForm = this.formBuild.group({
            email: ['', [
                Validators.required,
                Validators.email,

            ], this.dataTaken.checkDataToken("email")],
            name: ['', [
                Validators.required,
                Validators.maxLength(30),

            ], this.dataTaken.checkDataToken("name")],
            password: ['', [
                Validators.required,
                Validators.minLength(9),
                Validators.pattern(/^[A-Z]{1}/)
            ]],
            birth: ['', [
                isOverAge,
                ageLimit,
                Validators.required,
            ]],
            profission: ['', [
                Validators.maxLength(30),
                Validators.required
            ]],
            sex: ['male']
        })
    }

    save() {
        if(this.userForm.valid && !this.userForm.pending) {
            this.userService.store(this.userForm.getRawValue())
                .subscribe((user: User) => this.router.navigate(['/form',user.id,'address']))
        }
    }
}
