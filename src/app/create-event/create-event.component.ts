import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  
  newEventModel: any = {};
  message;
  error;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    
  }
  
  newEvent(){
    this.message = null;
    this.error = null;
    this.eventService.createEvent(this.newEventModel).subscribe(result => {
        if (result === true) {
          this.message = "Succesful on create event!";
        }
    },error =>{
      this.error = error;
    });
  }

}
