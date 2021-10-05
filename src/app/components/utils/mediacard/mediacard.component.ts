import { Component, Input, OnInit } from '@angular/core';
import { VideoCast, VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import {Location} from '@angular/common'; 
import { AudioDetailsAlbum, AudioDetailsArtist } from 'src/app/models/kodiInterfaces/audio';
import { Router } from '@angular/router';
import { LibraryDetailsGenre } from 'src/app/models/kodiInterfaces/library';

@Component({
  selector: 'app-mediacard',
  templateUrl: './mediacard.component.html',
  styleUrls: ['./mediacard.component.scss'],
  animations: [
    
  ]
})
export class MediacardComponent implements OnInit {

  @Input() media!: VideoDetailsMovie | VideoDetailsTVShow | AudioDetailsAlbum | AudioDetailsArtist | LibraryDetailsGenre | VideoCast | string;
  @Input() isDisabled:boolean = false;
  @Input() openUrl:string = "";

  isImgLoaded = false;

  posterLoaded = false;
  posterUrl = "";

  displayResume = false;
  resume = 0;

  constructor(private kodiApi:KodiApiService, private location:Location, private application: ApplicationService, private router:Router) { }

  ngOnInit(): void {

    let imageFile = "";
    if((this.media as VideoDetailsMovie).movieid){
      imageFile = (this.media as VideoDetailsMovie).art?.poster ?? "";
    }

    if((this.media as VideoDetailsTVShow).tvshowid){
      imageFile = (this.media as VideoDetailsTVShow).art?.poster ?? "";
    }

    if((this.media as AudioDetailsAlbum).albumid){
      imageFile = (this.media as AudioDetailsAlbum).art?.thumb ?? "";
    }

    if((this.media as AudioDetailsArtist).artistid){
      imageFile = (this.media as AudioDetailsArtist).art?.thumb ?? "";
    }

    if((this.media as VideoCast).thumbnail){
      imageFile = (this.media as AudioDetailsArtist).thumbnail ?? "";
    }
    
    if(imageFile != ""){
      this.kodiApi.file.getPreparedFileUrl(imageFile).subscribe((resp) => {
        this.posterUrl = resp;
        this.posterLoaded = true;
      });
    } else {
      this.isImgLoaded = true;
    }
    
    if((this.media as VideoDetailsMovie).movieid){

      if((this.media as VideoDetailsMovie)?.resume?.position){
        this.resume = 100 - 100*((this.media as VideoDetailsMovie)?.resume?.position ?? 0) / ((this.media as VideoDetailsMovie)?.resume?.total ?? 0);
        this.displayResume = true;
      }
      
    }
  }

  openDetails(){
    if(this.isDisabled) return;
    
    if((this.media as VideoDetailsMovie).movieid){
      this.application.openMovieDetails = this.media as VideoDetailsMovie;
      this.location.go("/movie/" + this.application.openMovieDetails.movieid);
    } else if((this.media as VideoDetailsTVShow).tvshowid){
      this.application.openTVShowDetails = (this.media as VideoDetailsTVShow);
      this.location.go("/tvshow/" + this.application.openTVShowDetails.tvshowid);
    } else if((this.media as AudioDetailsAlbum).albumid){
      this.router.navigateByUrl("/musics/album/" + (this.media as AudioDetailsAlbum).albumid)
    } else if((this.media as AudioDetailsArtist).artistid){
      this.router.navigateByUrl("/musics/artist/" + (this.media as AudioDetailsArtist).artistid)
    } else if((this.media as LibraryDetailsGenre).genreid){
      this.router.navigateByUrl("/musics/genre/" + encodeURIComponent((this.media as LibraryDetailsGenre).title))
    } else {
      
    }
  }

  imageLoaded(){
    this.isImgLoaded = true;
  }

}
