import { Component, OnInit } from '@angular/core';
import { GlobalEventsManager } from '../global.eventmanager';

@Component({
  selector: 'app-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.css']
})
export class GlobalMessageComponent implements OnInit {

  message: any = {};

  constructor(private globalEventsManager: GlobalEventsManager) { 
    this.addMessageWatcher();
    this.cleanMessageWatcher();
  }

  cleanMessageWatcher(){
    this.globalEventsManager.removeMessage.subscribe((mode: any) => {
      this.message = null;
    });
  }

  addMessageWatcher(){
    this.globalEventsManager.addMessage.subscribe((message: any) => {
      this.message = {text:message.text,class:"alert alert-"+message.type};
      if(message.timeout != null && message.timeout > 0){
        setTimeout(()=>{ this.message = null }, message.timeout*1000)
      }
    });
  }

  ngOnInit() {
  }

}
