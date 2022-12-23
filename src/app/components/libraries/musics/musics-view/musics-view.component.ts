import { Component, HostListener, Input, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { PlaylistItem } from 'src/app/models/kodiInterfaces/playlist';
import { durationToString } from 'src/app/models/utils';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-musics-musics-view',
  templateUrl: './musics-view.component.html',
  styleUrls: ['./musics-view.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class MusicsViewComponent implements OnInit {

  _songs: AudioDetailsSong[] = [];
  showedSongs: AudioDetailsSong[] = [];

  @Input() set songs(value: AudioDetailsSong[]) {
    this._songs = value;
    this.showedSongs = value;

    this.changeSort(this.sortby)
    if(this._songs.length > 0){
      this.songHover(this._songs[0]);
    }
  }
  
  get getSongs(): AudioDetailsSong[] {
      return this._songs;  
  }

  detailedSong: AudioDetailsSong | undefined;
  imgDetailed: string = "";
  animatedDesc = true;

  searchText = "";


  @Input() sortby: string = "titleAZ";
  @Input() soft: boolean = false;

  constructor(private kodiApi: KodiApiService, public player: PlayerService) {

  }

  ngOnInit(): void {

  }

  songHover(song: AudioDetailsSong){
    if(song.art && song.art['album.thumb'])
    this.kodiApi.file.getPreparedFileUrl(song.art['album.thumb']).subscribe(resp => {
      this.imgDetailed = resp;
    });
    this.kodiApi.media.getSongsDetails(song.songid).subscribe(resp => {
      this.detailedSong = resp;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkViewPort();
  }

  checkViewPort(): boolean{

    const box = document.querySelector('.top-viewport');
    const rect = box?.getBoundingClientRect();

    if(rect){
      const isInViewport = rect.top >= 64;
      this.animatedDesc = isInViewport;
      return isInViewport;
    }
    this.animatedDesc = false;
    return false; 
  }

  async playSong(song: AudioDetailsSong){

    this.player.clearPlaylist(0);
  
    if(this.player.useInternal){
      this.player.internalPlayer.playlistAddAll(this._songs.slice(this._songs.indexOf(song)));
    } else {
      let items: PlaylistItem[] = [];
      this._songs.slice(this._songs.indexOf(song)).forEach(song => {
        const plItem: PlaylistItem = {
            songid : song.songid
        }  
        items.push(plItem);
      });
      await this.kodiApi.playlist.add(0, items); 
    }
    
    this.player.openPlaylist(0, true);
  }

  changeSort(sort: string){
    this.sortby = sort;

    switch(sort){
      case "titleAZ":
        this.showedSongs.sort((a, b) =>((a.title ?? "") > (b.title ?? "") ? 1 : -1)); 
        break;
      case "titleZA":
        this.showedSongs.sort((a, b) =>((a.title ?? "") > (b.title ?? "") ? 1 : -1)).reverse(); 
        break;
      case "duration":
        this.showedSongs.sort((a, b) =>((a.duration ?? 0) > (b.duration ?? 0) ? 1 : -1)); 
        break;
      case "latest":
          this.showedSongs.sort((a, b) =>((a.year ?? 0) > (b.year ?? 0) ? 1 : -1)).reverse(); 
          break;
      case "older":
          this.showedSongs.sort((a, b) =>((a.year ?? 0) > (b.year ?? 0) ? 1 : -1)); 
          break;
      case "track":
          this.showedSongs.sort((a, b) =>((a.track ?? 0) > (b.track ?? 0) ? 1 : -1)); 
          break;
      
    }
  }

  getSongDuration(duration: number) : string {
    return durationToString(duration, true, false);
  }

  modelChangeFn(e:string){
    this.searchText = e; 
    this.showedSongs = this._songs.filter(s => s.title?.toLocaleLowerCase()?.indexOf(e.toLocaleLowerCase()) != -1 || s.artist?.join()?.toLocaleLowerCase()?.indexOf(e.toLocaleLowerCase()) != -1);
  }

}
