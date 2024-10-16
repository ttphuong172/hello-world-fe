import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(this.apiURL+ "/wikis")
  }
  findById(id:any){
    return this.httpClient.get(this.apiURL + "/wikis/" + id);
  }
  searchNews(keyword: string){
    return this.httpClient.get(this.apiURL+ "/wikis/search?keyword=" + keyword);
  }
}
