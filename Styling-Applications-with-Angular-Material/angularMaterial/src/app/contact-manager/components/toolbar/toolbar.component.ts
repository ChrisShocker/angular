import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  // create new event to listen for
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  openAddContactDialog(): void {
    //open dialog when clicked and pass in component to render
    let dialogRef = this.dialog.open(NewContactDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed: ", result);

      if (result) {
        this.openSnackBar("Contact added", "Navigate")
          // subscribe to when onAction was pressed in snackbar
          .onAction().subscribe(() => {
            //navigate to newly created user
            this._router.navigate(["/contactManager", result.id])
          });
      }
    })

  }

  //open a snackbar with a message and an action
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action);
  }

}
