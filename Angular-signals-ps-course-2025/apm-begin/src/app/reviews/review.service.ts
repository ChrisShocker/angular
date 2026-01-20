import { inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { httpResource } from '@angular/common/http';
import { Review } from './review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly productService = inject(ProductService);

  private readonly reviewsUrl = 'api/reviews';

  // if the id is undefined don't retrieve anything
  reviewsResource = httpResource<Review[]>(
    () => {
      const p = this.productService.selectedProduct();
      if (p) {
        return `${this.reviewsUrl}?productId=^${p.id}$`;
      } else {
        return undefined;
      }
    },
    { defaultValue: [] },
  );

  // To use the options object
  // reviewsResource = httpResource<Review[]>(() => ({
  //   url: this.reviewsUrl,
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json'
  //   },
  //   params: {
  //     productId: `^${this.productService.selectedProduct()?.id ?? 0}$`
  //   }
  // }));

  // Use the options object with no retrieval
  // Prevent retrieval if there is no selected product
  // reviewsResource = httpResource<Review[]>(() => {
  //   const p = this.productService.selectedProduct();
  //   if (p) {
  //     return {
  //       url: this.reviewsUrl,
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json'
  //       },
  //       params: {
  //         productId: `^${p.id}$`
  //       }
  //     }
  //   } else {
  //     return undefined;
  //   }
  // },
  //   { defaultValue: [] }
  // );
}
