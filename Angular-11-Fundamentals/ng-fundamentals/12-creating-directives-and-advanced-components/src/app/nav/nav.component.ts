import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  //inject authService to access user object
  constructor(public authService: AuthService) {}
}
