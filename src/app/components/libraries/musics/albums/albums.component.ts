import { Component, OnInit } from '@angular/core';
import { fastFadeAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsAlbum } from 'src/app/models/kodiInterfaces/audio';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-musics-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [
    fastFadeAnimation
  ]
})
export class MusicsAlbumsComponent implements OnInit {

  albums: AudioDetailsAlbum[] = [];

  constructor(private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    this.getAlbums();
  }


  getAlbums(){
    this.kodiApi.media.getAlbums({}).subscribe(resp => {
      if(resp?.albums)
        this.albums = resp.albums;
    })
  }

}
