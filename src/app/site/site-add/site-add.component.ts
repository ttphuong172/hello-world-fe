import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(
    private companyService: CompanyService,
    private siteService: SiteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gmt: new FormControl('', [Validators.required]),
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

}

