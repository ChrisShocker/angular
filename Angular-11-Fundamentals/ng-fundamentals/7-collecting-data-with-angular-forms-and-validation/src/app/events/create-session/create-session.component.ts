import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared';

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

  ngOnInit() {
    //Note: FormControl parameters must be bound before declared in FormGroup
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      // validator array is just a list of functions to call for validation
      Validators.required,
      Validators.maxLength(400),
      this.restrictedWords,
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  print(data: any){
    console.log(data);
  }

  //custom validator function
  private restrictedWords(control: FormControl): { [key: string]: any } | null {
    return control.value.includes('foo') ? { restrictredWords: 'foo' } : null;
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
  }
}
