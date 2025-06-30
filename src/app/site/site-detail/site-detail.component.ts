import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {parsePhoneNumber} from "libphonenumber-js";
import {LineDeleteComponent} from "../../line/line-delete/line-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-site-detail',
    templateUrl: './site-detail.component.html',
    styleUrls: ['./site-detail.component.css'],
    standalone: false
})


export class SiteDetailComponent implements OnInit{
  site:any


  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private lineService:LineService,
    private router:Router,
    private matDialog:MatDialog,
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(id).subscribe(
      (data)=>{
        this.site = data
        console.log(this.site)
        for (let i = 0; i < this.site.contactList.length; i ++){
          const contact = this.site.contactList[i];
          if (contact.officePhoneNumber !== null && typeof contact.officePhoneNumber === 'string' && contact.officePhoneNumber.trim() !== '') {
            this.site.contactList[i].officePhoneNumber = (parsePhoneNumber(this.site.contactList[i].officePhoneNumber).formatInternational());
          }

          if (contact.mobilePhoneNumber !== null && typeof contact.mobilePhoneNumber === 'string' && contact.mobilePhoneNumber.trim() !== '') {
            this.site.contactList[i].mobilePhoneNumber = (parsePhoneNumber(this.site.contactList[i].mobilePhoneNumber).formatInternational());
          }
        }

      }
    )
  }

  return() {
    this.router.navigateByUrl("/site/company/" + this.site.company.id)
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
