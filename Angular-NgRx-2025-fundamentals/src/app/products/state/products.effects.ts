import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductAPIActions, productsPageOpened } from './products.actions';
import { catchError, concatMap, map, of } from 'rxjs';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductsService)) => {
    return actions$.pipe(
      ofType(productsPageOpened),
      // sync handle all reqeusts
      concatMap(() =>
        productService.getProducts().pipe(
          // handle different actions for responsed from api and dispatch actions to be handled
          map((products) => ProductAPIActions.productsFetchedSuccsess({ products })),
          catchError((error) =>
            of(ProductAPIActions.productsFetchedFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
