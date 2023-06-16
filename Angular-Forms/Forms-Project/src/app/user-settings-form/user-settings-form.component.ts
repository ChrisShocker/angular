import { Component, OnInit } from '@angular/core';
import {UserSettings} from '../data/user-settings';

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


  tempUserSettings : UserSettings = {...this.originalUserSettings};

  //test function 
  changeName(tempUserSettings: UserSettings): void{
    tempUserSettings.name = "help";
  }

  updateUserSettings(temp: UserSettings): void{
    this.originalUserSettings = {...temp};
  }

  ngOnInit(): void {
     this.changeName(this.tempUserSettings);
  }

}
