import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company.service";
import {FormControl, FormGroup} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit{
  companyList: any
  siteForm: FormGroup | any;
  site:any

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private siteService: SiteService,
    private router: Router
  ) {
  }
  ngOnInit(): void {

    this.siteForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      gmt: new FormControl(''),
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
        this.siteForm.controls['gmt'].setValue(this.site.gmt)
        this.siteForm.controls['configure'].setValue(this.site.configure)
        this.siteForm.controls['configureKr'].setValue(this.site.configureKr)
        this.siteForm.controls['company'].setValue(this.site.company)
        this.siteForm.controls['ric'].setValue(this.site.ric)
      }
    )

    this.companyService.getCompany().subscribe(
      (data)=>{
        this.companyList = data;
      }
    )
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  cancel() {
    this.router.navigateByUrl('/site/company/' + this.site.company.id)
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
}
