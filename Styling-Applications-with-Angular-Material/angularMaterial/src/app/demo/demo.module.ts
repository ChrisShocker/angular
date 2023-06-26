import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';

//import material module to access all of angular materials 
import { MaterialModule } from '../shared/material.module';

//adding form module since Angular Materials has it as a dependency
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DemoModule { }
