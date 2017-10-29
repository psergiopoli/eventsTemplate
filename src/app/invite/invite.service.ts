import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { URLSearchParams, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { apibaseurl } from './../api.baseurl';
import { AuthenticationService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
 
@Injectable()
export class InviteService {
    user;

    constructor(private http: Http,private authenticationService: AuthenticationService,private userService: UserService) {
    }

    findInvite(id){
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(apibaseurl+'/invite/'+id, options).map((response: Response) => {
            response.json();
        });
    }

    getAllUsersNotInvited(eventId){
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(apibaseurl+'/user/not/invited/'+eventId, options).map((response: Response) => response.json());
    }

    sendInvite(userId,eventId){
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers,method: RequestMethod.Put });
        return this.http.request(apibaseurl+'/invite?event='+eventId+'&user='+userId,options).map((response: Response) => {
            if(response.status === 200){
                return true;
            }else{
                return false;
            }
        }).catch(e => {
            if (e.status === 409) {
                return Observable.throw('You already have sended the invite.');
            }else{
                return Observable.throw('Internal error.');
            }
        });
    }

    desinvite(userId,eventId){

    }
}