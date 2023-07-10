import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = 'user';
  password: string = 'password';

  login(formValues: any){
    console.log(formValues);
  }
}
