import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {  map } from "rxjs/operators";
import { FilterAvailableData } from "src/app/models/filter";
import { AudioDetailsAlbum, AudioDetailsArtist, AudioDetailsSong } from "src/app/models/kodiInterfaces/audio";
import { AudioFieldsAlbumPropertiesFull, AudioFieldsAlbumPropertiesMinimal, AudioFieldsArtistPropertiesFull, AudioFieldsArtistPropertiesMinimal, AudioFieldsSongPropertiesFull, AudioFieldsSongPropertiesMinimal } from "src/app/models/kodiInterfaces/audiofields";
import { LibraryFieldsGenreProperties } from "src/app/models/kodiInterfaces/libraryfields";
import { ListSort } from "src/app/models/kodiInterfaces/listItem";
import { ListLimits, ResponseWithLimits, fullMovieSetProperties, MovieSetDetails } from "src/app/models/kodiInterfaces/others";
import { episodeProperties, fullMovieProperties, fullTVShowProperties, previewMovieProperties, previewTVShowProperties, seasonProperties, VideoDetailsMovie, VideoDetailsTVShow } from "src/app/models/kodiInterfaces/video";
import { HttpRequestData } from "./http";

export interface GetLibraryParameters {
  limit?: ListLimits
  filter?: any
  sort?: ListSort
  properties?: string[]
  type?: string
}

export class MediaRequest extends HttpRequestData {


  constructor(http:HttpClient){
      super(http);
  }
  
  getMovies(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{
      
      const params = {
        "properties": parameter.properties ?? previewMovieProperties,
        ...parameter.filter ? {"filter" : parameter.filter} : undefined,
        ...parameter.limit ? {"limits" : parameter.limit} : undefined,
        ...parameter.sort ? { "sort" : parameter.sort } : undefined
      }

      const req = this.getRequestUrl("getmovies", "VideoLibrary.GetMovies", params)

      return this.makeGetRequest(req);
  }

  getMovieSets(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{
    
    const params = {
      "properties": parameter.properties ?? previewMovieProperties,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }

    const req = this.getRequestUrl("getmovies", "VideoLibrary.GetMovieSets", params)

    return this.makeGetRequest(req);
  }

  getRecentlyAddedMovies(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{
      
    const params = {
      "properties": previewMovieProperties,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }

    const req = this.getRequestUrl("getrecentlyaddedmovies", "VideoLibrary.GetRecentlyAddedMovies", params)

    return this.makeGetRequest(req);
  }

  getMovieDetail(movieId: number): Observable<VideoDetailsMovie>{

      let params = {
        "movieid" : movieId,
        "properties": fullMovieProperties,
      }
  
      const req = this.getRequestUrl("getmoviedetail", "VideoLibrary.GetMovieDetails", params);
      return this.makeGetRequest(req).pipe(
        map(rep => rep.moviedetails)
      );
  }

  getMovieSetDetail(movieSetId: number): Observable<MovieSetDetails> {
    let params = {
      "setid": movieSetId,
      "properties": fullMovieSetProperties,
    };

    const req = this.getRequestUrl("getmoviesetdetail", "VideoLibrary.GetMovieSetDetails", params);
    return this.makeGetRequest(req).pipe(
      map(rep => { return rep.setdetails })
    );
  }

  getTvShows(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{

    const params = {
      "properties": parameter.properties ?? previewTVShowProperties,
      ...parameter.filter ? {"filter" : parameter.filter} : undefined,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }

    const req = this.getRequestUrl("gettvshows", "VideoLibrary.GetTvShows", params)

    return this.makeGetRequest(req);
  }

  getInProgressTvShows(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{

    const params = {
      "properties": previewTVShowProperties,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }

    const req = this.getRequestUrl("gettvshows", "VideoLibrary.GetInProgressTVShows", params)

    return this.makeGetRequest(req);
  }
  
  
  getTvShowDetail(tvshowId: number): Observable<VideoDetailsTVShow>{
  
    let params = {
      "tvshowid" : tvshowId,
      "properties": fullTVShowProperties,
    }

    const req = this.getRequestUrl("gettvshowdetail", "VideoLibrary.GetTvShowDetails", params)
    return this.makeGetRequest(req).pipe(
      map(rep => { return rep.tvshowdetails})
    );
  }

  getSeasons(tvshowId: number): Observable<ResponseWithLimits>{

    let params = {
      "tvshowid" : tvshowId,
      "properties": seasonProperties,
    }

    const req = this.getRequestUrl("getseasons", "VideoLibrary.GetSeasons", params)
    return this.makeGetRequest(req);
  }
  
  getEpisodes(tvshowId: number, seasonId: number): Observable<ResponseWithLimits>{

    let params = {
      "tvshowid" : tvshowId,
      "season" : seasonId,
      "properties": episodeProperties,
    }

    const req = this.getRequestUrl("getepisodes", "VideoLibrary.GetEpisodes", params)
    return this.makeGetRequest(req);
  }

  // setMovieDetails(movieid: number, values: Map<string, any>): Observable<any>{
  //     values.set("movieid", movieid);      
  //     let obj = Array.from(values).reduce((obj, [key, value]) => (
  //       Object.assign(obj, { [key]: value })
  //     ), {});   
  //     const req = this.getRequestParams("setmoviedetails", "VideoLibrary.SetMovieDetails", obj)
  //     return this.makePostRequest(req);
  // }

  // setTvShowDetails(tvshowid: number, values: Map<string, any>): Observable<any>{
  //   values.set("tvshowid", tvshowid);      
  //   let obj = Array.from(values).reduce((obj, [key, value]) => (
  //     Object.assign(obj, { [key]: value })
  //   ), {});   
  //   const req = this.getRequestParams("settvshowdetails", "VideoLibrary.SetTVShowDetails", obj)
  //   return this.makePostRequest(req);
  // }

  setEpisodeDetails(episodeid: number, values: Map<string, any>): Observable<any>{
    values.set("episodeid", episodeid);      
    let obj = Array.from(values).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {});   
    const req = this.getRequestParams("setepisodedetails", "VideoLibrary.SetEpisodeDetails", obj)
    return this.makePostRequest(req);
  }

  async getFiltersValue(): Promise<FilterAvailableData> {

    
    let years: Array<string> = [];
    let genres: string[] = [];

    let params = {
      "properties": ["year", "genre"]
    }

    await this.makeGetRequest(this.getRequestUrl("getmovies", "VideoLibrary.GetMovies", params)).toPromise().then(resp => {
      (resp as ResponseWithLimits).movies.forEach(movie => {
        if(years.indexOf(String(movie.year))==-1){
          years.push(String(movie.year))
        }
        if(movie.genre)
        movie.genre.forEach(genre => {
          if(genres.indexOf(genre) == -1 && genre.indexOf("&") == -1){
            genres.push(genre)
          }
        })
       
      });
    });

    await this.makeGetRequest(this.getRequestUrl("gettvshows", "VideoLibrary.GetTvShows", params)).toPromise().then(resp => {
      (resp as ResponseWithLimits).tvshows.forEach(tvshow => {
        if(years.indexOf(String(tvshow.year))==-1){
          years.push(String(tvshow.year))
        }
        if(tvshow.genre)
        tvshow.genre.forEach(genre => {
          if(genres.indexOf(genre) == -1 && genre.indexOf("&") == -1){
            genres.push(genre)
          }
        })
       
      });
    });

    let data: FilterAvailableData = {
      year: years.sort().reverse(), // years.sort((n1,n2) => n1 - n2).reverse(),
      genre: genres.sort()
    }

    return data;
  }

  scanVideoLibrary(): Observable<any>{  
    const req = this.getRequestParams("scanVideoLibrary", "VideoLibrary.Scan", { "showdialogs" : false})
    return this.makePostRequest(req);
  }

  cleanVideoLibrary(): Observable<any>{  
    const req = this.getRequestParams("scanVideoLibrary", "VideoLibrary.Clean", { "showdialogs" : false})
    return this.makePostRequest(req);
  }


  //Audio

  getAlbums(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{    
    const params = {
      "properties": AudioFieldsAlbumPropertiesMinimal,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.filter ? {"filter" : parameter.filter} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }
    const req = this.getRequestUrl("getalbums", "AudioLibrary.GetAlbums", params)
    return this.makeGetRequest(req);
  }

  getAlbumDetails(albumid: number): Observable<AudioDetailsAlbum>{    
    const params = {
      "albumid" : albumid,
      "properties": AudioFieldsAlbumPropertiesFull,
    }

    const req = this.getRequestUrl("getalbumdetails", "AudioLibrary.GetAlbumDetails", params)
    return this.makeGetRequest(req).pipe(
      map(rep => { return rep.albumdetails})
    );

  }

  getRecentlyPlayedAlbums(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{    
    const params = {
      "properties": AudioFieldsAlbumPropertiesMinimal,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }
    const req = this.getRequestUrl("getrecentlyplayedalbums", "AudioLibrary.GetRecentlyPlayedAlbums", params)
    return this.makeGetRequest(req);
  }

  getRecentlyAddedAlbums(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{    
    const params = {
      "properties": AudioFieldsAlbumPropertiesMinimal,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }
    const req = this.getRequestUrl("getrecentlyaddedalbums", "AudioLibrary.GetRecentlyAddedAlbums", params)
    return this.makeGetRequest(req);
  }

  getSongs(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{    
    const params = {
      "properties": AudioFieldsSongPropertiesMinimal,
      ...parameter.filter ? {"filter" : parameter.filter} : undefined,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }
    const req = this.getRequestUrl("getsongs", "AudioLibrary.GetSongs", params)
    return this.makeGetRequest(req);
  }

  getSongsDetails(songid: number): Observable<AudioDetailsSong>{    
    const params = {
      "songid" : songid,
      "properties" : AudioFieldsSongPropertiesFull
    }
    const req = this.getRequestUrl("getsongs", "AudioLibrary.GetSongDetails", params)
    return this.makeGetRequest(req).pipe(
      map(rep => { return rep.songdetails})
    );
  }

  getArtists(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{    
    const params = {
      "properties": AudioFieldsArtistPropertiesMinimal,
      "albumartistsonly": true,
      ...parameter.filter ? {"filter" : parameter.filter} : undefined,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined,
    }
    const req = this.getRequestUrl("getartists", "AudioLibrary.GetArtists", params)
    return this.makeGetRequest(req);
  }

  getArtistDetails(artistid: number): Observable<AudioDetailsArtist>{    
    const params = {
      "artistid" : artistid,
      "properties" : AudioFieldsArtistPropertiesFull
    }
    const req = this.getRequestUrl("getsongs", "AudioLibrary.GetArtistDetails", params)
    return this.makeGetRequest(req).pipe(
      map(rep => { return rep.artistdetails})
    );
  }

  scanAudioLibrary(): Observable<any>{  
    const req = this.getRequestParams("scanAudioLibrary", "AudioLibrary.Scan", { "showdialogs" : false})
    return this.makePostRequest(req);
  }

  cleanAudioLibrary(): Observable<any>{  
    const req = this.getRequestParams("scanAudioLibrary", "AudioLibrary.Clean", { "showdialogs" : false})
    return this.makePostRequest(req);
  }


  // Library

  getAudioLibraryGenres(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{  
    const params = {
      "properties": LibraryFieldsGenreProperties,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined
    }
    const req = this.getRequestUrl("getaudiogenres", "AudioLibrary.GetGenres", params)
    return this.makeGetRequest(req);
  }

  getVideoLibraryGenres(parameter : GetLibraryParameters): Observable<ResponseWithLimits>{   
    const params = {
      "properties": LibraryFieldsGenreProperties,
      ...parameter.limit ? {"limits" : parameter.limit} : undefined,
      ...parameter.sort ? { "sort" : parameter.sort } : undefined,
      ...parameter.type ? { "type" : parameter.type } : undefined
    }
    const req = this.getRequestUrl("getvideogenres", "VideoLibrary.GetGenres", params)
    return this.makeGetRequest(req);
  }

  refreshMovie(movieid:number){
    const req = this.getRequestParams("refreshmovie", "VideoLibrary.RefreshMovie", { "movieid" : movieid, })   
    this.makePostRequest(req).subscribe();  
  }

  refreshTvShow(tvshowid:number){
    const req = this.getRequestParams("refreshtvshow", "VideoLibrary.RefreshTVShow", { "tvshowid" : tvshowid, })   
    this.makePostRequest(req).subscribe();  
  }

  refreshEpisode(episodeid:number){
    const req = this.getRequestParams("refreshepisode", "VideoLibrary.RefreshEpisode", { "episodeid" : episodeid, })   
    this.makePostRequest(req).subscribe();  
  }

  setMovieDetails(params : any): Observable<any>{
    //require movieid
    const req = this.getRequestParams("setmoviedet", "VideoLibrary.SetMovieDetails", params)
    return this.makePostRequest(req)
  }

  removeMovie(movieid : number): Observable<any>{
    const req = this.getRequestParams("setmoviedet", "VideoLibrary.RemoveMovie", {"movieid" : movieid})
    return this.makePostRequest(req)
  }

  setTvShowDetails(params : any): Observable<any>{
    //require tvshowid
    const req = this.getRequestParams("setmoviedet", "VideoLibrary.SetTVShowDetails", params)
    return this.makePostRequest(req)
  }

  removeTvShow(tvshowid : number): Observable<any>{
    const req = this.getRequestParams("setmoviedet", "VideoLibrary.RemoveTVShow", {"tvshowid" : tvshowid})
    return this.makePostRequest(req)
  }
}
