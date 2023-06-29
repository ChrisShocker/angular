import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

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
    private userService: UserService,
    private router: Router
    ) {
  }

  //Create an event for the MatDrawer using #drawer
  @ViewChild(MatDrawer)
  drawer!: MatDrawer;

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
        //if data exists, display the first item in the list
        if (data.length > 0) this.router.navigate(['./contactManager', data[0].id])
      })

      //router exposes events as an observable, so we can subscribe to it
      this.router.events.subscribe( () =>{
        //always close the drawer once the router has detected a change
        if(this.isScreenSmall){
          this.drawer.close();
        } 
      })
  }

  isDarkTheme: boolean = false;

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme;
  }

}
