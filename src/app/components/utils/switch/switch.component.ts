import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();
  @Input() value: boolean = false;

  constructor() { }

  checkboxStatus = true;

  ngOnInit(): void {
    this.checkboxStatus = this.value;
  }

  checkBoxStatus(event: boolean) {
    this.checkboxStatus = event;
    this.toggle.emit(event);
  }

  changeCheckBoxStatus(status: boolean) {
    this.checkboxStatus = status;
    
  }

}
