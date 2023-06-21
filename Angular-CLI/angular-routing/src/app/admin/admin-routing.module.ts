import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmailBlastComponent } from './email-blast/email-blast.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    // for the admin path load the components
    path: 'admin', 
    component: AdminComponent,
    children: [
      // to load the paths we must add router outlet in the admin component
      { path: '', component: UserComponent },
      { path: 'blast', component: EmailBlastComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
