import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // this form uses reactive form validation

  profileForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    //create form control for each input on form
    //FormControl's first argument is what will be displayed in the html
    //FormControl's second argument is validators
    let firstName = new FormControl(
      this.authService.currentUser.firstName,
      Validators.required
    );
    let lastName = new FormControl(
      this.authService.currentUser.lastName,
      Validators.required
    );

    //controls must be added to a form group
    this.profileForm = new FormGroup({
      //set propertirs for the form group
      firstName: firstName,
      lastName: lastName,
    });
  }

  saveProfile(formValues: any) {
    console.log(formValues);

    //Testing: we could instantiate a profileCmmponent and stub the auth service to return valid or invalid then call saveProfile using a mach, can also access profileForm and run tests against it. 

    //user validators to control logic
    //if the profileForm isn't valid don't do anything
    if (this.profileForm.valid) {
      //call authSerivce to update user
      this.authService.updateCurrentUser(
        formValues.firstName,
        formValues.lastName
      );
      this.router.navigate(['events']);
    }
  }

  cancel() {
    this.router.navigate(['events']);
  }

  consoleLog(data:any){
    console.log(data);
  }

}
