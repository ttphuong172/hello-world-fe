import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {LineService} from "../../../services/line.service";
import {LineDeleteComponent} from "../../line/line-delete/line-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ContactDeleteComponent} from "../../contact/contact-delete/contact-delete.component";

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
        // console.log(this.site)
      }
    )
  }

  return() {
    this.router.navigateByUrl("/site/company/" + this.site.company.id)
  }


  openDialogDeleteLine(line: any) {
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

  openDialogDeleteContact(contact: any) {
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
