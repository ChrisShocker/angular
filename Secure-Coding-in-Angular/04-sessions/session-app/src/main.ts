import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withXsrfConfiguration,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { Observable } from 'rxjs';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home.component';
import { ProtectedComponent } from './app/protected.component';

// call api endpoint to get XSRF token
function setupXSRFTokenFactory(http: HttpClient): () => Observable<any> {
  return () => http.get('/api/xsrfEndpoint');
}

bootstrapApplication(AppComponent, {
  providers: [
    // Use XSRF protection on app init prior to any authentication
    importProvidersFrom(BrowserModule),
    {
      provide: APP_INITIALIZER,
      useFactory: setupXSRFTokenFactory,
      deps: [HttpClient],
      multi: true,
    },
    // Add XSRF protection to HttpClient
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),
    provideRouter([
      { path: 'protected', component: ProtectedComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ]),
  ],
}).catch((err) => console.error(err));
