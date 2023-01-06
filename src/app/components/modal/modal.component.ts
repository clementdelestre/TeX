import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { PlayerService } from 'src/app/services/player.service';
import { ApplicationService } from 'src/app/services/application.service';
import { openCloseAnimation } from 'src/app/models/appAnimation';

@Component({
  selector: 'remote-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    openCloseAnimation
  ],
})
export class ModalComponent implements OnInit {

  constructor(public application: ApplicationService, @Inject(DOCUMENT) private document: Document, private location:Location, public player:PlayerService) {

  }

  ngOnInit(): void {
    this.document.body.style.overflow = "hidden";
    this.application.historyPush("remote");
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = "overlay";
  }

  clickBg(event:any){
    if(event.target.classList.contains('back')){
      this.close();
    }
  }

  close() {
    this.application.openRemote = false;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:Event) {
    this.close();
  }

}
