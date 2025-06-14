import {Component, OnDestroy, OnInit} from '@angular/core';
import {PingService} from "../../../services/ping.service";
import {AudioService} from "../../../services/audio.service";

@Component({
    selector: 'app-new-ping-list',
    templateUrl: './new-ping-list.component.html',
    styleUrls: ['./new-ping-list.component.css'],
    standalone: false
})
export class NewPingListComponent implements OnInit, OnDestroy{
  pingList: any;
  timeoutId: any;
  audioUrl: string | undefined;

  constructor(
    private pingService:PingService,
    private audioService: AudioService
  ) {
  }

  ngOnInit(): void {
    this.pingService.findAll().subscribe(
      (data)=>{
        this.pingList = data
        // console.log((this.pingList))
        // for (let i = 0; i < this.pingList.length; i ++){
        //   if (this.pingList[i].isUp == true){
        //     this.fetchAndPlayAudio()
        //   }
        //   break
        // }
      }
    )
    this.runAtFourthSecond();
  }

  ngOnDestroy(): void {
    if (this.timeoutId){
      clearTimeout(this.timeoutId);
      // alert("Da out")
    }
  }

  runAtFourthSecond() {
    const now = new Date();
    // Tính số mili giây còn lại để đến giây thứ 4 của phút tiếp theo
    const millisecondsUntilNextFourthSecond = (60 - now.getSeconds()) * 1000 + 4000 - now.getMilliseconds();

    // Sử dụng setTimeout để chạy hàm sau thời gian tính toán
    this.timeoutId = setTimeout(() => {
      // console.log("This runs at the 4th second of the next minute");
      this.pingService.findAll().subscribe(
        (data)=>{
          this.pingList = data
          // console.log(this.pingList)

          // for (let i = 0; i < this.pingList.length; i ++){
          //   if (this.pingList[i].isUp == true){
          //     this.fetchAndPlayAudio()
          //     break
          //   }
          // }

        }
      )

      // Sau khi thực hiện, gọi lại hàm để setTimeout cho phút tiếp theo
      this.runAtFourthSecond();
    }, millisecondsUntilNextFourthSecond);
  }

  delete(ping: any) {
    this.pingService.delete(ping).subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }

  fetchAndPlayAudio(): void {
    this.audioService.getAudio().subscribe((audioBlob: Blob) => {
      // Create a URL for the Blob and set it as the source of the audio element
      this.audioUrl = URL.createObjectURL(audioBlob);
    }, error => {
      console.error('Error fetching audio:', error);
    });
  }



}
