import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  templateUrl: './events-app.component.html',
  styleUrls: ['./events-app.component.css'],
})
export class EventsAppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // get authentication status for the current user using authService
    this.authService.checkAuthenticationStatus().subscribe();
  }
}
