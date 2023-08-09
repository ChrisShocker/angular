import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animation';

import { AuthService } from './user/auth.service';

import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent
{
  pageTitle = 'Acme Product Management';
  // variable to turn on loading spinner
  isLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService)
  {
    router.events.subscribe((routerEvent: Event) =>
    {
      this.checkRouterEvent(routerEvent);
    })
  }

  // checking routing events and enable/disable loading spinner
  checkRouterEvent(routerEvent: Event): void
  {
    if (routerEvent instanceof NavigationStart)
    {
      this.isLoading = true;
    }
    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError)
    {
      this.isLoading = false;
    }
  }

  get isLoggedIn(): boolean
  {
    return this.authService.isLoggedIn;
  }

  get userName(): string
  {
    if (this.authService.currentUser)
    {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean
  {
    return this.messageService.isDisplayed;
  }

  displayMessages(): void
  {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = !this.messageService.isDisplayed;
    // reset secondary route
    if (this.messageService.isDisplayed === false)
    {
      this.router.navigate([{ outlets: { popup: null } }]);
    }
  }

  logOut(): void
  {
    this.authService.logout();
    this.router.navigate(['/welcome']);
    console.log('Log out');
  }
}
