import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiURL = environment.apiURL;

  constructor(
    private httpClient:HttpClient
  ) { }
  generatorSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms",sms);
  }

  generatorInnotekSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/innotek",sms);
  }
  generatorEnsolSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/ensol",sms);
  }
  generatorChemSms(sms:any){
    return this.httpClient.post(this.apiURL + "/sms/chem",sms);
  }

}
