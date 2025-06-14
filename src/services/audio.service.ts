import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
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

  getAudio(){
    return this.httpClient.get(this.apiURL + "/ping/audio" , { responseType: 'blob' });
  }

  getAudioAlarm(){
    return this.httpClient.get(this.apiURL + "/ping/audioalarm" , { responseType: 'blob' });
  }
}
