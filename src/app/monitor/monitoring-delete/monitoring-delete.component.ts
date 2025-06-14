import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";
import {MonitoringService} from "../../../services/monitoring.service";

@Component({
  selector: 'app-monitoring-delete',
  templateUrl: './monitoring-delete.component.html',
  styleUrls: ['./monitoring-delete.component.css']
})
export class MonitoringDeleteComponent implements OnInit{
  monitoring: any;
  constructor(
    public dialogRefDelete: MatDialogRef<MonitoringDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private monitoringService:MonitoringService
  ) {
  }
  ngOnInit(): void {
    this.monitoring = this.data
  }

  delete(monitoring: any) {
    this.monitoringService.delete(monitoring).subscribe(
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }


}
