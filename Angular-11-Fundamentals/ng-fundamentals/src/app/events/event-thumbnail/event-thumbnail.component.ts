//Add input to allow component to expect a value to be passed in
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent {
  //create an event object for component to bind to
  //add @input decorator to define the value will be passed in for the event (not js event)
  @Input() event:any

  // To pass an event/change to a parent component:
  //  - @Output decorator must be used with an EventEmitter()
  @Output() eventClick = new EventEmitter();

  handleClickMe(): void{
    //display click event
    console.log("Button event triggered in child component: event-thumbnail");

    //to pass the event to a parent component, the event must be emitted
    //only one value can be emitted from an event, object can also be emitted
    this.eventClick.emit(this.event.name);
  }

  logFoo() {
    console.log("Called Child Component function logFoo()");
  }

}
