import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmailBlastComponent } from './email-blast/email-blast.component';


@NgModule({
  declarations: [
    AdminComponent,
    EmailBlastComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
