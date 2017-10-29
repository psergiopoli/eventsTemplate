import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
   moduleId: module.id,
   templateUrl: 'list.event.component.html',
   styleUrls: ['./list.event.component.css']
})

export class ListEventComponent implements OnInit {
   
    events;
    
    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
            });
    }

    accept(event){
        this.eventService.acceptInvitation(event.invite).subscribe(message => {
            event.message = message.message;
            event.invitedEventAccepted = true;
        },error =>{
            event.message = error;
        });
    }

    unaccept(event){
        this.eventService.unaceptInvitation(event.invite).subscribe(message => {
            event.message = message.message;
            event.invitedEventAccepted = false;
        },error =>{
            event.message = error;
        });        
    }


}