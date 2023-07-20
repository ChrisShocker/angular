import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//implement barreling to reduce clutter
import {
  EventDetailsComponent,
  EventService,
  EventThumbnailComponent,
  EventRouteActivatorService,
  EventsListComponent,
  CreateEventComponent,
  CreateSessionComponent,
}from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavComponent } from './nav/nav.component';
import { ToastrService } from './common/toastr.service';
import { appRoutes } from 'src/routes';
import { Error404Component } from './errors/error404.component';
import { EventListResolver } from './events/events-list-resolver.service';
import { AuthService } from './user/auth.service';
import { SessionListComponent } from './events/session-list/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //use forRoot to import the routes from the routes we defined
    RouterModule.forRoot(appRoutes)
  ],
  // Service are included in the providers
  providers: [
    EventService,
    ToastrService,
    EventRouteActivatorService,
    EventListResolver,
    // Note: providers are shared with other modules by default. Imports and desclarations arent, so we only have to declare providers in the app.module
    AuthService,
    //providers can be expressed longhand
    {
      //what we're providing for
      provide: 'canDeactivateGuardEvent',
      //what we're using to provide the service
      useValue: checkDirtyState,
    },
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

//should be defined in another file
//prevent a user from leaving a modified page unless they connsent
export function checkDirtyState(component:CreateEventComponent): boolean {
  if(component.isDirty){
    //html confirm dialog
    return window.confirm('You have not saved this event, do you want to cancel?');
  }
  return true;
}
