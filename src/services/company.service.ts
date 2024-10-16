import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  getCompany(){
    return this.httpClient.get( this.apiURL+"/companys")
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/companys/" + id);
  }
}
