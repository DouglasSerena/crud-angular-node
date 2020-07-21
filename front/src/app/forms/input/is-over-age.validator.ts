import { AbstractControl } from '@angular/forms';

export function isOverAge(control: AbstractControl) {
    const currentDate = new Date();
    const birth = new Date(control.value);


    const year = currentDate.getFullYear() - birth.getFullYear()
    if(year < 18)
        return {isOverAge: true}
    return null
}
