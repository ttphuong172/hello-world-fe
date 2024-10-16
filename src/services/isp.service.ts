import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IspService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get( this.apiURL+"/isps")
  }
  findByName(name:any){
    return this.httpClient.get(this.apiURL + "/isps/" + name);
  }
}
