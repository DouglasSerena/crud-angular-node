import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './forms/form.component';
import { UserListComponent } from './list/user/user-list.component';
import { AddressListComponent } from './list/address/address-list.component';
import { UserCreateComponent } from './forms/user/user-create/user-create.component';
import { UserUpdateComponent } from './forms/user/user-update/user-update.component';
import { AddressCreateComponent } from './forms/address/address-create/address-create.component';
import { AddressUpdateComponent } from './forms/address/address-update/address-update.component';
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './forms/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'list',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: UserListComponent
            },
            {
                path: ':user_id/address',
                component: AddressListComponent,
            }
        ]
    },
    {
        path: 'form',
        component: FormComponent,
        children: [
            {
                path: '',
                component: UserCreateComponent
            },
            {
                path: ':id',
                component: UserUpdateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':user_id/address',
                component: AddressCreateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':user_id/address/:id',
                component: AddressUpdateComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'not-found',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
