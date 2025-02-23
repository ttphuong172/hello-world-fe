import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
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

  findSitesByCompany_Id(id: any){
    return this.httpClient.get(this.apiURL + "/sites/company/" + id)
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/sites/" + id);
  }

  findAllByOrderByName(){
    return this.httpClient.get(this.apiURL + "/sites/dto")
  }

  save(site: any){
    return this.httpClient.post(this. apiURL+ "/sites",site, this.getHttpOptions());
  }

  update(site:any){
    return this.httpClient.put(this.apiURL + "/sites/" + site.id, site, this.getHttpOptions())
  }

  search(name:any, companyId:any){
    return this.httpClient.get(this.apiURL+ '/sites/search?name='+ name + '&companyId='+ companyId );
  }
}
