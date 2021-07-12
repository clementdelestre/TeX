import { Component, OnInit } from '@angular/core';
import { fastFadeAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsArtist } from 'src/app/models/kodiInterfaces/audio';
import { ListSort, ListSortMethod, ListSortOrder } from 'src/app/models/kodiInterfaces/listItem';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-musics-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
  animations: [
    fastFadeAnimation
  ]
})
export class ArtistsComponent implements OnInit {

  artists: AudioDetailsArtist[] = [];

  constructor(private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists(){
    
    const sort:ListSort = {
      ignorearticle: true,  
      method: ListSortMethod.artist, 
      order: ListSortOrder.ascending
    };

    this.kodiApi.media.getArtists({sort:sort}).subscribe(resp => {
      if(resp?.artists)
        this.artists = resp.artists;
    })
  }

}
