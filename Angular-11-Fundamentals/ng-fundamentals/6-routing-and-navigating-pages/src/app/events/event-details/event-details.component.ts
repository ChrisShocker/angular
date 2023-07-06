import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit{

  event: any;

  //inject eventService
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    //instead of hard coding the url we can pass in the url parameter using activatedRoute
    //this.event = this.eventService.getEventById(1);

    //use the actual url parameter from activated route 
    //note since the id isn't a string we must cast it to a number using '+'
    this.event = this.eventService.getEventById(+this.activatedRoute.snapshot.params['id']);
  }


}
