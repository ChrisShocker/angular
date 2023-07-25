import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // This component uses template form validation

  userName: string = 'user';
  password: string = 'password';
  mouseOverLogin!: boolean;
  loginInvalid: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    //authenticate user with from vallues passed in
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
    //once authenticated route the user to the events page
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
