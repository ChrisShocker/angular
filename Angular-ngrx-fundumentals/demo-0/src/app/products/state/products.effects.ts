import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { catchError, concatMap, EMPTY, map, of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions.pipe(
      // actions we want to listen for
      // when the loadProducts action is dispatched this effect will run
      ofType(ProductsPageActions.loadProducts),
      // concatMap maps over emitted actions calls an angular service and mergs the result observables into a single stream we can use
      concatMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsApiActions.productsLoadSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsApiActions.productsLoadFail({ message: error }))
          )
        )
      )
    )
  );
}
