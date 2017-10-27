import { Component, OnInit } from '@angular/core';
 
import { UserService } from './user.service';
 
@Component({
    moduleId: 'app-menu',
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    user;
 
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        this.userService.getUser()
            .subscribe(user => {
                this.user = user;
            });
    }
 
}