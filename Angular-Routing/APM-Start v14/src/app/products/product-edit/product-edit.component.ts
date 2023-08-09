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
  pageTitle: string = 'Product Edit';
  errorMessage: string = '';
  isSaved: boolean = false;

  currentProduct!: Product;
  originalProduct!: Product;

  constructor(private productService: ProductService,
    private messageService: MessageService, private activatedRoute: ActivatedRoute, private router: Router) { }


  get product(): Product
  {
    return this.currentProduct;
  }

  set product(value: Product)
  {
    this.currentProduct = value;
    // Clone the object to retain a copy using the spread operator '...'
    if (this.originalProduct)
    {
      this.originalProduct = { ...value };
    }
  }

  get isDirty(): boolean
  {
    // compare strings, data must be in same order for both objects
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  get productSaved(): boolean
  {
    return this.isSaved;
  }

  // keep track of data validation manually 
  private dataIsValid: { [key: string]: boolean } = {};

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
    this.currentProduct = product;

    if (!this.currentProduct)
    {
      this.pageTitle = 'No product found';
    } else
    {
      if (this.currentProduct.id === 0)
      {
        this.pageTitle = 'Add Product';
      } else
      {
        this.pageTitle = `Edit Product: ${this.currentProduct.productName}`;
      }
    }
  }

  deleteProduct(): void
  {
    if (!this.originalProduct || !this.originalProduct.id)
    {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.originalProduct?.productName} was deleted`);
    } else
    {
      if (confirm(`Really delete the product: ${this.originalProduct.productName}?`))
      {
        this.productService.deleteProduct(this.originalProduct.id).subscribe({
          next: () => this.onSaveComplete(`${this.originalProduct?.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void
  {
    if (this.currentProduct)
    {
      if (this.currentProduct.id === 0)
      {
        this.productService.createProduct(this.currentProduct).subscribe({
          next: () => this.onSaveComplete(`The new ${this.currentProduct?.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else
      {
        this.productService.updateProduct(this.currentProduct).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.currentProduct?.productName} was saved`),
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
    this.isSaved = true;
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  // validate a specific tab path or all of them
  isValid(path?: string): boolean
  {
    this.validate();
    if (path)
    {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true))
  }

  validate(): void
  {
    // clear validation object
    this.dataIsValid = {};

    // info tab validation checks
    if (this.currentProduct && this.currentProduct.productName && this.currentProduct.productName.length >= 3 && this.currentProduct.productCode)
    {
      this.dataIsValid['info'] = true;
    } else
    {
      this.dataIsValid['info'] = false;
    }
    // tags tab validation checks
    if (this.currentProduct && this.currentProduct.category && this.currentProduct.category.length >= 3)
    {
      this.dataIsValid['tags'] = true;
    } else
    {
      this.dataIsValid['tags'] = false;
    }
  }
}
