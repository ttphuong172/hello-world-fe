import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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

  save(comment: any){
    return this.httpClient.post(this. apiURL+ "/comment",comment, this.getHttpOptions());
  }


}
