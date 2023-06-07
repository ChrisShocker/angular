import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  //templateUrl: './app.component.html',
  template: `
  <div>
  <h1>
  <pm-products></pm-products>
  </h1>
  </div> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Acme Product Management';
}
