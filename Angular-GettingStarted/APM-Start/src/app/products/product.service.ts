import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable,catchError,tap, throwError } from "rxjs";

/*
Global access to the service via root:
    @Injectable({
        providedIn: "root"
    })
*/

@Injectable()

export class ProductService {

    private productUrl = "api/products/products.json";
    constructor(private http: HttpClient){}

    //set get to generic Iproduct[] to map returned array to IProduct type
    //call observable pipe to access pipe and 
    //tap accesses emitted item without modifying it
    //data = observable emitted data
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = "";
        if(err.error instanceof ErrorEvent){
            //Client Side error ocurred, handle it
            errorMessage = `An error occurred: ${err.error.message}`;
        } else{
            //Backend error ocurred, handle it
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; 
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }

}