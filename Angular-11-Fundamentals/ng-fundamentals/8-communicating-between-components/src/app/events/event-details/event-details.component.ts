import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import {ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit{

  event!: IEvent;
  addMode: boolean = false;

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

  addSession(){
    this.addMode = true;
  }

  //save session object passed in, give largest id + 1
  saveNewSession(session: ISession){
    //get the current largest session id
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));

    //set new session to largest session id + 1
    session.id = nextId + 1;

    //push new session onto existing event session array
    this.event.sessions.push(session);

    //save event in eventService
    this.eventService.updateEvent(this.event);

    //reset Add Session ui
    this.addMode = false;
  }

}
