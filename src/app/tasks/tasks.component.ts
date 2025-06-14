import {Component, OnInit, ViewChildren, ElementRef, QueryList, AfterViewInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ImpactService} from "../../services/impact.service";
import {CompanyService} from "../../services/company.service";
import {PositionService} from "../../services/position.service";
import {TypeService} from "../../services/type.service";
import {Router} from "@angular/router";
import {SiteService} from "../../services/site.service";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    standalone: false
})
export class TasksComponent implements OnInit, AfterViewInit {
  taskForm: FormGroup | any;
  taskList: any;
  impactList: any;
  companyList: any;
  idCompany: any
  positionList: any
  siteList: any
  typeList: any
  idGroup: any
  configure: any
  configureKr: any
  private impactName: any;
  private impactNameKr: any;
  private ric: any;
  scrollHeight: any;
  nameRows: any;
  isP1: any;
  name: any;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private impactService: ImpactService,
    private companyService: CompanyService,
    private positionService: PositionService,
    private typeService: TypeService,
    private siteService: SiteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      isP1: new FormControl(false),
      impact: new FormControl('', [Validators.required]),
      cause: new FormControl(''),
      causeKr: new FormControl(''),
      valueFilter: new FormControl(''),
      configure: new FormControl(''),
      configureKr: new FormControl(''),
      actionList: this.formBuilder.array([this.setAction(null, null, null, null)]),
      company: new FormControl('', [Validators.required]),
      site: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
    })

    // this.taskForm.get('cause')?.disable()
    // this.taskForm.get('causeKr')?.disable()

    this.taskService.getTask().subscribe(
      (data) => {
        this.taskList = data
        this.impactService.getImpact().subscribe(
          (data) => {
            this.impactList = data;
            this.companyService.getCompany().subscribe(
              (data) => {
                this.companyList = data;
                this.typeService.getType().subscribe(
                  (data) => {
                    this.typeList = data;

                  }
                )
              }
            )
          }
        )
      },
    )
  }

  save() {

    this.taskService.save(this.taskForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/task')
      }
    )
  }

  loadCompany() {
    this.taskForm.get('valueFilter').setValue("")
    // @ts-ignore
    this.idCompany = this.taskForm.get('company').value.id
    this.positionService.findTypeByCompany_Id(this.idCompany).subscribe(
      (data) => {
        this.positionList = data;
        this.siteService.findSitesByCompany_Id(this.idCompany).subscribe(
          (data) => {
            this.siteList = data;
          }
        )
      }
    )
  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  setAction(type: any, actionDate: any, actionContent: any, actionContentKr: any): FormGroup {
    return this.formBuilder.group({
      type: [type || '', Validators.required],
      actionDate: [actionDate || '', Validators.required],
      actionContent: actionContent || '',
      actionContentKr: actionContentKr || ''
    })
  }

  get action(): FormArray {
    return this.taskForm.get('actionList') as FormArray;
  }

  addAction() {
    this.action.push(this.setAction(null, null, null, null));
  }

  removeAction(i: number) {
    this.action.removeAt(i);
  }

  loadSite() {
    this.configure = this.taskForm.get('site').value.configure
    this.configureKr = this.taskForm.get('site').value.configureKr
    this.ric = this.taskForm.get('site').value.ric
  }

  cancel() {
    this.router.navigateByUrl("/task")
  }

  filetype(i: any) {
    // console.log(i)
    this.impactName = this.taskForm.get('impact').value.name
    this.impactNameKr = this.taskForm.get('impact').value.nameKr

    if (i == 0 && this.taskForm.get('actionList').at(i).get('type').value.name == 'Line down') {
      if (this.taskForm.get('company').value.name == "I. LG Electronic") {
        this.action.removeAt(0);
        this.action.insert(0, this.setAction({"id": 1, "name": "Line down"}, null, "NMS " +
          "line detected, " + this.impactName.toLowerCase() + "\nRequest confirmation via email from site administrator " +
          "and " + this.ric + " administrator", "NMS 선감지, " + this.impactNameKr + "\n사이트 " +
          "관리자 및 " + this.ric + " 관리자에게 이메일을 통해 확인 요청함"))
      } else {
        this.action.removeAt(0);
        this.action.insert(0, this.setAction({"id": 1, "name": "Line down"}, null, "NMS " +
          "line detected, " + this.impactName.toLowerCase(), "NMS 선감지," + this.impactNameKr))
      }
    } else if (this.taskForm.get('actionList').at(i).get('type').value.name == 'Line up') {
      this.action.removeAt(i)
      this.action.insert(i, this.setAction({"id": 3, "name": "Line up"}, null, "Line restored", "회선 복구"))
    }
  }

  ngAfterViewInit(): void {
    this.taskForm.get('name')?.valueChanges.subscribe(
      () => {
        console.log(this.taskForm.get('name'))
      }
    )
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault(); // Prevent the default paste behavior

    // Get the clipboard data
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText = clipboardData.getData('text');

    // Split the pasted text into lines
    const lines = pastedText.split('\n');

    // Process each line to remove leading tabs and spaces
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^[ \t]+/, ''); // Remove leading spaces and tabs
    }

    // Join the processed lines back into a single string
    const processedText = lines.join('\n');

    // Update the form control value
    this.taskForm.get('name')?.setValue(processedText, {emitEvent: false});
  }

  checkCheckbox() {
    const isChecked = !this.taskForm.get('isP1')?.value;
    if (isChecked == true) {
      console.log(isChecked)
      // this.taskForm.get('cause')?.enable()
      this.taskForm.get('cause').setValue("Under investigation")

      // this.taskForm.get('causeKr')?.enable()
      this.taskForm.get('causeKr').setValue("파악중")

    } else {
      console.log(isChecked)
      this.taskForm.get('cause').setValue("")
      // this.taskForm.get('cause')?.disable()

      this.taskForm.get('causeKr').setValue("")
      // this.taskForm.get('causeKr')?.disable()
    }
  }

  filterSite() {
    // this.taskForm.get('site').disable()
    this.siteService.findSitesByCompany_Id(this.idCompany).subscribe(
      data => {
        this.siteList = data
        let newSiteList = []
        let valueFilter = this.taskForm.get('valueFilter').value.toLowerCase()
        for (let i = 0; i < this.siteList.length; i++) {

          if (this.siteList[i].name.toLowerCase().includes(valueFilter)) {
            newSiteList.push(this.siteList[i])
          }
        }
        // this.taskForm.get('site').enabled()
        this.siteList = newSiteList
      }
    )
  }
  // filterSite() {
  //   this.siteService.findSitesByCompany_Id(this.idCompany).subscribe(
  //     data=>{
  //       this.siteList = data
  //       let valueFilter = this.taskForm.get('valueFilter').value.toLowerCase()
  //       this.siteList.filter(item => item.name.includes(valueFilter));
  //     }
  //   )
  // }
}


