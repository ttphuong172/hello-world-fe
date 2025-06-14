import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
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

  save(contact: any){
    return this.httpClient.post(this. apiURL+ "/contacts",contact, this.getHttpOptions());
  }
  findById(id:any){
    return this.httpClient.get(this.apiURL + "/contacts/" + id);
  }

  update(contact:any){
    return this.httpClient.put(this.apiURL + "/contacts/" + contact.id, contact,this.getHttpOptions())
  }

  delete(contact:any){
    return this.httpClient.delete(this.apiURL + "/contacts/" + contact.id, this.getHttpOptions())
  }
}
