import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
   moduleId: module.id,
   templateUrl: 'list.event.component.html'
})

export class ListEventComponent implements OnInit {
   
    events;
    
    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
                console.log(events);
            });
    }

    accept(invite){
        this.eventService.acceptInvitation(invite.id).subscribe(message => {
            invite.message = message.message;
            invite.accepted = true;
        },error =>{
            invite.message = error;
        });
    }

    unaccept(invite){
        this.eventService.unaceptInvitation(invite.id).subscribe(message => {
            invite.message = message.message;
            invite.accepted = false;
        },error =>{
            invite.message = error;
        });        
    }


}