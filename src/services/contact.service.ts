import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  save(contact: any){
    return this.httpClient.post(this. apiURL+ "/contacts",contact);
  }
  findById(id:any){
    return this.httpClient.get(this.apiURL + "/contacts/" + id);
  }

  update(contact:any){
    return this.httpClient.put(this.apiURL + "/contacts/" + contact.id, contact)
  }
}
