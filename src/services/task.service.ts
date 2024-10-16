import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  getTask(){
    return this.httpClient.get(this.apiURL + "/tasks")
  }
  save(task: any){
    return this.httpClient.post(this.apiURL + "/tasks",task);
  }
  findById(id:any){
    return this.httpClient.get(this. apiURL + "/tasks/" + id);
  }

  update(task:any){
    return this.httpClient.put(this. apiURL + "/tasks/" + task.id, task)
  }

  isVisible(id:any){
    return this.httpClient.get(this. apiURL + "/tasks/isvisible/" + id)
  }
  exportReport(){
    return this.httpClient.get(this. apiURL + "/tasks/report")
  }

  exportReportById(id:any){
    return this.httpClient.get(this. apiURL + "/tasks/report/" + id)
  }

  search(name:any, companyId:any){
    return this.httpClient.get(this.apiURL+ '/tasks/search?name='+ name + '&companyId='+ companyId );
  }

  findTaskByPositionId(id: any){
    return this.httpClient.get(this. apiURL + "/tasks/position/" + id)
  }

}
