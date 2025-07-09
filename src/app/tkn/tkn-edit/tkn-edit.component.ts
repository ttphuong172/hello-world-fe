import {Component, OnInit} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import Quill from 'quill';
import {TkntypeService} from "../../../services/tkntype.service";
import {CompanyService} from "../../../services/company.service";
import {SiteService} from "../../../services/site.service";



@Component({
    selector: 'app-tkn-edit',
    templateUrl: './tkn-edit.component.html',
    styleUrls: ['./tkn-edit.component.css'],
    standalone: false
})
export class TknEditComponent implements OnInit{
  tkn:any
  content: any;
  tknForm: FormGroup | any;
  quill: any;
  tknTypeList: any;
  companyList: any;
  siteList: any;


  constructor(
    private tknService:TknService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private tkntypeService:TkntypeService,
    private companyService:CompanyService,
    private siteService:SiteService
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.tknForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl(''),
        tknType: new FormControl(''),
        company: new FormControl(''),
        site: new FormControl(''),
        summaryContent: new FormControl(''),
        content: new FormControl(''),
        creator: new FormControl('')
      })
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.tknService.findById(id).subscribe(
        (data) => {
          this.tkn = data;
          this.tknForm.controls['id'].setValue(this.tkn.id);
          this.tknForm.controls['title'].setValue(this.tkn.title);
          this.tknForm.controls['tknType'].setValue(this.tkn.tknType);
          this.tknForm.controls['company'].setValue(this.tkn.company);
          this.tknForm.controls['site'].setValue(this.tkn.site);
          this.tknForm.controls['summaryContent'].setValue(this.tkn.summaryContent);
          this.tknForm.controls['creator'].setValue(this.tkn.creator);

          // Initialize Quill
          this.quill = new Quill('#quill-editor', {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['link', 'image', 'video'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                ['clean']
              ]
            }
          });
          this.quill.clipboard.dangerouslyPasteHTML(this.tkn.content);
          this.tkntypeService.findAll().subscribe(
            (data)=>{
              this.tknTypeList = data
              this.companyService.getCompany().subscribe(
                (data:any)=>{
                  this.companyList = data;
                  this.siteService.findSitesByCompany_Id(this.tknForm.get('company').value.id).subscribe(
                    (data)=>{
                      this.siteList = data;
                    }
                  )
                }
              )
            }
          )
        }
      )
    } else {
      this.router.navigateByUrl("")
    }
  }

  cancel() {
    this.router.navigateByUrl("/tkn")
  }

  save() {
    const htmlContent = this.quill.root.innerHTML;
    this.tknForm.controls['content'].setValue(htmlContent)
    this.tknService.save(this.tknForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/tkn")
      }
    )
  }
  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  changeCompany() {
    const companyId = this.tknForm.get('company').value.id
    this.siteService.findSitesByCompany_Id(companyId).subscribe(
      (data)=>{
        this.siteList = data
      }
    )

  }

  changeSite() {

  }
}
