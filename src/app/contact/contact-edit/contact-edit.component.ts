import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../../../services/contact.service";

@Component({
    selector: 'app-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css'],
    standalone: false
})
export class ContactEditComponent implements OnInit{
  contactForm: FormGroup |any;
  contactId: any;
  contact: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router:Router,
  ) {
  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      office: new FormControl(''),
      phone: new FormControl(''),
      site: new FormControl(''),
      role: new FormControl(''),
      note: new FormControl(''),
    })

    this.contactId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.contactService.findById(this.contactId).subscribe(
      (data)=>{
        this.contact = data;
        this.contactForm.controls['id'].setValue(this.contact.id)
        this.contactForm.controls['name'].setValue(this.contact.name)
        this.contactForm.controls['email'].setValue(this.contact.email)
        this.contactForm.controls['office'].setValue(this.contact.office)
        this.contactForm.controls['phone'].setValue(this.contact.phone)
        this.contactForm.controls['site'].setValue(this.contact.site)
        this.contactForm.controls['role'].setValue(this.contact.role)
        this.contactForm.controls['note'].setValue(this.contact.note)
      }
    )

  }

  cancel() {
    this.router.navigateByUrl('/contact/detail/' + this.contact.site.id)
  }

  update() {
    this.contactService.update(this.contactForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/contact/detail/' + this.contact.site.id)
      }

    )
  }
}
