import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './product-page/product-page.component';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './state/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './state/products.effects';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductEditComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    // The store must be imported using the forFeature method in feature modules.
    StoreModule.forFeature('products', productsReducer),
    // lists of Effects we want to use in the feature module
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsModule {}
