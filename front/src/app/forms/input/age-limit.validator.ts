import { AbstractControl } from '@angular/forms';

export function ageLimit(control: AbstractControl) {
    const birth = new Date(control.value);

    if(birth.getFullYear() < 1900)
        return {ageLimit: true}
    return null
}
