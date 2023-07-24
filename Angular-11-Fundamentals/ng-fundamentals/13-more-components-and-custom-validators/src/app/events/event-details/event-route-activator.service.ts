import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { EventService } from '../shared/event.service';

@Injectable({
  providedIn: 'root',
})
export class EventRouteActivatorService implements CanActivate {
  constructor(private eventService: EventService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    //create a boolean and cast Id result to boolean '!!'
    //check to see if an event id exists with id passed in
    const eventExists: boolean = !!this.eventService.getEventById(
      +route.params['id']
    );

    //if event doesn't exist route to 404
    if (!eventExists) this.router.navigate(['/404']);

    //canActivate expects a boolean
    return eventExists;
  }
}
