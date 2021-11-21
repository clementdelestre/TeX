import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Location} from '@angular/common'; 
import { PlayerService } from 'src/app/services/player.service';
import { ApplicationService } from 'src/app/services/application.service';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { interval, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  sendTextValue = ""
  private subscriptionIncrementProgress!: Subscription;

  constructor(public application: ApplicationService, private localStorage: LocalStorageService, private kodiApi: KodiApiService, @Inject(DOCUMENT) private document: Document, private location:Location, public player:PlayerService) {

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
    this.vibrate();
  }

  onInputDown(){
    this.kodiApi.remote.inputDown();
    this.vibrate();
  }

  onInputHome(){
    this.kodiApi.remote.inputHome();
    this.vibrate();
  }

  onInputInfo(){
    this.kodiApi.remote.inputInfo();
    this.vibrate();
  }

  onInputLeft(){
    this.kodiApi.remote.inputLeft();
    this.vibrate();
  }

  onInputRight(){
    this.kodiApi.remote.inputRight();
    this.vibrate();
  }

  onInputSelect(){
    this.kodiApi.remote.inputSelect();
    this.vibrate();
  }

  onInputUp(){
    this.kodiApi.remote.inputUp();
    this.vibrate();
  }

  onInputMenu(){
    this.kodiApi.remote.inputExecuteAction("menu");
    this.vibrate();
  }

  onInputContextMenu(){
    this.kodiApi.remote.inputExecuteAction("contextmenu");
    this.vibrate();
  }

  onInputVolumeUp(){
    this.kodiApi.remote.inputExecuteAction("volumeup");
    this.vibrate();
    this.hideVolumeAfterDelay()
  }

  onInputVolumeDown(){
    this.kodiApi.remote.inputExecuteAction("volumedown");
    this.vibrate();
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

  modelChangeFn(e:any){
    this.sendTextValue = e;
  }

  sendText(){
    this.kodiApi.remote.sendText(this.sendTextValue)
    this.sendTextValue = ""
  }

  private vibrate(){
    const vibrationLength:number = this.localStorage.getData("vibrate") ?? 50
    if(vibrationLength > 0)
      window.navigator.vibrate(vibrationLength); 
  }

}
