import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, map, of, concat, tap, concatMap } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  // // mock observale to return a list of supplier ids
  // // inner observable emits a supplier
  // // THIS IS BAD PRACTICE
  // suppliersWithMap$ = of(1, 5, 8).pipe(
  //   map((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  // );

  // use concatMap, a higher order rxjs operator to flatten the inner observable
  // concatMap will subscribe and wait to emit results in sequence
  suppliersWithConcatMap$ = of(1, 5, 8).pipe(
    tap((id) => console.log('concatMap source Observable', id)),
    concatMap((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  constructor(private http: HttpClient) {
    // // manually subscribe to the observable with a nested observable subscription
    // // THIS IS BAD PRACTICE
    // this.suppliersWithMap$.subscribe((item) =>
    //   item.subscribe((item) => console.log('map result ', item))
    // );

    // subsribe and log the results of concatMap
    // Notice they will be console logged in order
    this.suppliersWithConcatMap$.subscribe((item) =>
      console.log('concatMap result ', item)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
