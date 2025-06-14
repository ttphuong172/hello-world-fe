import {Component, OnInit} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {DataService} from "../../../services/data.service";

@Component({
    selector: 'app-tkn-list',
    templateUrl: './tkn-list.component.html',
    styleUrls: ['./tkn-list.component.css'],
    standalone: false
})

export class TknListComponent implements OnInit{
  tknList:any
  keyword: any;
  username: any;
  showText = false; // Flag to control the visibility of the hover text
  mouseX = 0; // Store the mouse X position
  mouseY = 0; // Store the mouse Y position
  readingListHover: any
  unRead: any;


  constructor(
    private tknService:TknService,
    private authService:AuthService,
    private router:Router,
    private jwtHelperService: JwtHelperService,
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()){

      // @ts-ignore
      this.username = this.jwtHelperService.decodeToken(this.authService.getToken()).sub;
      this.tknService.findAllUsername(this.username).subscribe(
        (data)=>{
          this.tknList = data;
          this.unRead = this.tknList.filter((item: { read: boolean; }) => item.read === false).length;
        }
      )
    } else {
      this.router.navigateByUrl("")
    }
  }

  search() {
    this.tknService.searchByKeyword(this.username,this.keyword).subscribe(
      (data)=>{
        this.tknList = data
      }
    )
  }

  // Triggered when the mouse enters the table cell
  onMouseEnter(event: MouseEvent,tkn:any): void {
    this.readingListHover = tkn.readingList.map((item: any) => `${item.account.username}`).join(', ');
    this.showText = true;
    this.updateMousePosition(event);
  }

  // Triggered when the mouse leaves the table cell
  onMouseLeave(): void {
    this.showText = false;
  }

  // Update mouse position
  updateMousePosition(event: MouseEvent): void {
    this.mouseX = event.clientX + 10; // Add an offset to avoid overlapping the cursor
    this.mouseY = event.clientY + 10; // Add an offset to avoid overlapping the cursor
  }
}
