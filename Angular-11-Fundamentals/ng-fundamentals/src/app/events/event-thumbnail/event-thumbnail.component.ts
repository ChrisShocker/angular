//Add input to allow component to expect a value to be passed in
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent {
  //create an event object for component to bind to
  //add @input decorator to define the value will be passed in for the event (not js event)
  @Input() event:any
}
