import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../shared';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  newEvent: any;

  isDirty: boolean = true;

  constructor(private router: Router, private eventService: EventService) {}

  cancelButton() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues: any) {
    console.log(formValues);
    //if the shape of the formValues matches the event model, we can pass it directly to the service to be handled
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
