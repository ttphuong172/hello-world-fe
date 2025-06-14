import {Component, OnInit} from '@angular/core';
import {TknService} from "../../../services/tkn.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReadingService} from "../../../services/reading.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../../services/auth.service";
import {CommentService} from "../../../services/comment.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {TknDeleteComponent} from "../tkn-delete/tkn-delete.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: 'app-tkn-detail',
    templateUrl: './tkn-detail.component.html',
    styleUrls: ['./tkn-detail.component.css'],
    standalone: false
})
export class TknDetailComponent implements OnInit {
  comment = {
    "account": {
      "username": ''
    },
    "tkn": {
      "id": ''
    },
    "content":''
  }

  id: any
  tkn: any;
  username: any
  isRead: boolean = false;
  content: any;
  htmlContent: SafeHtml | undefined;
  isCommentVisible: any;


  constructor(
    private tknService: TknService,
    private activatedRoute: ActivatedRoute,
    private readingService: ReadingService,
    private router: Router,
    private jwtHelperService:JwtHelperService,
    private authService:AuthService,
    private companyService:CommentService,
    private sanitizer: DomSanitizer,
    private matDialog:MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLogin()){
      // @ts-ignore
      this.username=this.jwtHelperService.decodeToken(this.authService.getToken()).sub;
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.tknService.findById(this.id).subscribe(
        data => {
          this.tkn = data;
          // console.log(this.tkn)
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.tkn.content);
          for (let i = 0; i < this.tkn.readingList.length; i++){
            if (this.tkn.readingList[i].account.username == this.username){
              this.isRead = true
              break
            }
          }
        }
      )
    } else {
      this.router.navigateByUrl("")
    }

  }

  mark() {
    this.readingService.save({
        "account": {
          "username": this.username
        },
        "tkn": {
          "id": this.id
        }
      }
    ).subscribe(
      () => {
        this.router.navigateByUrl("/tkn").then(()=>{
          window.location.reload();
        })


      }
    )
  }

  commentPost(){
    this.comment.account.username = this.username
    this.comment.tkn.id = this.id
    // console.log(this.comment)
    // @ts-ignore
    this.comment.content = this.content
    this.companyService.save(this.comment).subscribe(
      ()=>{
        this.isCommentVisible = false;
        this.ngOnInit();
      }
    )
  }

  cancel() {
    this.router.navigateByUrl("/tkn")
  }

  delete() {
    this.tknService.isVisible(this.tkn.id).subscribe(
      () => {
        this.router.navigateByUrl("/tkn")
      }
    )
  }

  toggleComment() {
    this.isCommentVisible = !this.isCommentVisible;
  }

  openDialogDelete(tkn: any) {
    const dialogRefDelete = this.matDialog.open(TknDeleteComponent, {
      width: '600px',
      data: tkn,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
      ()=>{
        this.ngOnInit()
      }
    )
  }
}
