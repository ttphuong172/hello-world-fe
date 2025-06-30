import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {CountryService} from "../../../services/country.service";

@Component({
    selector: 'app-contact-add',
    templateUrl: './contact-add.component.html',
    styleUrls: ['./contact-add.component.css'],
    standalone: false
})
export class ContactAddComponent implements OnInit{
  siteId: any;
  site: any;
  contactForm: FormGroup |any;
  countryList: any;

  constructor(
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private contactService:ContactService,
    private countryService:CountryService
  ) {
  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      countryCodeOfficePhoneNumber: new FormControl(''),
      officePhoneNumber: new FormControl(''),
      countryCodeMobilePhoneNumber: new FormControl(''),
      mobilePhoneNumber: new FormControl(''),
      site: new FormControl(''),
      role: new FormControl(''),
      note: new FormControl(''),
    })

    this.siteId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(this.siteId).subscribe(
      (data)=>{
        this.site = data
        this.contactForm.controls['site'].setValue(this.site)
        this.countryService.findAll().subscribe(
          (data)=>{
            this.countryList = data
          }
        )
      }
    )
  }

  cancel() {
    this.router.navigateByUrl("site/detail/" + this.siteId)
  }

  save() {
    this.contactService.save(this.contactForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("site/detail/" + this.siteId)
      }
    )
  }
}
