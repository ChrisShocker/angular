import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[] | undefined;

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Note>;

  constructor(){
    console.log("In Constructor ")
    this.dataSource = new MatTableDataSource<Note>(this.notes);

  }


  ngOnInit(): void {
    console.log("In init ")
  }


}
