import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient,
    private authService:AuthService
  ) { }

  // Private method to get headers
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  findLinesBySite_Id(id: any){
    return this.httpClient.get(this.apiURL + "/lines/site/" + id)
  }

  save(line: any){
    return this.httpClient.post(this. apiURL+ "/lines",line,this.getHttpOptions());
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/lines/" + id);
  }

  update(line:any){
    return this.httpClient.put(this.apiURL + "/lines/" + line.id, line, this.getHttpOptions())
  }
}
