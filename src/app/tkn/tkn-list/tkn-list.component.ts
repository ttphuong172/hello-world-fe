import {Component, OnInit} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {DataService} from "../../../services/data.service";
import {CompanyService} from "../../../services/company.service";
import {SiteService} from "../../../services/site.service";

@Component({
    selector: 'app-tkn-list',
    templateUrl: './tkn-list.component.html',
    styleUrls: ['./tkn-list.component.css'],
    standalone: false
})

export class TknListComponent implements OnInit{
  tknList:any
  keyword='';
  username: any;
  showText = false; // Flag to control the visibility of the hover text
  mouseX = 0; // Store the mouse X position
  mouseY = 0; // Store the mouse Y position
  readingListHover: any
  unRead: any;
  companyList: any;
  siteList: any;
  selectedCompany: any = "";
  selectedSite: any = "";
  companyId='';
  siteId ='';


  constructor(
    private tknService:TknService,
    private authService:AuthService,
    private router:Router,
    private jwtHelperService: JwtHelperService,
    private companyService:CompanyService,
    private siteService:SiteService
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLogin()){

      // @ts-ignore
      this.username = this.jwtHelperService.decodeToken(this.authService.getToken()).sub;



      this.tknService.findAllUsername(this.username).subscribe(
        (data)=>{
          this.tknList = data;
          console.log(this.tknList)
          this.unRead = this.tknList.filter((item: { read: boolean; }) => item.read === false).length;
          this.companyService.getCompany().subscribe(
            (data)=>{
              this.companyList = data;
            }
          )
        }
      )
    } else {
      this.router.navigateByUrl("")
    }
  }

  search() {
    this.tknService.searchByKeyword(this.username,this.keyword, this.companyId, this.siteId).subscribe(
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

  changeCompany() {

    if (!this.selectedCompany) {
      this.companyId = ""
      this.siteId = ""
      this.search()
      this.selectedCompany = ""
      this.selectedSite = ""
    }

    this.companyId = this.selectedCompany.id
    this.siteService.findSitesByCompany_Id(this.selectedCompany.id).subscribe(
      (data: any)=>{
        this.siteList = data;
      }
    )
    this.siteId = "";
    this.search()
  }



  changeSite() {
    this.siteId = this.selectedSite.id
    this.search()
  }
}


