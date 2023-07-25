import { Directive } from '@angular/core';
//Note to add a custom validator to angular we must add it to the NG_Validators service
import { FormGroup, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  // add custom validator to the NG_Validators service
  // note the multi parameter, this adds our validator to existing services in NG_VALIDATORS,
  // without removeing all the existing ones
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})

//build a validator for checking the location values on the create-event form
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): any {
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
      console.log('true');
      return null;
    } 
    else {
      console.log('false');
      return { validateLocation: true };
    }
  }
}
