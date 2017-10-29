import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InviteService } from './invite.service';
import { EventService } from '../event/event.service';
import { GlobalMessageService } from '../global-message/global-message.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  
  invited = [];
  confirmed = [];
  notInvite = [];

  id;
  event;
  
  constructor(private router: ActivatedRoute, private inviteService: InviteService,private eventService: EventService,
    private globalMessageService : GlobalMessageService) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.setupEvent();
    this.setupUsers();
  }

  setupEvent(){
    this.eventService.getEventById(this.id).subscribe(event => {
      this.event = event;
      this.event.invites.forEach(item => {
        if(item.accepted){
          this.confirmed.push(item.invited);
        }else{
          this.invited.push(item.invited);
        }
      });
    });
  }

  setupUsers(){
    this.inviteService.getAllUsersNotInvited(this.id).subscribe(users => {      
      this.notInvite = users;
    });
  }

  sendInvite(userId){
    this.inviteService.sendInvite(userId,this.event.id).subscribe(mode => {
      this.globalMessageService.addMessage("Invite send with success.","success",6);
      let userToAdd;
      this.notInvite.forEach((user,index) =>{
        if(user.id === userId){
          this.invited.push(user);
          this.notInvite.splice(index,1);
        }
      });
    },error =>{ 
      this.globalMessageService.addMessage(error,"danger",6);
    });
  }

  cancelInvite(userId){
    this.inviteService.cancelInvite(userId,this.event.id).subscribe(mode => {
      this.globalMessageService.addMessage("You canceled the invitation successfully.","success",6);
      let userToAdd;
      this.invited.forEach((user,index) =>{
        if(user.id === userId){
          this.notInvite.push(user);
          this.invited.splice(index,1);
        }
      });
      this.confirmed.forEach((user,index) =>{
        if(user.id === userId){
          this.notInvite.push(user);
          this.confirmed.splice(index,1);
        }
      });
    },error =>{ 
      this.globalMessageService.addMessage(error,"danger",6);
    });
  }
  

}
