//Inject lets use seperate token decides type of construction param
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from 'src/app/common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // this form uses reactive form validation

  profileForm!: FormGroup;
  private firstName!: FormControl;
  private lastName!: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router,
    //let angular know to use TOASTR_TOKEN to look up service in injection registry
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit() {
    //create form control for each input on form
    //FormControl's first argument is what will be displayed in the html
    //FormControl's second argument is validators
    //Multiple validators can be used if passed as an array
    this.firstName = new FormControl(this.authService.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]);

    //controls must be added to a form group
    this.profileForm = new FormGroup({
      //set propertirs for the form group
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  saveProfile(formValues: any) {
    //Testing: we could instantiate a profileCmmponent and stub the auth service to return valid or invalid then call saveProfile using a mach, can also access profileForm and run tests against it.

    //user validators to control logic
    //if the profileForm isn't valid don't do anything
    if (this.profileForm.valid) {
      //call authSerivce to update user
      this.authService
        .updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved!');
        });
      //call toastr service to display a notification to the user
      this.router.navigate(['events']);
    }
  }

  cancel() {
    this.router.navigate(['events']);
  }

  logout(){
    this.authService.logout().subscribe( () => {
      this.router.navigate(['/user/login']);
      window.location.reload();
    });
  }

  //Check Form firstName for valid or untouched
  validateFirstName(): boolean {
    // return true if the valid or untouched
    return this.firstName.valid || this.firstName.untouched;
  }

  //Check Form lastName for valid or untouched
  validateLastName(): boolean {
    // return true if the valid or untouched
    return this.lastName.valid || this.lastName.untouched;
  }

  consoleLog(data: any) {
    console.log(data);
  }
}
