import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'bootstrap-panel',
  templateUrl: './bootstrap-panel.component.html',
  styleUrls: ['./bootstrap-panel.component.scss']
})
export class BootstrapPanelComponent {
  constructor() { }
  @Input() toggle :boolean;


  OnToggle(){
    this.toggle = !this.toggle;
  }
}
