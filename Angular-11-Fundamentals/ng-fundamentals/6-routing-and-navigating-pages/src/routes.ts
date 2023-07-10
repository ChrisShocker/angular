import { Routes } from '@angular/router';
import { EventDetailsComponent } from './app/events/event-details/event-details.component';
import { EventsListComponent } from './app/events/events-list.component';
import { CreateEventComponent } from './app/events/create-event/create-event.component';
import { Error404Component } from './app/errors/error404.component';
import { EventRouteActivatorService } from './app/events/event-details/event-route-activator.service';
import { EventListResolver } from './app/events/shared/events-list-resolver.service';
import { UserModule } from './app/user/user.module';

//adding the Routes type addes intellisense to our ts and compile time safety
export const appRoutes: Routes = [
  //path for creating an event
  //Note order matters, angular won't differentiate between /new and :id, whichever is defined first wins
  //canDeactivate can be used to force a user to stay on a path unless we define a way for them to leave
  //can be used to guard against changes being lost by user
  //note: this guard is caught and implemented in app.module
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateGuardEvent'],
  },

  //if the url path is 'events' pass/render the EventsListComponent.
  //add resolver handler: before resolving route, call EventListResolver and resolve any data
  //and once resolve is finished return the data in a parameter called events
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventListResolver },
  },

  //accept a url parameter on events path
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [EventRouteActivatorService],
  },

  //route for error 404
  { path: '404', component: Error404Component },

  //default route
  //pathMatch:prefix: redirect if url starts with specifed path string
  //pathMatch:full: redirect if url matches specified path string
  { path: '', redirectTo: '/events', pathMatch: 'full' },

  //add a lazy load path for the user component
  //this won't be loaded until the user navigates to this page/anchor 
  {
    //1. when a route starts with user
    path: 'user',
    //3. from this path
    loadChildren: () => import ('./app/user/user.module')
    //2. load the UserModule
    .then(m => m.UserModule)
  }
];
