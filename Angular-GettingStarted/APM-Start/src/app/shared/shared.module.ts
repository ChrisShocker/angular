import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { starComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

@NgModule({
  declarations: [
    starComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    CommonModule
  ],
  //to share components with other modules we create an exports array
  exports:[
    CommonModule,
    FormsModule,
    starComponent,
    ConvertToSpacesPipe
  ]
})
export class SharedModule { }