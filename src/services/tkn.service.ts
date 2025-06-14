import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TknService {
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

  findAll(){
    return this.httpClient.get(this.apiURL+ "/tkn")
  }

  findAllUsername(username: any){
    return this.httpClient.get(this.apiURL+ "/tkn/findall/" + username)
  }

  save(tkn: any){
    return this.httpClient.post(this. apiURL+ "/tkn",tkn, this.getHttpOptions());
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/tkn/" + id);
  }

  searchByKeyword(username: any,keyword: string){
    return this.httpClient.get(this.apiURL+ "/tkn/search/" + username + "?keyword=" + keyword);
    // http://localhost:8080/api/tkn/search/phuongtt58?keyword=hai
  }

  isVisible(id:any){
    return this.httpClient.get(this. apiURL + "/tkn/isvisible/" + id)
  }
}
