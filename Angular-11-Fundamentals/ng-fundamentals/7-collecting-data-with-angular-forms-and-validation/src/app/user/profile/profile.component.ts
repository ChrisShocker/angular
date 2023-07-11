import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    let firstName = new FormControl(this.authService.currentUser.firstName);
    let lastName = new FormControl(this.authService.currentUser.lastName);

    //controls must be added to a form group
    this.profileForm = new FormGroup({
      //set propertirs for the form group
      firstName: firstName,
      lastName: lastName,
    });
  }

  saveProfile(formValues:any){
    console.log(formValues);
    //call authSerivce to update user
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
  }

  cancel(){
    this.router.navigate(['events']);
  }
}
