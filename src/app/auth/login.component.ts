import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from './auth.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    loadingSignup = false;
    error = '';
    message = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    clearMessages(){
        this.error = '';
        this.message = '';
        this.loading = false;
    }
    ngOnInit() {
        this.clearMessages();
        this.authenticationService.logout();
    }
 
    login() {
        this.clearMessages();
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Error';
                    this.loading = false;
                }
            },
            error =>{
                this.error = error;
                this.loading = false;
            }
        );
    }

    signup() {
        this.clearMessages();
        this.loadingSignup = true;
        this.authenticationService.signup(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.message = "Success signup on plataform!"
                } else {
                    this.error = 'Error on creating user.';                    
                }
                this.loadingSignup = false;
            },
            error =>{
                this.error = error;
                this.loadingSignup = false;
            }
        );
    }
}