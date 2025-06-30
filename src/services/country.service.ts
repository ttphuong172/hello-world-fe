import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiURL = environment.apiURL;

  constructor(
    private httpClient:HttpClient,
  ) { }
  findAll(){
    return this.httpClient.get(this.apiURL + "/countries/");
  }
}
