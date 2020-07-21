import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/User';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    nameUser: string;
    users: User[];

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.nameUser = this.userService.getName()
        this.userService.list()
        .subscribe((users: User[]) => {
            this.users = users.map(user => {
                user.birth = new Date(user.birth).toLocaleDateString();
                return user;
            });
        })
    }

    update(id) {
        this.router.navigate(['/form', id]);
    }

    delete(id) {
        this.userService.delete(id)
            .subscribe(data => {
                this.users = this.users.filter(user => user.id != id)
            })
    }
}
