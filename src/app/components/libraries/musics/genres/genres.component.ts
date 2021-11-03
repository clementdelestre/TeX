import { Component, OnInit } from '@angular/core';
import { fastFadeAnimation } from 'src/app/models/appAnimation';
import { LibraryDetailsGenre } from 'src/app/models/kodiInterfaces/library';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-musics-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [
    fastFadeAnimation
  ]
})
export class GenresComponent implements OnInit {

  genres: LibraryDetailsGenre[] = []

  constructor(private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this.kodiApi.media.getAudioLibraryGenres({}).subscribe(resp =>{
      if(resp?.genres)
        this.genres = resp.genres;
    })
  }

}
