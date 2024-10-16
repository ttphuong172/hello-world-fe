import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  getType(){
    return this.httpClient.get(this.apiURL + "/types")
  }
}
