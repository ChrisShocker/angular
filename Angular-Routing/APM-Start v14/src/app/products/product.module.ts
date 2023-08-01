import { Component, NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';

let routes: Routes = [
  { path: 'products', component: ProductListComponent },
  //placeholders can be added to routes to pass info between components
  { path: 'products/:id', component: ProductDetailComponent, resolve: { resolvedData: ProductResolver } },
  {
    path: 'products/:id/edit', component: ProductEditComponent, resolve: { resolvedData: ProductResolver },
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProductEditInfoComponent
      },
      {
        path: 'tags',
        component: ProductEditTagsComponent
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'products' },
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
})
export class ProductModule { }
