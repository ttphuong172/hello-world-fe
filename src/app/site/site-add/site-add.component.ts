import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeService} from "../../../services/time.service";

@Component({
  selector: 'app-site-add',
  templateUrl: './site-add.component.html',
  styleUrls: ['./site-add.component.css']
})
export class SiteAddComponent implements OnInit {
  companyList: any
  company: any
  siteForm: FormGroup | any;
  id: any;
  zoneIdList: any;
  gmtValue: any;

  constructor(
    private companyService: CompanyService,
    private siteService: SiteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private timeService: TimeService
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nation: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      gmt: new FormControl(''),
      zoneId: new FormControl('', [Validators.required]),
      valueFilter: new FormControl(''),
      configure: new FormControl(''),
      configureKr: new FormControl(''),
      company: new FormControl('', [Validators.required]),
      ric: new FormControl(''),

    })

    this.siteForm.get('ric')?.disable()

    this.companyService.getCompany().subscribe(
      (data) => {
        this.companyList = data;
        this.companyService.findById(this.id).subscribe(
          (data) => {
            this.company = data
            this.siteForm.controls['company'].setValue(this.company)
            this.loadCompany()
          }
        )
      }
    )

    this.timeService.getzonidList().subscribe(
      (data)=>{
        this.zoneIdList = data
      }
    )

  }

  cancel() {
    this.router.navigateByUrl('/site/company/' + this.id)
  }

  save() {
    this.siteService.save(this.siteForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/site/company/' + this.id)
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

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  loadGMT() {
    this.timeService.getGmt(this.siteForm.get('zoneId').value).subscribe(
      (data)=>{
        this.gmtValue = data
        this.siteForm.controls['gmt'].setValue(this.gmtValue)
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

