import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private apiURL = environment.apiURL;

  constructor(
    private httpClient:HttpClient
  ) { }
  getzonidList(){
    return this.httpClient.get(this.apiURL + "/time")
  }
  getGmt(zoneId: any){
    // http://localhost:8080/api/time/timezone?zoneId=Asia/Jakarta
    return this.httpClient.get<string>(this.apiURL + "/time/timezone?zoneId=" + zoneId, { responseType: 'text' as 'json' })
  }

  getTime(zoneId: any){
    // http://localhost:8080/api/time/timezone?zoneId=Asia/Jakarta
    return this.httpClient.get<string>(this.apiURL + "/time/time?zoneId=" + zoneId, { responseType: 'text' as 'json' })
  }
}
