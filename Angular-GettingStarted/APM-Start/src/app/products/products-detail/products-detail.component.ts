import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pm-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  pageTitle: string = "Product Details"

  //set activated route as dependency
  constructor(private route: ActivatedRoute) { }

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
    this.pageTitle += `: ${id}`
  }

}
