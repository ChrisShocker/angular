import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // this form uses reactive form validation

  profileForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    //create form control for each input on form
    let firstName = new FormControl();
    let lastName = new FormControl();

    //controls must be added to a form group
    this.profileForm = new FormGroup({
      //set propertirs for the form group
      firstName: firstName,
      lastName: lastName,
    });
  }
}
