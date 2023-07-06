import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  constructor(private router: Router){

  }

  cancelButton(){
    this.router.navigate(['/events']);
  }
}
