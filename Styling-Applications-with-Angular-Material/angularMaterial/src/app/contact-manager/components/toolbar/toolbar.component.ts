import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  // create new event to listen for
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(private dialog: MatDialog){

  }

  openAddContactDialog(): void {
    // this.dialog.open()
  }
}
