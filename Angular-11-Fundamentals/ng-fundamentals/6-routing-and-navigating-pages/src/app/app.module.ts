import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail/event-thumbnail.component';
import { NavComponent } from './nav/nav.component';
import { EventService } from './events/shared/event.service';
import { ToastrService } from './common/toastr.service';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { appRoutes } from 'src/routes';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { Error404Component } from './errors/error404.component';
import { EventRouteActivatorService } from './events/event-details/event-route-activator.service';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    //use forRoot to import the routes from the routes we defined
    RouterModule.forRoot(appRoutes),
  ],
  // Service are included in the providers
  providers: [
    EventService,
    ToastrService,
    EventRouteActivatorService,
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
