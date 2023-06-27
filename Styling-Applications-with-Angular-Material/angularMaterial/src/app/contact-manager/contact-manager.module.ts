import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactManagerAppComponent } from './contact-manager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';



@NgModule({
  declarations: [
    ContactManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContactManagerModule { }
