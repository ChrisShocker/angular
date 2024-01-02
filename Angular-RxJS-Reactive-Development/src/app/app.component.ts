import { Component, OnInit } from '@angular/core';
import { of, from, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular-RxJS-Reactive-Development';

  ngOnInit(): void {
    /*
     example RxJS functions
      - note they call unsubscribe automatically
    */
    console.log('of example');
    of(2, 4, 6, 8).subscribe((data) => {
      console.log(data);
    });

    console.log('from example');
    from([3, 6, 9, 12]).subscribe((data) => {
      console.log(data);
    });

    console.log('from example with complete');
    from([4, 8, 12, 16]).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('Complete!'),
    });

    // example map usage
    // use map to modify every value from the input observable
    // map returns and output observable with the mapped changes
    console.log('map example');
    of(1, 2, 3, 4)
      .pipe(map((data) => data * 2))
      .subscribe((data) => {
        console.log(data);
      });

    // example tap usage
    // use tap to view the data without changing it or to add side effects
    // tap emits an observable identical to its input observable
    console.log('tap example');
    of(1, 2, 3, 4)
      .pipe(
        tap((data) => {
          console.log(`tap ${data}`);
        }),
        map((data) => data * 3)
      )
      .subscribe((data) => {
        console.log(`map ${data}`);
      });
  }
}
