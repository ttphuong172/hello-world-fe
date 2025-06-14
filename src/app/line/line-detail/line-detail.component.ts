import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {TimeService} from "../../../services/time.service";
import {TknDeleteComponent} from "../../tkn/tkn-delete/tkn-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {LineDeleteComponent} from "../line-delete/line-delete.component";

@Component({
    selector: 'app-line-detail',
    templateUrl: './line-detail.component.html',
    styleUrls: ['./line-detail.component.css'],
    standalone: false
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
    private matDialog:MatDialog,
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

    openDialogDelete(line: any) {
      const dialogRefDelete = this.matDialog.open(LineDeleteComponent, {
        width: '600px',
        data: line,
        disableClose: true
      })
      dialogRefDelete.afterClosed().subscribe(
        ()=>{
          this.ngOnInit()
        }
      )
    }
}
