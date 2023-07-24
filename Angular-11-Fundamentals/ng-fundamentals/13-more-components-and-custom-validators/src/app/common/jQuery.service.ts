//use InjectionToken to tell angular about a dependency injection for the 
//dependency registration
import { InjectionToken } from '@angular/core';

//InjectionToken takes a type, it's the type the service we're calling returns
//the constructor takes in a string that's useful for debugging
//Note: _TOKEN is an object
export let JQ_TOKEN = new InjectionToken<Object>('jQuery');