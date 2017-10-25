import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './auth/home.component';
import { AuthGuard } from './auth/auth.guard';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);