import { Routes } from "@angular/router";
import { EventDetailsComponent } from "./app/events/event-details/event-details.component";
import { EventsListComponent } from "./app/events/events-list.component";
import { CreateEventComponent } from "./app/events/create-event/create-event.component";

//adding the Routes type addes intellisense to our ts and compile time safety
export const appRoutes: Routes = [
    //path for creating an event
    //Note order matters, angular won't differentiate between /new and :id, whichever is defined first wins
    {path: 'events/new', component: CreateEventComponent},

    //if the url path is 'events' pass/render the EventsListComponent
    {path: 'events', component: EventsListComponent},

    //accept a url parameter on events path 
    {path: 'events/:id', component: EventDetailsComponent},


    //default route
    //pathMatch:prefix: redirect if url starts with specifed path string  
    //pathMatch:full: redirect if url matches specified path string
    {path: '', redirectTo: '/events', pathMatch: 'full'}
]