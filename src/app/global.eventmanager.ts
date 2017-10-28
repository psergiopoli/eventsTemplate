import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public showNavBar: EventEmitter<any> = new EventEmitter();
    public hideNavBar: EventEmitter<any> = new EventEmitter();
    public addMessage: EventEmitter<any> = new EventEmitter();
    public removeMessage: EventEmitter<any> = new EventEmitter();
}