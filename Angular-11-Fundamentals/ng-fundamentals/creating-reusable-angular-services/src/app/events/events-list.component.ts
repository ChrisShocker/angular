import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit{
  events!: any[];

  // register/inject event service with events-list component
  constructor(private eventService: EventService){
  }

  //catcher for click events from child component
  handleEventClicked(eventData: string): void {
    console.log("Button event triggerend in parent component events-list " + eventData);
  }

  ngOnInit(){
    this.events = this.eventService.getEvents();
  }
}
