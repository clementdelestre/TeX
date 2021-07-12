import { Component, OnInit } from '@angular/core';
import { AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { ListSort, ListSortMethod, ListSortOrder } from 'src/app/models/kodiInterfaces/listItem';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-musics-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss'],
  
})
export class MusicsMusicsComponent implements OnInit {

  songs: AudioDetailsSong[] = [];

  constructor(private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(){
    this.kodiApi.media.getSongs({}).subscribe(resp => {
      if(resp?.songs)
        this.songs = resp.songs;
    })
  }

  

}
