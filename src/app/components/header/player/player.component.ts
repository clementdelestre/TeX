import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { ListItemAll } from 'src/app/models/kodiInterfaces/listItem';
import { GlobalTime } from 'src/app/models/kodiInterfaces/others';
import { kodiTimeToString } from 'src/app/models/utils';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class PlayerComponent implements OnInit {

  showPlaylist = false;

  constructor(private elementRef: ElementRef, public player: PlayerService, public application: ApplicationService, private kodiApi:KodiApiService) { }

  ngOnInit(): void {
    this.application.toggleBodyScroll(false);
    this.application.historyPush("player");
    this.player.loadPlayer()
  }

  ngOnDestroy(): void {
    this.application.showPlayer = false;  
    this.application.toggleBodyScroll(true);
  }

  close(){
    if(this.application.showPlayer)
      this.application.toggleBodyScroll(true);
    this.application.showPlayer = false;  
  }

  toggleDisplayPlaylist(){
    this.showPlaylist = !this.showPlaylist;

    if(this.showPlaylist){
      this.loadPlaylist();
      this.application.historyPush("playlist");
    } else {
      this.application.historyBack();
    }
  }

  loadPlaylist(){
    this.player.currentPlayer?.loadPlaylist();  
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:Event) {
    if(history.state.desc == "player"){
      this.showPlaylist = false;
    } else {
      this.close();
    } 
  }

  getSongDuration(duration: GlobalTime | undefined, displayHours = true) : string {
    if(!duration) return "";
    return kodiTimeToString(duration, true, displayHours);
  }

}
