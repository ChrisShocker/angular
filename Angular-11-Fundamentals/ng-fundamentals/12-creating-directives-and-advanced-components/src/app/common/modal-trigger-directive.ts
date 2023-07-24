import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  //note the selector uses attribute syntax []
  selector: '[modal-trigger]',
})

// directive attaches click event handler to whatever element it's created on
export class ModalTriggerDirective implements OnInit {
  //
  private htmlElement!: HTMLElement;

  // use any since JQUERY API is complex
  // note: ElementRef provides a pointer to the element clicked that cuased directive to be created
  constructor(triggerdElement: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    // since ElementRef is a large wrapper, apply just what we need to a global var
    this.htmlElement = triggerdElement.nativeElement;
  }

  ngOnInit(): void {
    //whenever event is clicked call the modal
    this.htmlElement.addEventListener('click', (event) => {
      // call modal function from JQuery
      // id is from simple-modal component
      this.$('#simple-modal').modal({});
    });
  }

  //get handle to element
}
