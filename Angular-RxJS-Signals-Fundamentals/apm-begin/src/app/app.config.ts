import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// intercepts http requests with Angular API and returns
export const appConfig: ApplicationConfig = {
  providers: [
    // must be before InMemory.. for it to work
    provideHttpClient(),
    importProvidersFrom(
      FormsModule,
      // api intercepts HTTP requests. AppData is defined in app-data.ts with all the applications backend data
      InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })
    ),
    provideRouter(routes),
  ],
};
