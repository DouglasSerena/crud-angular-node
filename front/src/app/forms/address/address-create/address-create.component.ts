import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AddressService } from './../../../services/address/address.service';
import { State } from '../../../services/address/State';
import { City } from 'src/app/services/address/City';
import { ZipCode } from 'src/app/services/address/ZipCode';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss']
})
export class AddressCreateComponent implements OnInit {
    public debounce: Subject<string> = new Subject<string>();
    user_id: number;
    states: State[];
    citys: City[];
    addressForm: FormGroup;

    constructor(
        private formBuild: FormBuilder,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user_id = this.route.snapshot.params.user_id;
        this.userService.getById(this.user_id)
            .subscribe(() => {},error => this.router.navigate(['/not-found']))
        this.fetchZipCode()
        this.addressForm = this.formBuild.group({
            street: ['', [
                Validators.required,
                Validators.maxLength(30)
            ]],
            neighborhood: ['',[
                Validators.required,
                Validators.maxLength(30)
            ]],
            number: ['', [
                Validators.required,
                Validators.maxLength(20)
            ]],
            zip_code: ['',[
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(9)
            ]],
            state: ['State',[
                Validators.required
            ]],
            city: ['City',[
                Validators.required
            ]],
            complement: ['',[
                Validators.maxLength(50)
            ]],
        })
        this.addressService.fetchState()
            .subscribe((states: State[]) => {
                this.states = states;
            })
    }

    fetchZipCode() {
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(zip => {
                if(zip.length > 7 && this.addressForm.controls['zip_code'].valid) {
                    this.addressService.fetchZipCode(zip)
                        .subscribe((zipCode: ZipCode) => {
                            this.fetchCity(zipCode.uf);
                            this.addressForm.patchValue(this.createObject(zipCode))
                    })
                }
            })
    }

    fetchCity(uf: string) {
        this.addressForm.patchValue({city: 'City'})
        this.addressService.fetchCity(uf)
            .subscribe((citys: City[]) => {
                this.citys = citys;
            })
    }

    createObject(zip: ZipCode) {
        const valid = (data: string ,field: string) => data != '' ? data : this.addressForm.value[field];
        return {
            street: valid(zip.logradouro, 'street'),
            neighborhood: valid(zip.bairro, 'neighborhood'),
            state: zip.uf,
            city: zip.localidade,
            complement: valid(zip.complemento, 'complement'),
        }
    }

    save() {
        if(this.addressForm.valid && !this.addressForm.pending) {
            const address = this.addressForm.getRawValue();
            this.addressService.store(this.user_id, address)
                .subscribe(res => {
                    this.router.navigate(['/list',this.user_id,'address']);
                }, error => console.log(error));
        }
    }
}
