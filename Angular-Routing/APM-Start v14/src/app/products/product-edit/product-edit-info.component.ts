import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit
{
  @ViewChild(NgForm) productForm?: NgForm;

  errorMessage = '';
  product!: Product;



  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void
  {
    //retrieve product data from parent's resolver
    this.route.parent?.data.subscribe(data =>
    {

      //reset form on init
      if (this.productForm)
      {
        this.productForm.reset();
      }

      // set product data product from subscription
      // note 'resolvedData' is from the parents resolver (product.module.ts)
      this.product = data['resolvedData'].product;
    })
  }
}
