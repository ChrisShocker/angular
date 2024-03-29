import { Injectable } from "@angular/core";
import { Resolve} from "@angular/router";
import { EventService } from "./shared/event.service";
import { map } from "rxjs";

@Injectable()

export class EventListResolver implements Resolve<any> {

    constructor(private eventService: EventService){
    }

    //Steps to setup a resolver:
    //1. resolver gets events from eventService 
    //2. route applies the resolver on the route (routes.ts) 
    //3. events are now accessible in component (evets-list.component.ts (ngOnInit)) 
    //Note: resolver won't allow the route to be loaded until all data has been reutrned
    resolve() {
        //call getEvents that ruturns an observable, then map the observable to access returned events
        //typically instead of pipe, we'd sub to the observable, but since this function is in a resolver
        //we must return the observable back to angular so angular can watch the observable
        //sub returns a subscriptions not an observable, so we use map to return the observable
        //return this.eventService.getEvents().pipe(map(events => events));

        //update to an https call
        //a resolver automatically subscribes to obvervable it gets, so we don't have to subscribe to it
        //note: outside resolver, observable calls must be subscribed to otherwise the call is never made
        return this.eventService.getEvents();
    }
}