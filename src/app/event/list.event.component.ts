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
            });
    }

}