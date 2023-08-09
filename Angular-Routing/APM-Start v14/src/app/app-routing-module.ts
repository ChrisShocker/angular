import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

//routes for application routing
let routes: Routes = [
  // priority path
  { path: 'welcome', component: WelcomeComponent },
  // default path
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  // wildcard/catch all path
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  // Router Module must be exported to allow other components access
  exports: [RouterModule],
})
export class AppRoutingModule { }
