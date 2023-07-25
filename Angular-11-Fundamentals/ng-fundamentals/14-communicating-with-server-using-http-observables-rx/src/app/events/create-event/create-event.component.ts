import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../shared';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  // Example component for a template driven form

  newEvent!: any;
  tempEvent!: any;
  isDirty: boolean = true;
  name: string = '';

  constructor(private router: Router, private eventService: EventService) {}

  //note: create an event to bind to for two way data binding.
  //Form now acts as a create/edit form, create and edit should be in their own components
  ngOnInit(): void {
    this.tempEvent = {
      name: 'Ng Spectacular',
      date: '8/8/2028',
      time: '10am',
      price: 799.99,
      address: '456 Happy st',
      city: 'Felicity',
      country: 'Angularistan',
      onlineUrl: 'http://ngSpectacular.com',
      imageUrl: 'https://i.imgur.com/T7cw0fS.jpg',
    };
    this.newEvent = {
      name: 'Ng Spectacular',
      date: '8/8/2028',
      time: '10am',
      price: 799.99,
      address: '456 Happy st',
      city: 'Felicity',
      country: 'Angularistan',
      onlineUrl: 'http://ngSpectacular.com',
      imageUrl: 'https://i.imgur.com/T7cw0fS.jpg',
    };
  }

  cancelButton() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues: NgForm) {
    console.log('create-event:', formValues);
    //if the shape of the formValues matches the event model, we can pass it directly to the service to be handled
    this.eventService.saveEvent(this.tempEvent).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  logger(data: any) {
    console.log(data);
  }
}
