import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//add routing
import { Routes, RouterModule } from "@angular/router";
import { ContactManagerAppComponent } from './contactManager/contact-manager-app.component';

const routes: Routes = [
  // use lazy loading for demo module
  {
    path: 'demo', 
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  },
  { path: '**', redirectTo: 'demo' }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactManagerAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }