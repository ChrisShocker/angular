import { Component } from '@angular/core';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent {

  save(): void{
    console.log("Save");
  }

  dismiss(): void{
    console.log("Dismiss");
  }

}
