import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular-RxJS-Reactive-Development';

  ngOnInit(): void {
    of(2, 4, 6, 8).subscribe((data) => {
      console.log(data);
    });
    from([3, 6, 9, 12]).subscribe((data) => {
      console.log(data);
    });
  }
}
