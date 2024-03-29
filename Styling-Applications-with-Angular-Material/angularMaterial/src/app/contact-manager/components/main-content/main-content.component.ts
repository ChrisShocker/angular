import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User | undefined;

  constructor(
    //add ActivatedRoute to get route params
    private route: ActivatedRoute,
    //add userService to lookup a user by ID
    private userService: UserService) {
  }

  ngOnInit(): void {
    //subscribe to route to get id params 
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      //subscribe to observable to get updated user data
      this.userService.users.subscribe(users => {
        if (users.length == 0) return;
        setTimeout(() => {
          //call data service to lookup user object
          this.user = this.userService.getUserById(id);
        }, 500)
      });
    })
  }
}
