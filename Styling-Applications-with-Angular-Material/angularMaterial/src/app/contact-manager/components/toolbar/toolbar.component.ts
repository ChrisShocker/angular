import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

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
    //open dialog when clicked and pass in component to render
    let dialogRef = this.dialog.open(NewContactDialogComponent);

    dialogRef.afterClosed().subscribe( result =>{
      console.log("Dialog closed: ", result);
    })

  }
}
