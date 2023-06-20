import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: false,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'notes'
  }

  //init data service for use in class
  constructor(private dataService: DataService) {
  }

  //copy is made using js spread syntax
  //makes a simple copy, deep copy would require utility such as lodash deepClone()
  tempUserSettings: UserSettings = { ...this.originalUserSettings };

  //test function 
  changeName(tempUserSettings: UserSettings): void {
    //tempUserSettings.name = "help";
  }

  postError = false;
  postErrorMessage = '';

  //if an error occurs from the http post
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error;
  }

  //handle submite event
  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid)
    //call data service method to post the User Settings object updated in the form
    //subscribe to the observable and handle it's callback functions
    //note this form of subscribing is depracated
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.tempUserSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    }
    else{
      this.postError = true;
      this.postErrorMessage = "please fix above errors";
    }
  }

  //handle blur event
  onBlur(field: NgModel) {
    console.log('in onBlur ', field.valid)
  }

  updateUserSettings(temp: UserSettings): void {
    this.originalUserSettings = { ...temp };
  }

  ngOnInit(): void {
    this.changeName(this.tempUserSettings);
  }

}
