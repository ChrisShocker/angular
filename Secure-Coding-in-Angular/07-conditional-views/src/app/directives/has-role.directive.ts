import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ROLE } from '../user.service';

// more complex directive that has two inputs, doesn't support dyanmic roles currently
@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnChanges {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private role!: ROLE;
  private userRole: ROLE = 'enduser';

  // checks if the user has a role
  @Input() set appHasRole(role: ROLE) {
    this.role = role; // currently assumes this remains static
  }

  // check for specific user role
  @Input() set appHasRoleUserRole(userRole: ROLE) {
    this.userRole = userRole;
  }

  // watch for any changes and update the view accordingly
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['appHasRoleUserRole'].currentValue !==
      changes['appHasRoleUserRole'].previousValue
    ) {
      if (this.role === this.userRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }
}
