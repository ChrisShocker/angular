import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductData } from '../product-data';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit
{
  pageTitle = 'Product Edit';
  errorMessage = '';

  product: Product | null = null;

  // keep track of data validation manually 
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(private productService: ProductService,
    private messageService: MessageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void
  {
    // OnInit won't fire on route parameter changes
    // to catch route parameter changes we use an observable
    // this.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id')));

    // this.activatedRoute.paramMap.subscribe((params) =>
    // {
    //   this.getProduct(Number(params.get('id')));
    // })

    //wrap resolver in observable to catch route param changes
    this.activatedRoute.data.subscribe(data =>
    {
      // use resolver instead
      const resolvedData: ProductResolved = data['resolvedData'];

      if (resolvedData.error)
        this.errorMessage = resolvedData.error;

      if (resolvedData.product)
        this.onProductRetrieved(resolvedData.product);

    })

  }

  // use resolver
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

    if (!this.product)
    {
      this.pageTitle = 'No product found';
    } else
    {
      if (this.product.id === 0)
      {
        this.pageTitle = 'Add Product';
      } else
      {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void
  {
    if (!this.product || !this.product.id)
    {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product?.productName} was deleted`);
    } else
    {
      if (confirm(`Really delete the product: ${this.product.productName}?`))
      {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product?.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void
  {
    if (this.product)
    {
      if (this.product.id === 0)
      {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else
      {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else
    {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void
  {
    if (message)
    {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  validate(): void
  {
    // clear validation object
    this.dataIsValid = {};

    // info tab validation checks
    if (this.product && this.product.productName && this.product.productName.length >= 3 && this.product.productCode)
    {
      this.dataIsValid['info'] = true;
    } else
    {
      this.dataIsValid['info'] = false;
    }
    // tags tab validation checks
    if (this.product && this.product.category && this.product.category.length >= 3)
    {
      this.dataIsValid['tags'] = true;
    } else
    {
      this.dataIsValid['tags'] = false;
    }
  }
}
