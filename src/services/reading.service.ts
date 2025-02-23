import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
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

  save(reading: any){
    return this.httpClient.post(this. apiURL+ "/reading",reading, this.getHttpOptions());
  }
}
