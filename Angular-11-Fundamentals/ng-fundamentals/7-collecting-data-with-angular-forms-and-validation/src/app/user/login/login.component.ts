import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = 'user';
  password: string = 'password';

  constructor(private authService: AuthService){
  }


  login(formValues: any){
    this.authService.loginUser(formValues.userName, formValues.password);
  }
}
