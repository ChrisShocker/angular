import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactManagerAppComponent } from './contact-manager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
//import material module to access all of angular materials 
import { MaterialModule } from '../shared/material.module';

//adding form module since Angular Materials has it as a dependency
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // use lazy loading for demo module
  {
    path: '', component: ContactManagerAppComponent,
    children: [
      { path: '', component: MainContentComponent }
    ]

  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ContactManagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactManagerModule { }
