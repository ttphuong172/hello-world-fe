import {Component, OnDestroy, OnInit} from '@angular/core';
import {PingService} from "../../../services/ping.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AudioService} from "../../../services/audio.service";

@Component({
    selector: 'app-ping-list',
    templateUrl: './ping-list.component.html',
    styleUrls: ['./ping-list.component.css'],
    standalone: false
})
export class PingListComponent implements OnInit {
  pingList: any;
  private timeoutId: any;
  currentTime: string = '';


  constructor(
    private pingService: PingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // this.updateTime();
    // const now = new Date();
    // const seconds = now.getSeconds();
    // const millisecondsUntilNextThirdSecond = (60 - seconds + 3) % 60 * 1000 - now.getMilliseconds();
    //
    // // this.timeoutId = setTimeout(() => {
    // //   this.reloadComponent();
    // // }, millisecondsUntilNextThirdSecond);
    //
    // this.pingService.findAll().subscribe(
    //   (data) => {
    //     this.pingList = data;
    //   }
    // )

  }

  // reloadComponent() {
  //   const currentUrl = this.router.url;
  //   this.router.navigateByUrl('/task', {skipLocationChange: true}).then(() => {
  //     this.router.navigate([currentUrl]);
  //   });
  // }

  delete(ping: any) {
    this.pingService.delete(ping).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }






  // updateTime() {
  //   const now = new Date();
  //   const hours = String(now.getHours()).padStart(2, '0');
  //   const minutes = String(now.getMinutes()).padStart(2, '0');
  //   const seconds = String(now.getSeconds()).padStart(2, '0');
  //   this.currentTime = `${hours}:${minutes}:${seconds}`;
  // }

  // ngOnDestroy(): void {
  //   if (this.timeoutId){
  //     clearTimeout(this.timeoutId);
  //   }
  // }
}
