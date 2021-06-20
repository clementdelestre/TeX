import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClipboardService } from 'ngx-clipboard';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { AppNotificationType } from 'src/app/models/notification';
import { durationToString } from 'src/app/models/utils';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-musics-musics-view-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class ItemComponent implements OnInit {

  @Input() song!: AudioDetailsSong;

  @Output() onPlay = new EventEmitter();
  @Output() onHover = new EventEmitter();

  showContext = false;

  fileLink = "";

  constructor(private kodiApi: KodiApiService, private player: PlayerService, private clipboardApi: ClipboardService, private application: ApplicationService, private translate: TranslateService) { }

  ngOnInit(): void {

  }


  getCurrentPlayingSong() : number {
    if(this.player.useInternal) return this.player.internalPlayer?.playerItem?.id ?? 0;
    return this.player.players[1]?.playerItem?.id ?? 0;
  }

  getSongDuration(duration: number) : string {
    return durationToString(duration, true, false);
  }

  playSong(e:any){
    if(e.target.className.indexOf("no-play") == -1){
      this.onPlay.emit();
    } 
  }

  songHover(){
    this.onHover.emit();
  }

  onContextMenuShow(e:Event){
    this.showContext = true;

    if(this.fileLink == "")
      this.getFile();

    return false;
  }

  onContextMenuHide(e:any){
    this.showContext = false;
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event:Event) {
    this.onContextMenuHide(event);
  }

  getFile(){
    if(this.song.file)
      this.kodiApi.file.getPreparedFileUrl(this.song.file).subscribe(resp => {
        this.fileLink = resp;
      })
  }

  playNext(){
    
  }

  streamLink(){
    this.clipboardApi.copyFromContent(this.fileLink);
    this.application.showNotification('library.musicsView.linkCopied', "library.musicsView.linkWasCopiedInClipBoard", AppNotificationType.success);
  }

}
