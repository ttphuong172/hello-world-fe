import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site.service";
import {FormControl, FormControlDirective, FormGroup} from "@angular/forms";
import {LineService} from "../../../services/line.service";
import {IspService} from "../../../services/isp.service";

@Component({
    selector: 'app-line-add',
    templateUrl: './line-add.component.html',
    styleUrls: ['./line-add.component.css'],
    standalone: false
})
export class LineAddComponent implements OnInit{
  site: any;
  lineForm: FormGroup |any;
  siteId: any
  ispList: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService:SiteService,
    private lineService: LineService,
    private router: Router,
    private ispService: IspService,
  ) {
  }
  ngOnInit(): void {
    this.lineForm = new FormGroup({
      name: new FormControl(''),
      shortName: new FormControl(''),
      shortName2: new FormControl(''),
      site: new FormControl(''),
      company: new FormControl(''),
      isp: new FormControl(''),
      circuitId: new FormControl(''),
      ipAddress: new FormControl(''),
      pingtest: new FormControl(''),
    })
    this.siteId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.siteService.findById(this.siteId).subscribe(
      (data)=>{
        this.site = data
        this.lineForm.controls['site'].setValue(this.site)
        this.lineForm.controls['company'].setValue(this.site.company)
        this.ispService.findAll().subscribe(
          (data)=>{
            this.ispList = data;
          }
        )
      }
    )
  }

  save() {
    this.lineService.save(this.lineForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("line/detail/" + this.siteId)
      }
    )
  }

  cancel() {
    this.router.navigateByUrl("line/detail/" + this.siteId)
  }

}
