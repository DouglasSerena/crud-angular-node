import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/core/user/user.service';
import { DataTakenValidatorService } from './../../../shared/validators/data-taken.validator.service';
import { User } from '../../../core/user/User';

@Component({
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
    userForm: FormGroup;
    id: number

    constructor(
        private formBuild: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private dataTaken: DataTakenValidatorService
    ) {
        this.id = this.route.snapshot.params.id;
        this.userService.getById(this.id)
            .subscribe(() => {},error => this.router.navigate(['/not-found']))
        this.userForm = this.formBuild.group({
            email: ['', [
                Validators.required,
                Validators.email
            ], this.dataTaken.checkDataTokenUpdate("email", this.id)],
            name: ['', [
                Validators.required,
                Validators.maxLength(30)
            ], this.dataTaken.checkDataTokenUpdate("name", this.id)],
            profission: ['', [
                Validators.maxLength(30),
                Validators.required
            ]],
        })
    }

    ngOnInit(): void {
        this.userService.getById(this.id)
            .subscribe((user: User) => {
                this.userForm.patchValue({
                    name: user.name,
                    email: user.email,
                    profission: user.profission
                })
            }, error => {
                this.router.navigate(['/list-user'])
            })
    }

    save() {
        if(this.userForm.valid && !this.userForm.pending) {
            console.log('ok')
            this.userService.update(this.id, this.userForm.getRawValue())
                .subscribe(data => this.router.navigate(['/list-user']))
        }
    }
}
