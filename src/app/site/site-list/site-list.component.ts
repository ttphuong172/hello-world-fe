import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../../services/site.service";
import {CompanyService} from "../../../services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeService} from "../../../services/time.service";

@Component({
    selector: 'app-site-list',
    templateUrl: './site-list.component.html',
    styleUrls: ['./site-list.component.css'],
    standalone: false
})
export class SiteListComponent implements OnInit {
  siteList: any
  companyList: any
  companyName: any
  name: any;
  companyId: any;
  id: any;
  company: any;
  selectedItem: string = '';

  constructor(
    private siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
    private timeService: TimeService
  ) {
  }

  ngOnInit(): void {
    // this.siteService.findAllByOrderByName().subscribe(
    //   (data)=>{
    //     this.siteList = data
    //     this.companyService.getCompany().subscribe(
    //       (data)=>{
    //         this.companyList = data;
    //       }
    //     )
    //   }
    // )

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findSitesByCompany_Id(this.id).subscribe(
      (data) => {
        this.siteList = data

        for (let i = 0; i < this.siteList.length; i++){
          this.timeService.getGmt(this.siteList[i].zoneId).subscribe(
            (data) =>{
              this.siteList[i].gmt = data
            }
          )
        }

        this.companyService.getCompany().subscribe(
          (data) => {
            this.companyList = data;
            this.companyService.findById(this.id).subscribe(
              (data) => {
                this.company = data
                this.selectedItem = this.company.name

                // console.log(this.selectedItem)

                this.companyName = this.company.name.split(".")[1].toLocaleUpperCase()
              }
            )
          }
        )
      }
    )
  }

  searchSite() {
    this.name = (this.name == undefined) ? '' : this.name;
    this.companyId = (this.companyId == undefined) ? '' : this.companyId;
    this.siteService.search(this.name, this.id).subscribe(
      (data) => {
        this.siteList = data

        for (let i = 0; i < this.siteList.length; i++){
          this.timeService.getGmt(this.siteList[i].zoneId).subscribe(
            (data) =>{
              this.siteList[i].gmt = data
            }
          )
        }

      }
    )
  }


  load1() {
    this.router.navigateByUrl("#/site/company/1")
  }

  load2() {
    this.router.navigateByUrl("#/site/company/2")
  }

  load3() {
    this.router.navigateByUrl("#/site/company/3")
  }

  load4() {
    this.router.navigateByUrl("#/site/company/4")
  }

  load5() {
    this.router.navigateByUrl("#/site/company/5")
  }

  load6() {
    this.router.navigateByUrl("#/site/company/6")
  }

  // load7() {
  //   this.router.navigateByUrl("#/site/company/7")
  // }
}
