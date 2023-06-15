import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class starComponent implements OnChanges {
    @Input() rating: number = 0;
    cropWidth: number = 200;

    /*
    Step 1 for outputs:
        Define a ratingClicked event property that will output a value to it's container
        Type is EventEmitter which will be passed in a string.
    */
    @Output() ratingClicked: EventEmitter<string> =
        //New event object must be created.
        new EventEmitter<string>();

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 4.55;
    }

    onClick(): void {
        /*
        Step 2:
            emit the ratingClicked event and pass the output to the container
            The nested output() event must be caught in the parent container in product-list.component.html
        */
        this.ratingClicked.emit("the rating " + this.rating + " was clicked!");
    }
}