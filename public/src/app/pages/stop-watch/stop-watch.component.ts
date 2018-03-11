import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { setInterval } from 'core-js/library/web/timers';

@Component({
  selector: 'stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit {
  @Input() servingTime;
  @Input() startTimer = false;
  @Input() fColor = 'black';

  milSec = 0; sec = 0; min = 0; hr = 0;
  interval;

  constructor() {
  }
  ngOnInit() {
  }

  ngOnChanges() {
    this.setTimerVal();
    if (this.startTimer) {
      this.start();
    }
    else if (this.startTimer == false && this.interval != undefined) {
      this.stop();
    }
  }
  setTimerVal() {
    if (this.servingTime != 0) {
      this.min = Math.floor(this.servingTime / 60);
      this.hr = Math.floor(this.min / 60);
      this.sec = this.servingTime - this.min * 60;
    }
  }
  start() {
    this.interval = setInterval(() => { this.timer() }, 100);
  }

  stop() {
    clearInterval(this.interval);
    this.clear();
  }

  timer() {
    this.milSec += 1;
    if (this.milSec == 10) {
      this.sec += 1;
      this.milSec = 0;
    }
    if (this.sec == 60) {
      this.min += 1;
      this.sec = 0;
    }
    if (this.min == 60) {
      this.hr += 1;
      this.min = 0;
    }
  }
  clear() {
    this.milSec = 0; this.sec = 0; this.min = 0; this.hr = 0;
  }
}
