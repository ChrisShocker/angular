import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = 'user';
  password: string = 'password';

  constructor(private authService: AuthService, private router: Router){
  }


  login(formValues: any){
    //authenticate user with from vallues passed in 
    this.authService.loginUser(formValues.userName, formValues.password);
    //once authenticated route the user to the events page
    this.router.navigate(['events']);
  }

  cancel(){
    this.router.navigate(['events']);
  }
}
