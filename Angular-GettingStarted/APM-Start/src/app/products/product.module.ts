import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { starComponent } from '../shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './products-detail/product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsDetailComponent,
    ConvertToSpacesPipe,
    starComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*Since Router has already been imported as a service in AppModule
      we use "forChild" and include the paths specific to this feature module
      forChild doesn't reregister the router service 
      and only declares directives and configures routes
    */
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
       canActivate: [ProductDetailGuard],
       component: ProductsDetailComponent},

    ]),
    SharedModule
  ]
})
export class ProductModule { }
