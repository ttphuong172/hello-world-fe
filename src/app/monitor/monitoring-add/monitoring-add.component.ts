import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MonitoringService} from "../../../services/monitoring.service";

@Component({
  selector: 'app-monitoring-add',
  templateUrl: './monitoring-add.component.html',
  styleUrls: ['./monitoring-add.component.css']
})
export class MonitoringAddComponent implements OnInit{
  monitoringForm: FormGroup |any;
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // Basic formatting
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
      ['clean']                               // Remove formatting
    ]
  };
  constructor(
    private router:Router,
    private monitoringService:MonitoringService
  ) {
  }
  ngOnInit(): void {
    this.monitoringForm = new FormGroup({
      ipAddress: new FormControl('', [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]),
      name: new FormControl(''),
      note: new FormControl(''),
    })
  }

  cancel() {
    this.router.navigateByUrl("/monitoring")
  }

  save() {
    this.monitoringService.save(this.monitoringForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/monitoring")
      }
    )
  }
}
