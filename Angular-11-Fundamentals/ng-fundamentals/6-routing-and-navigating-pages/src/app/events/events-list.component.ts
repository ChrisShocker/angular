import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute, Route } from '@angular/router';

declare let toastr: { success: (arg0: any) => void; };

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit{
  events!: any;

  // register/inject event and toastr services with events-list component
  constructor(private eventService: EventService, private toasterService: ToastrService, private activatedRoute: ActivatedRoute){
  }

  //catcher for click events from child component
  handleEventClicked(eventData: string): void {
    console.log("Button event triggerend in parent component events-list " + eventData);
  }

  //when a thumbnail is clicked call toasterService success 
  handleThumbnailClick(eventName:any){
    this.toasterService.success(eventName);
  }

  ngOnInit(){
    //since get events is now an observable we must subscribe to it
    //note: since the type is now an observable, we must set the local variable in the subscribe method
    //insread call the route that has the resolver implemented 
    //this.eventService.getEvents().subscribe(events => {this.events = events});

    //route now implements a resolver so we can just call the route
    this.events = this.activatedRoute.snapshot.data['events'];
  }
}
