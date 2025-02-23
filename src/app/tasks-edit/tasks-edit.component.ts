import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ImpactService} from "../../services/impact.service";
import {CompanyService} from "../../services/company.service";
import {PositionService} from "../../services/position.service";
import {TypeService} from "../../services/type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../services/site.service";

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent implements OnInit{
  taskForm: FormGroup | any;
  task:any;
  impactList: any;
  typeList: any;
  companyList: any;
  idCompany: any
  positionList: any
  configure: any
  siteList: any
  configureKr: any
  private ric: any
  private impactName: any
  scrollHeight: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private impactService: ImpactService,
    private companyService: CompanyService,
    private positionService: PositionService,
    private typeService:TypeService,
    private siteService: SiteService,
    private router:Router,

  ) {
  }
  ngOnInit(): void {
    this.taskForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      isP1: new FormControl(''),
      impact: new FormControl(''),
      cause: new FormControl(''),
      causeKr: new FormControl(''),
      configure: new FormControl(''),
      configureKr: new FormControl(''),
      actionList: this.formBuilder.array([]),
      company: new FormControl(''),
      site: new FormControl(''),
      position: new FormControl(''),
    })


    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.taskService.findById(id).subscribe(
      (data)=>{
        this.task  = data;
        this.taskForm.controls['id'].setValue(this.task.id)
        this.taskForm.controls['name'].setValue(this.task.name)
        this.taskForm.controls['isP1'].setValue(this.task.isP1)
        this.taskForm.controls['impact'].setValue(this.task.impact)
        this.taskForm.controls['cause'].setValue(this.task.cause)
        this.taskForm.controls['causeKr'].setValue(this.task.causeKr)
        this.taskForm.controls['configure'].setValue(this.task.configure)
        this.taskForm.controls['configureKr'].setValue(this.task.configureKr)
        for (let i = 0; i < this.task.actionList.length; i++) {
          this.taskForm.controls['actionList'].push(this.setAction(this.task.actionList[i].type, this.task.actionList[i].actionDate,this.task.actionList[i].actionContent, this.task.actionList[i].actionContentKr))
        }
        this.taskForm.controls['company'].setValue(this.task.company)
        this.taskForm.controls['site'].setValue(this.task.site)
        this.taskForm.controls['position'].setValue(this.task.position)

      }
    )

    this.impactService.getImpact().subscribe(
      (data)=>{
        this.impactList = data;
        this.typeService.getType().subscribe(
          (data)=>{
            this.typeList = data;
            this.companyService.getCompany().subscribe(
              (data)=>{
                this.companyList = data;
                this.positionService.findTypeByCompany_Id(this.taskForm.get('company').value.id).subscribe(
                  (data)=>{
                    this.positionList = data;
                    this.siteService.findSitesByCompany_Id(this.taskForm.get('company').value.id).subscribe(
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
      }
    )

  }

  compareByID(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id
  }

  setAction( type: any,actionDate: any,actionContent:any, actionContentKr:any): FormGroup {
    return this.formBuilder.group({
      type: type || '',
      actionDate: actionDate || '',
      actionContent: actionContent || '',
      actionContentKr: actionContentKr || ''
    })
  }

  get action(): FormArray {
    return this.taskForm.get('actionList') as FormArray;
  }

  addAction() {
    this.action.push(this.setAction(null, null, null,null));
  }

  removeAction(i: number) {
    this.action.removeAt(i);
  }

  loadCompany() {
    // @ts-ignore
    this.idCompany = this.taskForm.get('company').value.id
    this.positionService.findTypeByCompany_Id(this.idCompany).subscribe(
      (data)=>{
        this.positionList = data;
        this.siteService.findSitesByCompany_Id(this.idCompany).subscribe(
          (data)=>{
            this.siteList = data;
            this.taskForm.controls['site'].setValue("")
            this.taskForm.controls['position'].setValue("")
          }
        )
      }
    )
  }

  update() {
    this.taskService.update(this.taskForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/task")
      }

    )
  }

  cancel() {
    this.router.navigateByUrl("/task")
  }

  // loadConfigure() {
  //   this.configure = this.taskForm.get('site').value.configure
  //   this.configureKr = this.taskForm.get('site').value.configureKr
  //
  // }

  fillType(i:any) {
    if (this.taskForm.get('actionList').at(i).get('type').value.name == 'Line up') {
      this.action.removeAt(i)
      this.action.insert(i, this.setAction({ "id": 3, "name": "Line up" }, null, "Line restored", "회선 복구"))
    } else if (this.taskForm.get('actionList').at(i).get('type').value.name == 'Line down' && i != 0){
      this.action.removeAt(i)
      this.action.insert(i, this.setAction({ "id": 1, "name": "Line down" }, null, "Line down again", "회선 재down"))
    }
  }

  autoGrowTextZone(e:any) {
    this.scrollHeight = e.target.scrollHeight
  }

  checkCheckbox() {
    const isChecked = !this.taskForm.get('isP1')?.value;
    if (isChecked == true){
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
}


