import { Injectable } from '@angular/core';
import {environment} from "../enviroments/enviroments";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }

  findLinesBySite_Id(id: any){
    return this.httpClient.get(this.apiURL + "/lines/site/" + id)
  }

  save(line: any){
    return this.httpClient.post(this. apiURL+ "/lines",line);
  }

  findById(id:any){
    return this.httpClient.get(this.apiURL + "/lines/" + id);
  }

  update(line:any){
    return this.httpClient.put(this.apiURL + "/lines/" + line.id, line)
  }
}
