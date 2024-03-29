import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit
{
  pageTitle = 'Product Detail';
  product: Product | null = null;
  errorMessage = '';

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void
  {
    // catch route params and pass to getter function
    // this.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id')));

    // use resolver instead of the activatedRoute to get id param
    // access data using the key from the route path
    const resolvedData: ProductResolved = this.activatedRoute.snapshot.data['resolvedData'];
    if (resolvedData.error)
      this.errorMessage = resolvedData.error;
    if (resolvedData.product)
      this.onProductRetrieved(resolvedData.product);
  }


  // use resolver to return the product instead of getter
  // getProduct(id: number): void
  // {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void
  {
    this.product = product;

    if (this.product)
    {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else
    {
      this.pageTitle = 'No product found';
    }
  }
}
