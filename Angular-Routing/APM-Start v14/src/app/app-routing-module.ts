import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

//routes for application routing
let routes: Routes = [
  // priority path
  { path: 'welcome', component: WelcomeComponent },
  // use .then to handle the returned promise from the observable for lazy loading
  {
    path: 'products',
    // note: canLoad will block preloading
    canLoad: [AuthGuard],
    // add preload identifier for selective loading 
    data: {preload: true},
    loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
  },
  // default path
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  // wildcard/catch all path
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: SelectiveStrategy })],
  // Router Module must be exported to allow other components access
  exports: [RouterModule],
})
export class AppRoutingModule { }
