import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthenticationService } from '../auth/auth.service';
import { GlobalEventsManager } from '../global.eventmanager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged = false;
  user: any = {};

  constructor(private userService: UserService,private authenticationService: AuthenticationService,private globalEventsManager: GlobalEventsManager) { 
    this.globalEventsManager.showNavBar.subscribe((mode: any) => {
      this.userService.getUser()
      .subscribe(user => {
          this.user = user;
          this.logged = true;
      });
    });

    this.globalEventsManager.hideNavBar.subscribe((mode: any) => {
      this.logged = false;
      this.user = {};
    });

  }
  
  logout(){
    this.globalEventsManager.hideNavBar.emit(true);
  }

  ngOnInit() {
    
  }

}
