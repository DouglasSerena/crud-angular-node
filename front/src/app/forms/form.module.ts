import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MessageModule } from '../shared/components/message/message.module';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form.component';
import { UserCreateComponent } from './user/user-create/user-create.component'
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { AddressCreateComponent } from './address/address-create/address-create.component';
import { AddressUpdateComponent } from './address/address-update/address-update.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserUpdateComponent,
    AddressCreateComponent,
    AddressUpdateComponent,
    InputComponent,
    FormComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MessageModule,
    FormsModule,
  ]
})
export class FormModule { }
