import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bootstrap-panel',
  templateUrl: './bootstrap-panel.component.html',
  styleUrls: ['./bootstrap-panel.component.scss']
})
export class BootstrapPanelComponent {
  constructor() { }
  @Input() toggle = false;
  @Input() hBackColor = '#0277BD';
  @Input() hColor = 'white';  
  @Input() bBackColor = 'white';
  @Input() bColor = 'blue';  

  OnToggle() {
    this.toggle = !this.toggle;
  }
}
