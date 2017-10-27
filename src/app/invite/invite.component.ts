import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InviteService } from './invite.service';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  
  invited: any = {};
  notInvite: any = {};
  confirmed: any = {};

  id;
  event;
  
  constructor(private router: ActivatedRoute, private inviteService: InviteService,private eventService: EventService) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.setupEvent();
  }

  setupEvent(){
    this.eventService.getEventById(this.id).subscribe(event => {
      this.event = event;
      console.log(event);
    });
  }

  setupUsers(){

  }

  sendInvite(userId){

  }

  cancelInvite(userId){

  }
  

}
