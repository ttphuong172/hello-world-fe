import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiURL = environment.apiURL;
  constructor(
    private httpClient:HttpClient
  ) { }
  listFiles(){
    return this.httpClient.get(this.apiURL + "/reports/list")
  }

  downloadFile(){
    return this.httpClient.get(this.apiURL + "/reports/download/DailyReport.txt", { responseType: 'blob' });
  }
  downloadFileById(){
    return this.httpClient.get(this.apiURL + "/reports/download/DailyReportById.txt", { responseType: 'blob' });
  }


}
