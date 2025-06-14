import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  findAll(){
    return this.httpClient.get( this.apiURL+"/monitor")
  }

  isAlarm(id:any){
    return this.httpClient.get(this. apiURL + "/monitor/isalarm/" + id)
  }

  save(monitor: any){
    return this.httpClient.post(this. apiURL+ "/monitor",monitor, this.getHttpOptions());
  }

  delete(monitor: any){
    return this.httpClient.delete(this. apiURL+ "/monitor/" + monitor.id, this.getHttpOptions());
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/monitor/" + id);
  }
}
