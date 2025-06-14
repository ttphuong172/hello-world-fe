import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PingService} from "../../../services/ping.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-ping-add',
    templateUrl: './ping-add.component.html',
    styleUrls: ['./ping-add.component.css'],
    standalone: false
})
export class PingAddComponent implements OnInit{
  pingForm: FormGroup |any;
  constructor(
    private router:Router,
    private pingService: PingService
  ) {
  }

  ngOnInit(): void {
    this.pingForm = new FormGroup({
      name: new FormControl(''),
      ipAddress: new FormControl('', [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')])
    })
  }

  cancel() {
    this.router.navigateByUrl("/ping")
  }


  save() {
    this.pingService.save(this.pingForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/ping")
      }
    )
  }
}
