import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: "pm-products",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    /*
    To inject the product service into the component for component access:
     private _productService;
     constructor(productService: ProductService){
        this._productService = productService;
      }
      Note: Typescript has provided shorthand syntax for the above functionality (below):
    */

    //Shorthand constructor service injectable example:
    constructor(private productService: ProductService) {
    }

    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = "";
    products: IProduct[] = [];

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log("Setter change to:" + value);

    }

    performFilter(): IProduct[] {
        /*
            Note:
                Filter returns a shallow copy of an array that if modified 
                will change the original array.
                In this instance since we're only returning a filtered version of 
                the array and not setting any values, it works.
                If we were going to modify any array values, then a deep copy of the
                original array should be made, modified, and returned, if we want to
                preserve the original array. 
        */
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().includes(this.listFilter.toLowerCase()));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('Triggered OnInit');
        this.products = this.productService.getProducts();
    }

    /*
        Step 4:
            Implement Function to handle the event passed in from nested component
    */
    onRatingClicked(message: string): void {
        this.pageTitle = "Product List " + message;
    }
}