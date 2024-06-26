import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [(ngModel)]="searchInput" placeholder="Search for" />
    <hr />
    <ng-container *ngIf="searchInput">
      <p>You searched for</p>

      <!-- user entered data is directly displayed -->
      <!-- would be a problem if Angular didn't sanitize values for us and remove unsafe markup-->
      <h2>Using property binding</h2>
      <p [innerHtml]="searchInput"></p>
    </ng-container>
  `,
  styles: [
    `
      input {
        width: 25%;
      }
    `,
  ],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class SearchComponent {
  searchInput: string | undefined;
}
