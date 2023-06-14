import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';

@Component({
  selector: 'pm-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  pageTitle: string = "Product Details";

  //Mark the type as undefined since it's value will be passed in later with http
  product: IProduct | undefined;

  //set activated route as dependency
  //add router for code based navigation
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //from RouterModule, defined route taking in 'id' param: {path: 'products/:id', component: ProductsDetailComponent}
    //from product-list.comp: passing in 'id':
    /*
      <a [routerLink]="['/products', product.productId]"> 
        {{product.productName}} 
      </a>
    */

    //Get the route parameter passed in from product-list comp
    //using the snapshot approach since paramter won't change while comp is displayed
    //since id is a string, we cast to a number: Number()
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.product = {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2021",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png"
    }
  }

  //method to allow code based navigation
  onBack(): void{
    this.router.navigate(['/products']);
  }

}
