import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService: AuthService,
  ) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  findAll(){
    return this.httpClient.get( this.apiURL+"/ping")
  }

  save(ping: any){
    return this.httpClient.post(this. apiURL+ "/ping",ping, this.getHttpOptions());
  }

  delete(ping: any){
    return this.httpClient.delete(this. apiURL+ "/ping/" + ping.id, this.getHttpOptions());
  }

}
