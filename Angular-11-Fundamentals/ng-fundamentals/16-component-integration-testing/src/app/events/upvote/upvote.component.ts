import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css'],
})
export class UpvoteComponent {
  // number of votes
  @Input() count: number = 0;

  // if user voted
  @Input() set voted(val:any){
    this.iconColor = val ? 'red' : 'white';
  }
  // vote event
  @Output() vote = new EventEmitter();

  iconColor!: string;

  onClick(){
    //when clicked emit vote event
    this.vote.emit({});
  }
}
