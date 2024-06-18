import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ROLE } from '../user.service';

@Directive({
  selector: '[appAdmin]',
  standalone: true,
})
export class AdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  // checks if the user has the role admin and displays the view if true
  @Input() set appAdmin(role: ROLE) {
    if (role === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
