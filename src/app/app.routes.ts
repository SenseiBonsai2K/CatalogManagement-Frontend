import { Routes } from '@angular/router';
import { ApparelsListComponent } from './apparels-list/apparels-list.component';
import { ApparelDetailComponent } from './apparel-detail/apparel-detail.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'Apparels', component: ApparelsListComponent },
    { path: 'Apparels/Apparel/:id', component: ApparelDetailComponent },
    { path: 'Categories/:name', component: ApparelsListComponent },
    { path: 'Apparels/Search/:searched', component: ApparelsListComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'SignIn', component: SignInComponent },
    { path: 'Profile', component: ProfileComponent}
];
