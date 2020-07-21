import { Component, OnInit,  } from '@angular/core';
import { Address } from 'src/app/services/address/Address';
import { AddressService } from 'src/app/services/address/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/core/user/User';

@Component({
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
    user_id: number;
    nameUser: string;
    hasAddresses = false;
    addresses: Address[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private addressService: AddressService,
        private userService: UserService
    ) {

    }

    ngOnInit(): void {
        this.user_id = this.route.snapshot.params.user_id;
        this.userService.getById(this.user_id)
            .subscribe(() => {},error => this.router.navigate(['/not-found']))
        this.addressService.list(this.user_id)
            .subscribe((addresses: Address[]) => {
                this.addresses = addresses;
                this.hasAddresses = true;
            })
        this.userService.getById(this.user_id)
            .subscribe((user: User) => this.nameUser = user.name);
    }

    delete(id) {
        this.addressService.delete(this.user_id, id)
            .subscribe(res => {
                this.addresses = this.addresses
                    .filter((address: Address) => address.id != id);
            })
    }

    update(id) {
        this.router.navigate(['/form',this.user_id,'address',id])
    }
}
