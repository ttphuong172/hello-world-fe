import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {SiteService} from "../../../services/site.service";

@Component({
  selector: 'app-sms-create-trunk',
  templateUrl: './sms-create-trunk.component.html',
  styleUrls: ['./sms-create-trunk.component.css']
})
export class SmsCreateTrunkComponent implements OnInit{
  // smsForm: FormGroup | any;
  // siteList: any;
  constructor(
    private siteService: SiteService,
  ) {
  }
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://viewer.diagrams.net/js/viewer-static.min.js';
    document.body.appendChild(script);

    // this.smsForm = new FormGroup({
    //
    // })
    // this.siteService.findSitesByCompany_Id(7).subscribe(
    //   (data) =>{
    //     this.siteList=data;
    //   }
    // )
  }

  loadSite() {

  }
}
