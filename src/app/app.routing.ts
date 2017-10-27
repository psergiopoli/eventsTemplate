import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './auth/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ListEventComponent } from './event/list.event.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { InviteComponent } from './invite/invite.component';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'events', component: ListEventComponent, canActivate: [AuthGuard] },
    { path: 'createEvent', component: CreateEventComponent, canActivate: [AuthGuard] },
    { path: 'invite/:id', component: InviteComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);