import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {TimeService} from "../../../services/time.service";

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css']
})
export class LineDetailComponent implements OnInit{
  site: any;
  gmtValue: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private lineService:LineService,
    private router:Router,
    private timeService:TimeService,
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(id).subscribe(
      (data)=>{
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
    this.router.navigateByUrl("site/company/lines/" + this.site.company.id)
  }
}
