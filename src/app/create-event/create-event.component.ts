import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GlobalMessageService } from '../global-message/global-message.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  
  event: any = {};
  message;
  error;
  idToEdit;

  constructor(private eventService: EventService,private activatedRouter: ActivatedRoute,
    private router: Router,public datepipe: DatePipe,private globalMessageService : GlobalMessageService) { }

  ngOnInit() {
    this.idToEdit = this.activatedRouter.snapshot.params['id'];
    if(this.idToEdit){
      this.eventService.getEventById(this.idToEdit).subscribe(result =>{
        this.event = result;
        this.event.event_start_temp = this.event.event_start;
        this.event.event_end_temp = this.event.event_end;;
      });
    }
  }
  
  cancelEvent(){
    this.eventService.cancelEvent(this.idToEdit).subscribe(result => {
      if (result === true) {        
        this.globalMessageService.addMessage('Event canceled','success',4);
        this.router.navigate(['/']);
      }
    },error =>{
      this.error = error;
    });
  }

  newEvent(){
    this.eventService.createEvent(this.event).subscribe(result => {
      if (result === true) {
        this.message = "Succesful on create event!";
      }
    },error =>{
      this.error = error;
    });
  }

  editEvent(){
    this.event.id = this.idToEdit;
    this.eventService.editEvent(this.event).subscribe(result => {
      if (result === true) {
        this.message = "Succesful on edit event!";
      }
  },error =>{
    this.error = error;
  });
  }
  
  processForm(){
    let parts_event_start = this.event.event_start_temp.split('/');
    parts_event_start[5] = parts_event_start[2].split(' ');
    parts_event_start[2] = parts_event_start[5][0];
    parts_event_start[6] = parts_event_start[5][1].split(':');
    parts_event_start[3] = parts_event_start[6][0];
    parts_event_start[4] = parts_event_start[6][1];

    let parts_event_end = this.event.event_end_temp.split('/');
    parts_event_end[5] = parts_event_end[2].split(' ');
    parts_event_end[2] = parts_event_end[5][0];
    parts_event_end[6] = parts_event_end[5][1].split(':');
    parts_event_end[3] = parts_event_end[6][0];
    parts_event_end[4] = parts_event_end[6][1];   

    this.event.event_start = parts_event_start[1]+"/"+parts_event_start[0]+"/"+parts_event_start[2]+" "+parts_event_start[3]+":"+parts_event_start[4];
    this.event.event_end = parts_event_end[1]+"/"+parts_event_end[0]+"/"+parts_event_end[2]+" "+parts_event_end[3]+":"+parts_event_end[4];

    console.log(this.event);
    this.message = null;
    this.error = null;
    if(this.idToEdit){
      this.editEvent();
    }else{
      this.newEvent();
    }
  }
}
