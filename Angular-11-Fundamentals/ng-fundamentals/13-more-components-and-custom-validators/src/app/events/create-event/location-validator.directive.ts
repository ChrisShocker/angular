import { Directive } from '@angular/core'; import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
})

//build a validator for checking the location values on the create-event form
export class LocationValidator implements Validator {

  validate(formGroup: FormGroup): { [key: string]: any} {
    //access address using indexor and target the DOM formGroup
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    // Note since the URL is in a different formgroup then location
    //   we have to target it differently by going up one level
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    //require a location or a url
    if (
      (addressControl &&
        addressControl.value &&
        cityControl &&
        cityControl.value &&
        countryControl &&
        countryControl.value) ||
      (onlineUrlControl && onlineUrlControl.value)
    ) {
      return { vlaidateLocation: true };
    } else {
      return { validateLocation: false };
    }
  }
}
