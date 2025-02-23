import {Component, OnInit} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-tkn-list',
  templateUrl: './tkn-list.component.html',
  styleUrls: ['./tkn-list.component.css']
})

export class TknListComponent implements OnInit{
  tknList:any
  keyword: any;
  username: any;

  constructor(
    private tknService:TknService,
    private authService:AuthService,
    private router:Router,
    private jwtHelperService: JwtHelperService
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()){
      // @ts-ignore
      this.username = this.jwtHelperService.decodeToken(this.authService.getToken()).sub;
      this.tknService.findAllUsername(this.username).subscribe(
        (data)=>{
          this.tknList = data;
          // console.log(this.tknList)
        }
      )
    } else {
      this.router.navigateByUrl("")
    }
  }

  search() {
    this.tknService.searchByKeyword(this.keyword).subscribe(
      (data)=>{
        this.tknList = data
      }
    )
  }

}
