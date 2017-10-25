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
import { HomeComponent } from './auth/home.component';
import { ListEventComponent } from './event/list.event.component';
import { EventService } from './event/event.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
        HomeComponent,
		ListEventComponent
	],
	exports: [
		RouterModule
	],
	imports: [
		BrowserModule,
        FormsModule,
        HttpModule,
        routing
	],
	providers: [
		AuthGuard,
        AuthenticationService,
        UserService,
		EventService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
