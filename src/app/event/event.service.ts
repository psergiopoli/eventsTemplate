import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { URLSearchParams, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { apibaseurl } from './../api.baseurl';
import { AuthenticationService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';

@Injectable()
export class EventService {
    user;
    actualPage = 0;

    constructor(private http: Http,private authenticationService: AuthenticationService,private userService: UserService) {
    }

    getEvents() {
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(apibaseurl+'/event/all?page='+this.actualPage+'&size=100', options).map((response: Response) => response.json());
    }

    getEventById(id) {
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(apibaseurl+'/event/'+id, options).map((response: Response) => response.json());
    }

    cancelEvent(idToCancel){
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        const options = new RequestOptions({headers: headers, url : apibaseurl+'/event/'+idToCancel, method: RequestMethod.Delete });
        return this.http.request(new Request(options)).map((response: Response) => {
            return true;
        }).catch(e => {
            return Observable.throw('Internal Error');
        });;
    }

    editEvent(event){
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers,url : apibaseurl+'/event',body:event,method: RequestMethod.Put });
        return this.http.request(new Request(options)).map((response: Response) => {
            if(response.status === 200){
                return true;
            }else{
                return false;
            }
        }).catch(e => {
            if (e.status === 409) {
                return Observable.throw('You have another event in this same time.');
            }else if(e.status === 400){
                return Observable.throw('Bad end or start of event.');
            }
            else{
                return Observable.throw('Internal Error');
            }
        });;
    }

    createEvent(event){
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers,url : apibaseurl+'/event',body:event,method: RequestMethod.Post });
        return this.http.request(new Request(options)).map((response: Response) => {
            if(response.status === 200){
                return true;
            }else{
                return false;
            }
        }).catch(e => {
            if (e.status === 409) {
                return Observable.throw('You have another event in this same time.');
            }else if(e.status === 400){
                return Observable.throw('Bad end or start of event.');
            }
            else{
                return Observable.throw('Internal Error');
            }
        });;
    }

    acceptInvitation(id){
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        const options = new RequestOptions({headers: headers, url : apibaseurl+'/invite/'+id,method: RequestMethod.Patch });
        return this.http.request(new Request(options)).map((response: Response) => {
            return response.json();
        }).catch(e => {
            if (e.status === 409) {
                return Observable.throw('You have another event in this same time or already accepted the event.');
            }else if(e.status === 400){
                return Observable.throw('Bad end or start of event.');
            }
            else{
                return Observable.throw('Internal Error');
            }
        });;
    }
    
    unaceptInvitation(id){
        const headers = new Headers({ 'Authorization': this.authenticationService.token });
        const options = new RequestOptions({headers: headers, url : apibaseurl+'/invite/'+id,method: RequestMethod.Delete });
        return this.http.request(new Request(options)).map((response: Response) => {
            return response.json();
        }).catch(e => {
            if(e.status === 400){
                return Observable.throw('Bad end or start of event.');
            }
            else{
                return Observable.throw('Internal Error');
            }
        });;
    }
}