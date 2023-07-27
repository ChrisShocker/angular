import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve} from "@angular/router";
import { EventService } from "./shared/event.service";

@Injectable()

export class EventResolver implements Resolve<any> {

    constructor(private eventService: EventService){
    }

    //Steps to setup a resolver:
    //1. resolver gets events from eventService 
    //2. route applies the resolver on the route (routes.ts) 
    //3. events are now accessible in component (evets-list.component.ts (ngOnInit)) 
    //Note: resolver won't allow the route to be loaded until all data has been reutrned

    //to specify the event to resolve we need its Id
    //we can use the url/route since the id is in the route using ActivatedRouteSnapshot
    resolve(route: ActivatedRouteSnapshot ) {
        //a resolver automatically subscribes to obvervable it gets, so we don't have to subscribe to it
        //note: outside resolver, observable calls must be subscribed to otherwise the call is never made
        return this.eventService.getEventById(route.params['id']);
    }
}