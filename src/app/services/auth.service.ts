import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { J } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  postCredential(credential){
    const url = 'http://localhost:3000/authenticate'
    let body = JSON.stringify(credential)
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': token
      })
    })
  }
  setSession(authResult){ 
    const expiresAt = moment().add(authResult.expiresAt,'second');
    const photoUrl = authResult['user'].photoUrl;
    const { statut, fonction } = authResult;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('user', JSON.stringify({photoUrl, statut, fonction}));
  }
  
  getUser(){
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }
  getToken(){
    return localStorage.getItem('token')
  }

  getExpiration() {
    const expiration = localStorage.getItem("expiresAt");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  removeSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('user');
  }
  
  isLoggedIn(){
    console.log(this.getExpiration())
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut(){
    return !this.isLoggedIn();
  }
 
}










