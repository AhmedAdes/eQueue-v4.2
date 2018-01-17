import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Service } from 'app/Models';

@Component({
  selector: 'mt-wizard-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  constructor() { }
@Input() service :Service;
@Output() updService = new EventEmitter();

  ngOnInit() {
  }

  OnServUpdated(){
    this.updService.emit(this.service);
  }
}
