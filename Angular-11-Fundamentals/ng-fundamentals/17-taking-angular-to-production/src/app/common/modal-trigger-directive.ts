import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  //note the selector uses attribute syntax []
  selector: '[modal-trigger]',
})

// directive attaches click event handler to whatever element it's created on
export class ModalTriggerDirective implements OnInit {
  // element being bound to
  private htmlElement!: HTMLElement;
  // catch input from nav template
  @Input('modal-trigger') modalId!: string;

  // use any since JQUERY API is complex
  // note: ElementRef provides a pointer to the element clicked that cuased directive to be created
  constructor(triggerdElement: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    // since ElementRef is a large wrapper, apply just what we need to a global var
    this.htmlElement = triggerdElement.nativeElement;
  }

  ngOnInit(): void {
    //whenever event is clicked call the modal
    this.htmlElement.addEventListener('click', () => {
      // call modal function from JQuery
      // id is from simple-modal component and binds to the html element id.
      // since bound to an id, only one modal can exist in the applicaiton at a time.
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
