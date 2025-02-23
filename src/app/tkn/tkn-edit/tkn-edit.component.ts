
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import Quill from 'quill';
import { Delta } from 'quill';  // For Quill 1.x
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-tkn-edit',
  templateUrl: './tkn-edit.component.html',
  styleUrls: ['./tkn-edit.component.css']
})
export class TknEditComponent implements OnInit{
  tkn:any
  content: any;
  tknForm: FormGroup | any;
  quill: any;


  constructor(
    private tknService:TknService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()) {
      this.tknForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl(''),
        summaryContent: new FormControl(''),
        content: new FormControl(''),
        creator: new FormControl('')
      })
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.tknService.findById(id).subscribe(
        (data) => {
          this.tkn = data;
          this.tknForm.controls['id'].setValue(this.tkn.id)
          this.tknForm.controls['title'].setValue(this.tkn.title)
          this.tknForm.controls['summaryContent'].setValue(this.tkn.summaryContent)
          this.tknForm.controls['creator'].setValue(this.tkn.creator)

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



}
