import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private tokenService: TokenService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    isLogout() {
        return this.userService.isLogged();
    }

    logout() {
        this.tokenService.removeToken()
        this.router.navigate(['']);
    }
}
