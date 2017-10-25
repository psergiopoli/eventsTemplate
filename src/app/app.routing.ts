import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './auth/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ListEventComponent } from './event/list.event.component';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'events', component: ListEventComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);