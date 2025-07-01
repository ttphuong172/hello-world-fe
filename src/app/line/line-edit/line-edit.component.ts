import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LineService} from "../../../services/line.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IspService} from "../../../services/isp.service";
import Quill from "quill";

@Component({
    selector: 'app-line-edit',
    templateUrl: './line-edit.component.html',
    styleUrls: ['./line-edit.component.css'],
    standalone: false
})
export class LineEditComponent implements OnInit{
  lineId: any
  line:any
  lineForm: FormGroup | any;
  ispList: any;
  quill: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private lineService: LineService,
    private ispService: IspService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.lineForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      shortName: new FormControl(''),
      shortName2: new FormControl(''),
      site: new FormControl(''),
      company: new FormControl(''),
      isp: new FormControl(''),
      circuitId: new FormControl(''),
      tip: new FormControl(''),
    })

    this.lineId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.lineService.findById(this.lineId).subscribe(
      (data)=>{
        this.line = data
        this.lineForm.controls['id'].setValue(this.line.id)
        this.lineForm.controls['name'].setValue(this.line.name)
        this.lineForm.controls['shortName'].setValue(this.line.shortName)
        this.lineForm.controls['shortName2'].setValue(this.line.shortName2)
        this.lineForm.controls['site'].setValue(this.line.site)
        this.lineForm.controls['company'].setValue(this.line.company)
        this.lineForm.controls['isp'].setValue(this.line.isp)
        this.lineForm.controls['circuitId'].setValue(this.line.circuitId)

        // Initialize Quill
        this.quill = new Quill('#quill-editor', {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],              // Basic formatting
              [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
              ['clean']                                     // Remove formatting
            ]
          }
        });

        this.quill.clipboard.dangerouslyPasteHTML(this.line.tip);



        this.ispService.findAll().subscribe(
          (data)=>{
            this.ispList = data
          }
        )
      }
    )

  }

  cancel() {
    this.router.navigateByUrl('site/detail/' + this.line.site.id)
  }


  update() {

    const htmlContent = this.quill.root.innerHTML;

    this.lineForm.controls['tip'].setValue(htmlContent)

    this.lineService.update(this.lineForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/site/detail/' + this.line.site.id)
      }
    )
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }
}
