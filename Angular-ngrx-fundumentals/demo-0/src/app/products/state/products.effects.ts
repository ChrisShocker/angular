import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import {
  catchError,
  concat,
  concatMap,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';

@Injectable()
export class ProductsEffects {
  ngrxOnInitEffects() {
    // use lifecycle hook to catch case when the component is initialized
    // catches case where data hasn't been initialized yet and we need to load it
    return ProductsPageActions.loadProducts();
  }

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
      // concatMap(() =>
      //  we can use exhaustMap because the data is mostly static, new requests won't be dispatched until the previous one is completed
      exhaustMap(() =>
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

  addProduct$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductsPageActions.addProduct),
      // We use mergeMap to merge the result of the service call into the stream
      // mergeMap is used when the order of the emitted values is not important
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsApiActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsApiActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductsPageActions.updateProduct),
      // Use concatMap to elimate race conditions and wait for the previous action to complete
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map((product) =>
            ProductsApiActions.productUpdatedSuccess({ product })
          ),
          catchError((error) =>
            of(ProductsApiActions.productUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsApiActions.productDeletedSuccess({ id })),
          catchError((error) =>
            of(ProductsApiActions.productDeletedFail({ message: error }))
          )
        )
      )
    )
  );
}
