import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  findTypeByCompany_Id(id: any){
    return this.httpClient.get(this.apiURL + "/positions/" + id)
  }
}
