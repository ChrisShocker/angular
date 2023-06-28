import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

//define custom breakpoint width
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public isScreenSmall: boolean = false;
  showFiller: boolean = false;

  //build user observable to allow sidenav data binding
  users: Observable<User[]> | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
    ) {
  }

  ngOnInit(): void {
    //we can use BreakpointObserver to watch changes in the dom and react to them with observe
    this.breakpointObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

      //initialize users obersablve to the exposed object from user service
      this.users = this.userService.users;
      this.userService.loadUsersFromAPI();

      //subscribe to the user service 
      this.users.subscribe(data => {
        console.log("side-nav: " +data);
      })
  } 

}
