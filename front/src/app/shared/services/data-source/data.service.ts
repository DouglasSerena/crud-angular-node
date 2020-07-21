import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private dataSource = new BehaviorSubject('data');
    public data = this.dataSource.asObservable();

    constructor() { }

    updateData(data: any) {
        this.dataSource.next(data);
    }
}
