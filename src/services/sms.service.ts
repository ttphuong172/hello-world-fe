import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
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

  generatorSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms",sms, this.getHttpOptions());
  }

  generatorInnotekSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/innotek",sms, this.getHttpOptions());
  }
  generatorEnsolSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/ensol",sms, this.getHttpOptions());
  }
  generatorChemSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/chem",sms, this.getHttpOptions());
  }

}
