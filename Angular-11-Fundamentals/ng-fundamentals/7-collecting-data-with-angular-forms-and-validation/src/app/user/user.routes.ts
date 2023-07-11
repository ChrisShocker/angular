import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileReactiveFormComponent } from "./profile-reactive-form/profile-reactive-form.component";

export const userRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'profile/reactive', component: ProfileReactiveFormComponent},
    {path: 'profile', component: ProfileComponent}
]