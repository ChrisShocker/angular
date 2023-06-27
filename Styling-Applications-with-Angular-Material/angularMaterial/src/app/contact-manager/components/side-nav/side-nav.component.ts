import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';

//define custom breakpoint width
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  public isScreenSmall: boolean = false;
  showFiller: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    //we can use BreakpointObserver to watch changes in the dom and react to them with observe
    this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

  }

}
