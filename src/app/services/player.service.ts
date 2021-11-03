import { Injectable } from '@angular/core';
import { InternalPlayer } from '../models/player/internalPlayer';
import { KodiPlayer } from '../models/player/kodiPlayer';
import { ControlPlayer } from '../models/player/player';
import { ApplicationService } from './application.service';
import { KodiApiService } from './kodi-api.service';
import { KodiwebsocketService } from './kodiwebsocket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: ControlPlayer[] = [];
  currentPlayer: ControlPlayer | undefined;
  internalPlayer: InternalPlayer = new InternalPlayer(this.kodiApi, this);

  useInternal: boolean = true;

  constructor(private kodiApi:KodiApiService, private kodiWebsocket:KodiwebsocketService, private application:ApplicationService) {
    this.kodiWebsocket.registerPlayerHandlers(this);
    if(this.application.musicsDefaultPlayer == 'internal'){
      this.useInternal = true;
    }
    this.setDefaultPlayer();
  }

  setDefaultPlayer(){

    this.kodiApi.player.getActivePlayers().subscribe((players) => {   
      this.players = [];

      //this.players.push(this.internalPlayer)
      
      players.forEach(pl => {
        let customPlayer = new KodiPlayer(pl.playerid, this.kodiApi)
        this.players.push(customPlayer);
        customPlayer.loadPlayer();     
      })
      this.setPlayer(this.players[0]);
    });
  }

  setPlayer(player: ControlPlayer){
    this.currentPlayer = player;
    this.loadPlayer();
  }

  loadPlayer(){
    if(this.currentPlayer)
      this.currentPlayer.loadPlayer();
  }

  isAvailable(): boolean {
    return this.players.length > 0 || this.useInternal;
  }

  getPlayerFromId(playerid: number) : ControlPlayer {
    return this.players.filter(pl => pl.playerid == playerid)[0];
  }

  openMediaFile(file: string, canUseInternal:boolean = false){
    
    if(this.useInternal && canUseInternal){
      if(this.players.indexOf(this.internalPlayer) == -1){
        this.players.push(this.internalPlayer)
        this.currentPlayer = this.internalPlayer
      }

      this.internalPlayer.openFile(file);
    } else {
      this.kodiApi.player.open({ "file" : file });
    }
  }

  openPlaylist(id: number, canUseInternal:boolean = false){
    console.log("open playlist")
    if(this.useInternal && canUseInternal){
      if(this.players.indexOf(this.internalPlayer) == -1){
        this.players.push(this.internalPlayer)
        this.currentPlayer = this.internalPlayer
      }
      this.internalPlayer.openPlaylist();
    } else {
      this.kodiApi.player.open({ "playlistid" : id });
    }
  }

  onStop(){
    this.setDefaultPlayer();
  }

  clearPlaylist(playlistid: number){
    if(this.useInternal && playlistid == 0){
      this.internalPlayer.playlistClear();
    } else {
      this.kodiApi.playlist.clear(playlistid ?? 0);
    }
  }

  setInternalPlayerEnable(enable: boolean){
    this.useInternal = enable;
    if(enable){
      this.setDefaultPlayer()
    } 
    
  }

  showPlayer(index: number){
    this.currentPlayer = this.players[index];
  }

}
