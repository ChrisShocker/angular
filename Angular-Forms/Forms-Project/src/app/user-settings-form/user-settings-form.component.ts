import { Component, OnInit } from '@angular/core';
import {UserSettings} from '../data/user-settings';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit{
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: false,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'notes'
  }

  //copy is made using js spread syntax
  //makes a simple copy, deep copy would require utility such as lodash deepClone()
  tempUserSettings : UserSettings = {...this.originalUserSettings};

  //test function 
  changeName(tempUserSettings: UserSettings): void{
    tempUserSettings.name = "help";
  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid)
  }

  updateUserSettings(temp: UserSettings): void{
    this.originalUserSettings = {...temp};
  }

  ngOnInit(): void {
     this.changeName(this.tempUserSettings);
  }

}
