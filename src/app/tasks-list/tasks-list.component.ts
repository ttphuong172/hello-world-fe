import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {CompanyService} from "../../services/company.service";
import {ReportService} from "../../services/report.service";
import { ImpactService } from 'src/services/impact.service';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.css'],
    standalone: false
})

export class TasksListComponent implements OnInit{
  taskList: any;
  companyList: any;
  name: any;
  companyId: any;
  constructor(
    private taskService:TaskService,
    private companyService:CompanyService,
    private router:Router,
    private reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.taskService.getTask().subscribe(
      (data)=>{
        this.taskList = data
        this.companyService.getCompany().subscribe(
          (data)=>{
            this.companyList = data;
          }
        )
      }
    )
  }


  isVisible(id: any) {
    this.taskService.isVisible(id).subscribe(
      ()=>{
        // this.ngOnInit();
        this.searchTask()
      }
    )
  }

  exportReport() {

  }

  exportReportById(id:any) {
    this.taskService.exportReportById(id).subscribe(
      ()=>{
        this.reportService.downloadFileById().subscribe(
          blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "DailyReportById.txt";
            a.click();
            window.URL.revokeObjectURL(url);
            // alert("File downloaded, please open!")
          },
          error => console.error('Error downloading file', error)
        )
      }
    )
  }


  searchTask() {
    this.name = (this.name == undefined) ? '' : this.name;
    this.companyId = (this.companyId == undefined) ? '' : this.companyId;
    // console.log(this.name)
    // console.log(this.companyId)
    this.taskService.search(this.name, this.companyId).subscribe(
      (data)=>{
        this.taskList = data
      }
    )
  }
}
