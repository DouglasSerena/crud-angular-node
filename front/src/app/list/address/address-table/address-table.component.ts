import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Address } from 'src/app/services/address/Address';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.scss']
})
export class AddressTableComponent implements OnInit {
    @Output() callDelete = new EventEmitter();
    @Output() callUpdate = new EventEmitter();
    @Input() addresses: Address[];

    constructor() { }

    ngOnInit(): void {
    }

    emitDelete(id) {
        this.callDelete.emit(id);
    }
    emitUpdate(id) {
        this.callUpdate.emit(id);
    }
}
