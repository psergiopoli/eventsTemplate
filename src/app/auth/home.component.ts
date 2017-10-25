import { Component, OnInit } from '@angular/core';
 
import { User } from './user';
import { UserService } from './user.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    user;
 
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(user => {
                this.user = user;
            });
    }
 
}