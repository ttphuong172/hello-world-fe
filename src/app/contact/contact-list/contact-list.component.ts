import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private id: any
  siteList: any;
  companyName: any;
  private site: any;
  name: any;
  companyId: any;
  selectedItem: string = '';

  constructor(
    private router: Router,
    private siteService: SiteService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findSitesByCompany_Id(this.id).subscribe(
      (data) => {
        this.siteList = data;
        this.companyName = this.siteList[0].company.name.split(".")[1].toLocaleUpperCase();
        this.selectedItem = this.siteList[0].company.name
      }
    )
  }


  load1() {
    this.router.navigateByUrl("#/site/company/contacts/1")
  }

  load2() {
    this.router.navigateByUrl("#/site/company/contacts/2")
  }

  load3() {
    this.router.navigateByUrl("#/site/company/contacts/3")
  }

  load4() {
    this.router.navigateByUrl("#/site/company/contacts/4")
  }

  load5() {
    this.router.navigateByUrl("#/site/company/contacts/5")
  }

  load6() {
    this.router.navigateByUrl("#/site/company/contacts/6")
  }

  copyEmail(id: any) {
    let textToCopy="";
    this.siteService.findById(id).subscribe(
      (data) => {
        this.site = data

        for (let i = 0; i < this.site.contactList.length; i++) {
          textToCopy += this.site.contactList[i].email + ";"
        }
        navigator.clipboard.writeText(textToCopy);
      }
    )

  }

  searchSite() {
    this.name = (this.name == undefined) ? '' : this.name;
    this.companyId = (this.companyId == undefined) ? '' : this.companyId;
    this.siteService.search(this.name, this.id).subscribe(
      (data) => {
        this.siteList = data
        // console.log(this.siteList)
      }
    )
  }
}
