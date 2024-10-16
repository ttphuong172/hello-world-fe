import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit{
  siteId: any;
  site: any;
  contactForm: FormGroup |any;

  constructor(
    private siteService:SiteService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private contactService:ContactService,
  ) {
  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      office: new FormControl(''),
      phone: new FormControl(''),
      site: new FormControl(''),
      role: new FormControl(''),
      note: new FormControl(''),
    })

    this.siteId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.siteService.findById(this.siteId).subscribe(
      (data)=>{
        this.site = data
        this.contactForm.controls['site'].setValue(this.site)
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
