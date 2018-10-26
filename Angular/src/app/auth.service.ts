import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import { JwtHelperService } from '@auth0/angular-jwt';

import {default as decode} from 'jwt-decode';

import { environment } from './../environments/environment';

import * as moment from "moment";

interface User {
    token: string,
    firstName: string,
    lastName: string,
    email: string,
}

@Injectable()
export class AuthService {
    private apiBaseUrl = environment.apiBaseUrl;
	

    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) {
        return this.http.post<User>(this.apiBaseUrl+'passports/token', {email, password})
            .do(this.setSession) 
            .shareReplay();
    }
    private setSession(authResult) {
 	    // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.token);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        // localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {

        // return moment().isBefore(this.getExpiration());

    	const helper = new JwtHelperService();
    	const token = localStorage.getItem("id_token");
        // const jwt = JSON.parse(token);
    	return !helper.isTokenExpired(token);
    }

    public isAdmin() {
    	if (this.isLoggedIn()) {
	    	const helper = new JwtHelperService();
	    	const token = localStorage.getItem("id_token");
	        // const jwt = JSON.parse(token);
	        const decodedJwt = helper.decodeToken(token);
	        return decodedJwt.id === 'admin@quickkyc';

    	} 

    	return false;
        
    }

    public WHOAMI() {
    	if (this.isLoggedIn()) {
	    	const helper = new JwtHelperService();
	    	const token = localStorage.getItem("id_token");
	        // const jwt = JSON.parse(token);
	        const decodedJwt = helper.decodeToken(token);
	        alert("Ahoy!! " + decodedJwt.id);
	        return 0;

    	} 
    	alert("Opss worng Happned!!");        
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    } 
}