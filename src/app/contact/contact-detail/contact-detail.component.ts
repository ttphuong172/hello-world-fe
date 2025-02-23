import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeService} from "../../../services/time.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  site: any;
  gmtValue: any;

  constructor(
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private timeService: TimeService
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(id).subscribe(
      (data)=> {
        this.site = data
        this.timeService.getGmt(this.site.zoneId).subscribe(
          (data)=>{
            this.gmtValue = data;
          }
        )
      }
    )
  }

  return() {
    this.router.navigateByUrl("/site/company/contacts/" + this.site.company.id)
  }
}
