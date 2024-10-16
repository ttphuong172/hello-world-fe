import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {ReportService} from "../../../services/report.service";

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css']
})
export class TaskReportComponent implements OnInit{
  taskListAIC: any;
  taskListEIC: any;
  taskListAPIC:any
  taskListCIC:any
  taskListLocal:any
  taskListWorkCustomer:any
  taskListWork:any
  taskListPrevious:any
  taskListOther:any
  taskListEnsolOperationalDisability: any;
  taskListEnsolLocalEvent: any;
  constructor(
    private taskService: TaskService,
    private reportService: ReportService
  ) {
  }
  ngOnInit(): void {
    this.taskService.findTaskByPositionId(1).subscribe(
      (data)=> {
        this.taskListAIC = data
        this.taskService.findTaskByPositionId(2).subscribe(
          (data)=>{
            this.taskListEIC = data
            this.taskService.findTaskByPositionId(3).subscribe(
              (data)=>{
                this.taskListAPIC = data
                this.taskService.findTaskByPositionId(4).subscribe(
                  (data)=>{
                    this.taskListCIC = data
                    this.taskService.findTaskByPositionId(5).subscribe(
                      (data)=>{
                        this.taskListLocal = data
                        this.taskService.findTaskByPositionId(6).subscribe(
                          (data)=>{
                            this.taskListWorkCustomer = data
                            this.taskService.findTaskByPositionId(7).subscribe(
                              (data)=>{
                                this.taskListWork = data
                                this.taskService.findTaskByPositionId(8).subscribe(
                                  (data)=>{
                                    this.taskListPrevious = data
                                    this.taskService.findTaskByPositionId(9).subscribe(
                                      (data)=> {
                                        this.taskListOther = data
                                        this.taskService.findTaskByPositionId(10).subscribe(
                                          (data)=>{
                                            this.taskListEnsolOperationalDisability = data
                                            this.taskService.findTaskByPositionId(11).subscribe(
                                              (data)=>{
                                                this.taskListEnsolLocalEvent = data
                                              }
                                            )
                                          }

                                        )
                                      }
                                    )
                                  }
                                )
                              }
                            )
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
  }
  isVisible(id: any) {
    this.taskService.isVisible(id).subscribe(
      ()=>{
        this.ngOnInit();
        // this.searchTask()
      }
    )
  }

  exportReport() {
    this.taskService.exportReport().subscribe(
      ()=>{
        this.reportService.downloadFile().subscribe(
          blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "DailyReport.txt";
            a.click();
            window.URL.revokeObjectURL(url);
            // alert("File downloaded, please open!")
          },
          error => console.error('Error downloading file', error)
        )
      }
    )
  }
}
