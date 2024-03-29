import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';

// Routing Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    //by importing the AppRoutingModule, the declarations have access to its routing directives for those components
    UserModule,
    MessageModule,
    BrowserAnimationsModule,
    //note route imports should be ordered so the wild card path is last
    AppRoutingModule,
  ],
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
