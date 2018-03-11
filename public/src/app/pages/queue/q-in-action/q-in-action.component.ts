import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'app/Models';

@Component({
  selector: 'q-in-action',
  templateUrl: './q-in-action.component.html',
  styleUrls: ['./q-in-action.component.scss']
})
export class QInActionComponent implements OnInit {
  @Input() t = new Ticket();
  constructor() { }

  ngOnInit() {
  }

}
