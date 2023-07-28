import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    ProductModule,
    UserModule,
    MessageModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
