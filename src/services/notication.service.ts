import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class NoticationService {
  private apiURL = environment.apiURL;

  constructor(
    private httpClient:HttpClient,
  ) { }
  findAll(){
    return this.httpClient.get( this.apiURL+"/notification")
  }
}
