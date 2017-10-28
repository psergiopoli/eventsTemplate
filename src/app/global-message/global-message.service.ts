import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalEventsManager } from '../global.eventmanager';
 
@Injectable()
export class GlobalMessageService {
    
    constructor(private globalEventsManager: GlobalEventsManager) {
    }

    addMessage(message,type,timeoutInSeconds){
        var messageObject = {text:message,type:type,timeout:timeoutInSeconds};
        this.globalEventsManager.addMessage.emit(messageObject);
    }

    removeMessage(){
        this.globalEventsManager.removeMessage.emit(true);
    }

}