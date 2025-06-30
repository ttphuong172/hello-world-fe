import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company.service";
import {FormControl, FormGroup} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeService} from "../../../services/time.service";

@Component({
    selector: 'app-site-edit',
    templateUrl: './site-edit.component.html',
    styleUrls: ['./site-edit.component.css'],
    standalone: false
})
export class SiteEditComponent implements OnInit{
  companyList: any
  siteForm: FormGroup | any;
  site:any
  zoneIdList: any;
  gmtValue: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private siteService: SiteService,
    private timeService: TimeService,
    private router: Router
  ) {
  }
  ngOnInit(): void {

    this.siteForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      nation: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      // gmt: new FormControl(''),
      zoneId: new FormControl(''),
      valueFilter: new FormControl(''),
      configure: new FormControl(''),
      configureKr: new FormControl(''),
      company: new FormControl(''),
      ric: new FormControl(''),

    })

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.siteService.findById(id).subscribe(
      (data)=>{
        this.site = data
        this.siteForm.controls['id'].setValue(this.site.id)
        this.siteForm.controls['name'].setValue(this.site.name)
        this.siteForm.controls['nation'].setValue(this.site.nation)
        this.siteForm.controls['city'].setValue(this.site.city)
        this.siteForm.controls['address'].setValue(this.site.address)
        // this.siteForm.controls['gmt'].setValue(this.site.gmt)
        this.siteForm.controls['zoneId'].setValue(this.site.zoneId)
        this.siteForm.controls['configure'].setValue(this.site.configure)
        this.siteForm.controls['configureKr'].setValue(this.site.configureKr)
        this.siteForm.controls['company'].setValue(this.site.company)
        this.siteForm.controls['ric'].setValue(this.site.ric)
        this.timeService.getGmt(this.site.zoneId).subscribe(
          (data)=>{
            this.gmtValue = data
          }
        )
      }
    )

    this.companyService.getCompany().subscribe(
      (data)=>{
        this.companyList = data;
      }
    )
    this.timeService.getzonidList().subscribe(
      (data)=>{
        this.zoneIdList = data
      }
    )


  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  cancel() {
    this.router.navigateByUrl('/site/detail/' + this.site.id)
  }

  update() {
  this.siteService.update(this.siteForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/site/company/' + this.site.company.id)
      }

  )
  }

  loadCompany() {
    if (this.siteForm.get('company').value.name == 'I. LG Electronic') {
      this.siteForm.get('ric')?.enable()
    } else {
      this.siteForm.controls['ric'].setValue("")
      this.siteForm.get('ric')?.disable()
    }
  }

  loadGMT() {
    this.timeService.getGmt(this.siteForm.get('zoneId').value).subscribe(
      (data)=>{
        this.gmtValue = data
        // this.siteForm.controls['gmt'].setValue(this.gmtValue)
      }
    )
  }

  filterZoneId() {
    this.timeService.getzonidList().subscribe(
      (data)=>{
        this.zoneIdList = data
        let newZoneIdList = []
        let valueFilter = this.siteForm.get('valueFilter').value.toLowerCase()
        for (let i = 0; i < this.zoneIdList.length; i ++){
          if (this.zoneIdList[i].toLowerCase().includes(valueFilter)){
            newZoneIdList.push(this.zoneIdList[i])
          }
        }
        this.zoneIdList = newZoneIdList
      }
    )
  }
}
