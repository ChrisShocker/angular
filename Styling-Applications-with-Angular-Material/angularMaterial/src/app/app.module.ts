import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//add routing
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  // use lazy loading for demo module
  {
    path: 'demo', 
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: 'contactManager', 
    loadChildren: () => import('./contact-manager/contact-manager.module').then(m => m.ContactManagerModule)
  },
  { path: '**', redirectTo: 'contactManager' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }