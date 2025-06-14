import {Component, OnInit} from '@angular/core';
import {MonitoringService} from "../../../services/monitoring.service";
import {ContactDeleteComponent} from "../../contact/contact-delete/contact-delete.component";
import {MonitoringDeleteComponent} from "../monitoring-delete/monitoring-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit {
  monitoringList: any;
  timeoutId: any;

  constructor(
    private monitoringService: MonitoringService,
    private matDialog:MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.monitoringService.findAll().subscribe(
      (data) => {
        this.monitoringList = data
        // console.log(this.monitoringList)
      }
    )
    this.runAtFourTeenSecond()
  }

  isAlarm(id: any) {
    this.monitoringService.isAlarm(id).subscribe(
        () => {
          this.monitoringService.findAll().subscribe(
            (data) => {
              this.monitoringList = data
            }
          )
        }
    )

  }

  runAtFourTeenSecond() {
    const now = new Date();
    // Tính số mili giây còn lại để đến giây thứ 4 của phút tiếp theo
    const millisecondsUntilNextFourTeenSecond = (60 - now.getSeconds()) * 1000 + 14000 - now.getMilliseconds();

    // Sử dụng setTimeout để chạy hàm sau thời gian tính toán
    this.timeoutId = setTimeout(() => {
      // console.log("This runs at the 4th second of the next minute");
      this.monitoringService.findAll().subscribe(
        (data)=>{
          this.monitoringList = data
          // console.log("EFG")
          // console.log(this.monitoringList)
          // let monitoringDownList:any[] = [];
          // for (let i = 0; i < this.monitoringList.length; i ++){
          //   if (this.monitoringList[i].isUp == false){
          //     // this.fetchAndPlayAudioAlarm()
          //     // break
          //     monitoringDownList.push(this.monitoringList[i])
          //   }
          // }
          // // console.log(monitoringDownList)
          // for (let j = 0; j < monitoringDownList.length; j++){
          //   if (monitoringDownList[j].isAlarm == true){
          //     this.fetchAndPlayAudioAlarm();
          //     break
          //   }
          // }
        }
      )

      // Sau khi thực hiện, gọi lại hàm để setTimeout cho phút tiếp theo
      this.runAtFourTeenSecond();
    }, millisecondsUntilNextFourTeenSecond);
  }

  // delete(monitoring: any) {
  //   this.monitoringService.delete(monitoring).subscribe(
  //     () => {
  //       this.ngOnInit()
  //     }
  //   )
  // }


  openDialogDelete(monitoring: any) {
    const dialogRefDelete = this.matDialog.open(MonitoringDeleteComponent, {
      width: '600px',
      data: monitoring,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
      ()=>{
        this.ngOnInit()
      }
    )
  }
}


