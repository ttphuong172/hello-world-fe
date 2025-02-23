import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiURL = environment.apiURL;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) { }

  findAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/accounts', httpOptions);
  }

  findById(username: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/accounts/' + username, httpOptions)
  }

  save(user: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.post(this.apiURL + '/accounts', user, httpOptions);
  }

  update(account: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.put(this.apiURL + '/accounts/' + account.username, account,httpOptions)
  }

  reset(username: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.get(this.apiURL + '/accounts/reset/' + username,httpOptions)
  }
  password(passwordDTO:any){
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.authService.getToken()
      })
    }
    return this.httpClient.put(this.apiURL+'/accounts/password',passwordDTO,httpOptions)
  }
}
