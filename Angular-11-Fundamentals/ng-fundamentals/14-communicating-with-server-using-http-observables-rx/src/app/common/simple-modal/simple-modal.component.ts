import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { JQ_TOKEN } from '../jQuery.service';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css'],
})
export class SimpleModalComponent {
  @Input() title: string = '';
  @Input() elementId: string = '';
  //add option to prevent modal from being closed on click
  @Input() closeOnBodyClick: string = '';
  //use ViewChild to give a reference to the DOM node
  //ViewCildren could be used for a list inside an ngFor
  @ViewChild('modalContainer') containerElement!: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  closeModal() {
    //only close modal if option is true
    if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
      //call Jquery method to hide the modal
      this.$(this.containerElement.nativeElement).modal('hide');
    }
  }
}
