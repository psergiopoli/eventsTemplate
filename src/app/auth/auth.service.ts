import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { apibaseurl } from './../api.baseurl';

 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        let authParams = new URLSearchParams();
        authParams.append('username', username);
        authParams.append('password', password);
        return this.http.post(apibaseurl+'/login', authParams)
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            }).catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Login or password incorrect');
                }else{
                    return Observable.throw('Internal Error');
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    signup(username: string, password: string ): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({ 'email': username, 'password': password });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(apibaseurl+'/sign-in', body, options)
            .map((response: Response) => {
                if(response.status === 201){
                    return true;
                }else{
                    return false;
                }                
            }).catch(e => {
                return Observable.throw('Internal Error');
            });
    }
}