import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//add routing
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  // use lazy loading for demo module
  {
    path: 'demo', 
    loadChildren: () => import('./demo/buttons/buttons.component').then(m => m.ButtonsComponent)
  },
  { path: '**', redirectTo: 'demo' }
];

@NgModule({
  declarations: [
    AppComponent
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