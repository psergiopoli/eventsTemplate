import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { routing }        from './app.routing';
 
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { LoginComponent } from './auth/login.component';
import { ListEventComponent } from './event/list.event.component';
import { EventService } from './event/event.service';
import { NavbarComponent } from './navbar/navbar.component';
import { GlobalEventsManager } from './global.eventmanager';
import { CreateEventComponent } from './create-event/create-event.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InviteComponent } from './invite/invite.component';
import { InviteService } from './invite/invite.service';
import { DatePipe } from '@angular/common';
import { GlobalMessageComponent } from './global-message/global-message.component';
import { GlobalMessageService } from './global-message/global-message.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ListEventComponent,
		NavbarComponent,
		CreateEventComponent,
		InviteComponent,
		GlobalMessageComponent
	],
	exports: [
		RouterModule
	],
	imports: [
		BrowserModule,
        FormsModule,
        HttpModule,
		routing,
		DateTimePickerModule ,
		BrowserAnimationsModule
	],
	providers: [
		AuthGuard,
        AuthenticationService,
        UserService,
		EventService,
		InviteService,
		GlobalEventsManager,
		DatePipe,
		GlobalMessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
