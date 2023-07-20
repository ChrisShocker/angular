import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession, restrictedWords } from '../shared/index';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css'],
})
export class CreateSessionComponent implements OnInit {
  // Example reactive component for reactive form

  //create instance of FormGroup to bind to
  newSessionForm!: FormGroup;

  //declare FormGroup parameters as public
  //parameters can now catch values declared in template/html
  name!: FormControl;
  presenter!: FormControl;
  duration!: FormControl;
  level!: FormControl;
  abstract!: FormControl;

  //Pass output from session child component back to parent event component 
  //using an EventEmitter
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();

  ngOnInit() {
    //Note: FormControl parameters must be bound before declared in FormGroup
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    // validator array is just a list of functions to call for validation
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
      restrictedWords(['foo', 'bar']),
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  print(data: any) {
    console.log(data);
  }

  //catch form variables on submit and apply them to a session interface
  saveSession(formValues: any) {
    let newSession: ISession = {
      id: 1,
      name: formValues.name,
      presenter: formValues.presenter,
      duration: +formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: [],
    };
    console.log(newSession);

    //emit the saveSession form data to subscriber 
    return this.saveNewSession.emit(newSession);
  }

  cancel(){
    //emit a cancelAddSession event to parent component
    this.cancelAddSession.emit()
  }
}
