import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddressListComponent } from './address/address-list.component';
import { UserListComponent } from './user/user-list.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { AddressTableComponent } from './address/address-table/address-table.component';

@NgModule({
  declarations: [
    UserListComponent,
    AddressListComponent,
    UserTableComponent,
    AddressTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ListModule { }
