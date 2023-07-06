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
    Error404Component
  ],
  imports: [
    BrowserModule,
    //use forRoot to import the routes from the routes we defined
    RouterModule.forRoot(appRoutes)
  ],
  // Service are included in the providers
  providers: [EventService, ToastrService, EventRouteActivatorService],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }