import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {CompanyService} from "../../../services/company.service";
import {TimeService} from "../../../services/time.service";

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit{
  private id: any;
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
    private activatedRoute: ActivatedRoute,
    private timeService: TimeService
  ) {
  }
  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findSitesByCompany_Id(this.id).subscribe(
      (data) => {
        this.siteList = data;
        for (let i = 0; i < this.siteList.length; i++){
          // console.log(this.siteList[i].zoneId)
          this.timeService.getGmt(this.siteList[i].zoneId).subscribe(
            (data) =>{
              this.siteList[i].gmt = data
            }
          )
        }
        this.companyName = this.siteList[0].company.name.split(".")[1].toLocaleUpperCase();
        this.selectedItem = this.siteList[0].company.name

      }
    )
  }

  load1() {
    this.router.navigateByUrl("#/site/company/lines/1")
  }

  load2() {
    this.router.navigateByUrl("#/site/company/lines/2")
  }

  load3() {
    this.router.navigateByUrl("#/site/company/lines/3")
  }

  load4() {
    this.router.navigateByUrl("#/site/company/lines/4")
  }

  load5() {
    this.router.navigateByUrl("#/site/company/lines/5")
  }

  load6() {
    this.router.navigateByUrl("#/site/company/lines/6")
  }

  load7() {
    this.router.navigateByUrl("#/site/company/lines/7")
  }

  searchSite() {
    this.name = (this.name == undefined) ? '' : this.name;
    this.companyId = (this.companyId == undefined) ? '' : this.companyId;
    this.siteService.search(this.name, this.id).subscribe(
      (data) => {
        this.siteList = data
      }
    )
  }



}
