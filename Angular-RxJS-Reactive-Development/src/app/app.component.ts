import { Component, OnInit } from '@angular/core';
import { of, from, map } from 'rxjs';

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
    console.log('map example');
    of(1, 2, 3, 4)
      .pipe(map((data) => data * 2))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
