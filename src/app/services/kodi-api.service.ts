import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaRequest } from './protocol/http/media';
import { PlayerRequest } from './protocol/http/player';
import { PlaylistRequest } from './protocol/http/playlist';
import { FileRequest } from './protocol/http/file';
import { RemoteRequest } from './protocol/http/remote';

@Injectable({
  providedIn: 'root'
})
export class KodiApiService {

  media: MediaRequest;
  player: PlayerRequest;
  playlist: PlaylistRequest;
  file: FileRequest;
  remote: RemoteRequest;

  constructor(private http:HttpClient) {
    this.media = new MediaRequest(http);
    this.player = new PlayerRequest(http);
    this.playlist = new PlaylistRequest(http);
    this.file = new FileRequest(http);
    this.remote = new RemoteRequest(http);
  }

}
