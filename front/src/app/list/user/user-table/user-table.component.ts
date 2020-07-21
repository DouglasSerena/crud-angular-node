import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core/user/User';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
    @Output() callDelete = new EventEmitter();
    @Output() callUpdate = new EventEmitter();
    @Input() users: User[];

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
