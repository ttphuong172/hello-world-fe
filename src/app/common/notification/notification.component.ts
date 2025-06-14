import {Component, OnInit} from '@angular/core';
import {NoticationService} from "../../../services/notication.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  notificationList:any;
  selectedItem: any;
  constructor(
    private noticationService:NoticationService
  ) {
  }
  ngOnInit(): void {
    this.noticationService.findAll().subscribe(
      (data)=>{
        this.notificationList = data;
        // console.log(this.notificationList)
      }
    )
  }

}
