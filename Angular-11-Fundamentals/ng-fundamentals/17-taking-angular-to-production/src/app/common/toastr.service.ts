//use InjectionToken to tell angular about a dependency injection for the 
//dependency registration
import { InjectionToken } from '@angular/core';

//InjectionToken takes a type, it's the type the service we're calling returns
//the constructor takes in a string that's useful for debugging
//Note: TOASTR_TOKEN is an object
export const TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(msg: string, title?: string): void;
  info(msg: string, title?: string): void;
  warning(msg: string, title?: string): void;
  error(msg: string, title?: string): void;
}