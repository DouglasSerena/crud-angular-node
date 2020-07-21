import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AddressService } from './../../../services/address/address.service';
import { State } from '../../../services/address/State';
import { City } from 'src/app/services/address/City';
import { ZipCode } from 'src/app/services/address/ZipCode';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Address } from 'src/app/services/address/Address';

@Component({
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {
    public debounce: Subject<string> = new Subject<string>();
    address$: Observable<Address[]>
    user_id: number;
    id: number;
    states: State[];
    citys: City[];
    addressForm: FormGroup;

    constructor(
        private formBuild: FormBuilder,
        private addressService: AddressService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user_id = this.route.snapshot.params.user_id;
        this.id = this.route.snapshot.params.id;

        this.address$ = this.addressService.getById(this.user_id, this.id)
        this.address$
            .subscribe(() => {},error => this.router.navigate(['/not-found']))

        this.addressService.fetchState()
            .subscribe((states: State[]) => {
                this.states = states;
            })
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
        this.address$
            .subscribe((address: Address[]) => {
                this.addressForm.patchValue({
                    street: address[0].street,
                    neighborhood: address[0].neighborhood,
                    number: address[0].number,
                    zip_code: address[0].zip_code,
                    complement: address[0].complement
                })
                this.addressService.fetchZipCode(address[0].zip_code)
                    .subscribe((zipCode: ZipCode) => {
                        this.fetchCity(zipCode.uf);
                        this.addressForm.patchValue({
                            state: zipCode.uf,
                            city: zipCode.localidade
                        })
                    })
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
