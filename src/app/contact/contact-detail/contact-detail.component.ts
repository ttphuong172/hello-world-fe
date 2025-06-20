import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeService} from "../../../services/time.service";
import {LineDeleteComponent} from "../../line/line-delete/line-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ContactDeleteComponent} from "../contact-delete/contact-delete.component";

@Component({
    selector: 'app-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls: ['./contact-detail.component.css'],
    standalone: false
})
export class ContactDetailComponent implements OnInit {
  site: any;
  gmtValue: any;

  constructor(
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private timeService: TimeService,
    private matDialog:MatDialog,
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

  openDialogDelete(contact: any) {
    const dialogRefDelete = this.matDialog.open(ContactDeleteComponent, {
      width: '600px',
      data: contact,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
      ()=>{
        this.ngOnInit()
      }
    )
  }
}
