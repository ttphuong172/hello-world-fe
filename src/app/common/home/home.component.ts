import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AudioService} from "../../../services/audio.service";
import {PingService} from "../../../services/ping.service";
import {AuthService} from "../../../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  selectedItem: string = ''; // To hold the current selected item

  timeoutId: any;
  pingList: any;
  audioUrl: string | undefined;

  currentUrl:string = '';
  isLogin: boolean = false;
  username:any;
  role:any
  fullname:any;

  constructor(
    private router: Router,
    private audioService:AudioService,
    private pingService:PingService,
    private authService:AuthService,
    private jwtHelperService:JwtHelperService,
    private accountService:AccountService,
  ) {
  }
  ngOnInit(): void {

    console.log("AA")
    // this.router.navigateByUrl('')
    // this.selectedItem = 'HOME';
  // @ts-ignore
    this.username=this.jwtHelperService.decodeToken(this.authService.getToken()).sub;
    // console.log(this.username)
    // @ts-ignore
    this.role=this.jwtHelperService.decodeToken(this.authService.getToken()).role.authority;
    this.accountService.findById(this.username).subscribe(
      (data:any)=>{
        this.fullname=data.fullname.toUpperCase();
      }
    )

    this.isLogin = this.authService.isLogin()


    this.runAtFourthSecond();
  }


  selectItem(item: string) {
    this.selectedItem = item; // Update selectedItem when a menu item is clicked
    console.log(this.selectedItem)
  }


  runAtFourthSecond() {
    const now = new Date();
    // Tính số mili giây còn lại để đến giây thứ 4 của phút tiếp theo
    const millisecondsUntilNextFourthSecond = (60 - now.getSeconds()) * 1000 + 4000 - now.getMilliseconds();

    // console.log("ABC")

    // Sử dụng setTimeout để chạy hàm sau thời gian tính toán
    this.timeoutId = setTimeout(() => {
      // console.log("This runs at the 4th second of the next minute");
      this.pingService.findAll().subscribe(
        (data)=>{
          this.pingList = data
          // console.log("EFG")
          // console.log(this.pingList)
          for (let i = 0; i < this.pingList.length; i ++){
            if (this.pingList[i].isUp == true){
              this.fetchAndPlayAudio()
              break
            }
          }
        }
      )

      // Sau khi thực hiện, gọi lại hàm để setTimeout cho phút tiếp theo
      this.runAtFourthSecond();
    }, millisecondsUntilNextFourthSecond);
  }

  fetchAndPlayAudio(): void {
    this.audioService.getAudio().subscribe((audioBlob: Blob) => {
      // Create a URL for the Blob and set it as the source of the audio element
      this.audioUrl = URL.createObjectURL(audioBlob);
    }, error => {
      // console.error('Error fetching audio:', error);
    });
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl("")
  }
}
