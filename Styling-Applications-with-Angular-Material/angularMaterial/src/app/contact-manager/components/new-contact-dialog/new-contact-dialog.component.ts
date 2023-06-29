import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user!: User;

  //avatars options
  avatars = [
    "svg-1",
    "svg-2",
    "svg-3",
    "svg-4",
    "svg-5",
  ]

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>){}

  ngOnInit(): void {
    this.user = new User();
  }

  //bind the data passed from the html form to a new user object
  save(): void{
    this.user.name = this.name.value!;
    this.dialogRef.close(this.user);
  }

  dismiss(): void{
    this.dialogRef.close(null);
  }

  // set name to Form control and validate only for required
  name = new FormControl('', [Validators.required]);

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('required') ? 'Name is a required field' : '';
  }
}
