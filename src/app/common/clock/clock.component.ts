import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from "../../../services/time.service";
import { DateTime } from 'luxon';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.css'],
    standalone: false
})
export class ClockComponent implements OnInit {
  @Input() childData: string = '';
  private intervalId: any;
  currentTime: any;
  currentDate: any;

  constructor(
    private timeService: TimeService
  ) {
  }

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateTime(): void {
   const now = DateTime.now().setZone(this.childData);
   this.currentTime = now.toFormat('HH:mm:ss');
   this.currentDate = now.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });;
   // console.log(this.currentDate)

  }

}
