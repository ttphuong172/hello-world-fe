import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MonitoringService} from "../../../services/monitoring.service";
import Quill from "quill";

@Component({
  selector: 'app-monitoring-edit',
  templateUrl: './monitoring-edit.component.html',
  styleUrls: ['./monitoring-edit.component.css']
})
export class MonitoringEditComponent implements OnInit{
  monitoringForm: FormGroup |any;
  monitoring: any;
  quill: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private monitoringService: MonitoringService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.monitoringForm = new FormGroup({
      id: new FormControl(''),
      ipAddress: new FormControl('', [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]),
      name: new FormControl(''),
      note: new FormControl(''),
    })
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.monitoringService.findById(id).subscribe(
      (data)=> {
        this.monitoring = data;
        this.monitoringForm.controls['id'].setValue(this.monitoring.id)
        this.monitoringForm.controls['ipAddress'].setValue(this.monitoring.ipAddress)
        this.monitoringForm.controls['name'].setValue(this.monitoring.name)

        // Initialize Quill
        this.quill = new Quill('#quill-editor', {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],        // Basic formatting
              [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
              ['clean']                               // Remove formatting
            ]
          }
        });
        this.quill.clipboard.dangerouslyPasteHTML(this.monitoring.note);
      }
    )
  }

  cancel() {
    this.router.navigateByUrl("/monitoring")
  }

  update() {
    const htmlContent = this.quill.root.innerHTML;

    this.monitoringForm.controls['note'].setValue(htmlContent)

    this.monitoringService.save(this.monitoringForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/monitoring")
      }
    )
  }
}
