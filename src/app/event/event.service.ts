import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { apibaseurl } from './../api.baseurl';
import { AuthenticationService } from '../auth/auth.service';
 
@Injectable()
export class EventService {

    actualPage = 0;

    constructor(private http: Http,private authenticationService: AuthenticationService) {
    }
 
    getEvents() {
        let headers = new Headers({ 'Authorization': this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(apibaseurl+'/event/user?page='+this.actualPage+'&size=20', options).map((response: Response) => response.json());
    }
}