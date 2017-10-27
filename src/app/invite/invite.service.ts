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
            console.log(response);
            response.json();
        });
      }
}