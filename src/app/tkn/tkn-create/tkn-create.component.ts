import {Component, OnInit, } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TknService} from "../../../services/tkn.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../../services/auth.service";
import {ReadingService} from "../../../services/reading.service";
import {TkntypeService} from "../../../services/tkntype.service";

@Component({
    selector: 'app-tkn-create',
    templateUrl: './tkn-create.component.html',
    styleUrls: ['./tkn-create.component.css'],
    standalone: false
})
export class TknCreateComponent implements OnInit {
  tknForm: FormGroup |any;
  username: any
  tkn: any;
  tknTypeList: any;
  constructor(
    private tknService:TknService,
    private router:Router,
    private jwtHelperService:JwtHelperService,
    private authService:AuthService,
    private readingService:ReadingService,
    private tkntypeService:TkntypeService
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()) {

      this.tkntypeService.findAll().subscribe(
        (data)=>{
          this.tknTypeList = data;
        }
      )
      // @ts-ignore
      this.username = this.jwtHelperService.decodeToken(this.authService.getToken()).sub;
      this.tknForm = new FormGroup({
        title: new FormControl(''),
        tknType: new FormControl(''),
        summaryContent: new FormControl(''),
        content: new FormControl(''),
        creator: new FormControl(this.username)
      })
    } else {
      this.router.navigateByUrl("")
    }
  }


  cancel() {
    this.router.navigateByUrl("/tkn")
  }

  save() {
    this.tknService.save(this.tknForm.value).subscribe(
      (data)=>{
        this.tkn = data
        this.readingService.save({
          "account": {
            "username": this.username
          },
          "tkn": {
            "id": this.tkn.id
          }
        }).subscribe()
        this.router.navigateByUrl("/tkn")

      }
    )
  }
}
