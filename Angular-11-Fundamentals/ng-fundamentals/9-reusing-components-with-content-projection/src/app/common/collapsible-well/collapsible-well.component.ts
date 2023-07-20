import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrls: ['./collapsible-well.component.css'],
})
export class CollapsibleWellComponent {
  @Input() title!: string;

  //toggle to display well content
  isVisible: boolean = true;
  toggleContent() {
    this.isVisible = !this.isVisible;
  }
}
