import { Injectable } from '@angular/core';

//declare toaster in global scope
//this should be ok since this class access is limited to this class 
declare let toastr: any;

@Injectable({
  providedIn: 'root'
})

export class ToastrService {

  constructor() { }

  //call success on the toastr object
  success(message: string, title?: string) {
    toastr.success(message, title);
  }

  //call info on the toastr object
  info(message: string, title?: string) {
    toastr.info(message, title);
  }

  //call warning on the toastr object
  warning(message: string, title?: string) {
    toastr.warning(message, title);
  }

  //call error on the toastr object
  error(message: string, title?: string) {
    toastr.error(message, title);
  }
}
