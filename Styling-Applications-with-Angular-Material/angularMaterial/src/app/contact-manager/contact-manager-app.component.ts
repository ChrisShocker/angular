import { Component, Sanitizer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-manager-app',
  templateUrl: './contact-manager-app.component.html',
  styleUrls: ['./contact-manager-app.component.scss']
})
export class ContactManagerAppComponent {

  //to register the url/svg images we must sanitize it first
  //since we want the user svgs accessable for all components in contact-manager we init it here
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
  }
}
