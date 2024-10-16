import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  getEvent(){
    return this.httpClient.get( this.apiURL+"/events")
  }
}
