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
    private service: UserService){

  }

  ngOnInit(): void {
    //subscribe to route to get id params 
    this.route.params.subscribe(params =>{
      const id = params['id'];
      //call userService function to get user by id
      this.user = this.service.getUserById(id);
      
    })
  }

}
