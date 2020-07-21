import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from './../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    userForm: FormGroup
    invalid = false;

    constructor(
        private formBuild: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if(this.userService.isLogged())
            this.router.navigate(['list'])
        this.userForm = this.formBuild.group({
            email: [''],
            password: ['']
        })
    }

    signin() {
        this.authService.authenticate(
            this.userForm.value.email,
            this.userForm.value.password
        ).subscribe(res => {
            this.router.navigate(['list'])
        }, error => {
            this.invalid = true;
        })

    }
}
