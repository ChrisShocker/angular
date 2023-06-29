import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {
  @Input() notes: Note[] | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'title', 'date'];

  dataSource: MatTableDataSource<Note>;

  constructor(){
    this.dataSource = new MatTableDataSource<Note>;

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
     this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

}
