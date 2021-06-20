import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Location} from '@angular/common'; 
import { PlayerService } from 'src/app/services/player.service';
import { ApplicationService } from 'src/app/services/application.service';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss'],
  animations: [
    openCloseAnimation
  ],
})
export class RemoteComponent implements OnInit {

  displayVolumeBar: boolean = false;

  private volumeBarDelay:number = 0;
  private subscriptionIncrementProgress!: Subscription;

  constructor(public application: ApplicationService, private kodiApi: KodiApiService, @Inject(DOCUMENT) private document: Document, private location:Location, public player:PlayerService) {

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

  onInputBack(){
    this.kodiApi.remote.inputBack();
  }

  onInputDown(){
    this.kodiApi.remote.inputDown();
  }

  onInputHome(){
    this.kodiApi.remote.inputHome();
  }

  onInputInfo(){
    this.kodiApi.remote.inputInfo();
  }

  onInputLeft(){
    this.kodiApi.remote.inputLeft();
  }

  onInputRight(){
    this.kodiApi.remote.inputRight();
  }

  onInputSelect(){
    this.kodiApi.remote.inputSelect();
  }

  onInputUp(){
    this.kodiApi.remote.inputUp();
  }

  onInputMenu(){
    this.kodiApi.remote.inputExecuteAction("menu");
  }

  onInputContextMenu(){
    this.kodiApi.remote.inputExecuteAction("contextmenu");
  }

  onInputVolumeUp(){
    this.kodiApi.remote.inputExecuteAction("volumeup");
    this.hideVolumeAfterDelay()
  }

  onInputVolumeDown(){
    this.kodiApi.remote.inputExecuteAction("volumedown");
    this.hideVolumeAfterDelay()
  }

  private hideVolumeAfterDelay() {
    this.displayVolumeBar = true;
    this.subscriptionIncrementProgress?.unsubscribe();
    this.subscriptionIncrementProgress = interval(2000).subscribe(() => {
      this.displayVolumeBar = false;
      this.subscriptionIncrementProgress.unsubscribe();
    });
  }

}
