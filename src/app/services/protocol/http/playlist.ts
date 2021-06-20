import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseWithLimits } from "src/app/models/kodiInterfaces/others";
import { fullPlaylistItemProperties } from "src/app/models/playlist";
import { HttpRequestData } from "./http";

export class PlaylistRequest extends HttpRequestData {

    constructor(http:HttpClient){
        super(http)
    }

    getPlaylists() : Observable<any> {
        const req = this.getRequestUrl("getplaylists", "Playlist.GetPlaylists", {}) 
        return this.makeGetRequest(req);
    }

    getPlaylistItem(playlistid: number): Observable<ResponseWithLimits>{

        let params = {
          'playlistid' : playlistid,
          'properties' : fullPlaylistItemProperties
        }
    
        const req = this.getRequestUrl("getplaylistitem", "Playlist.GetItems", params)
    
        return this.makeGetRequest(req);
    }

    async add(playlistid: number, item: any){
        const req = this.getRequestParams("playlistadd", "Playlist.Add", { "playlistid" : playlistid, "item" : item})   
        await this.makePostRequest(req).toPromise()
    }

    clear(playlistid: number){
        const req = this.getRequestParams("playlistclear", "Playlist.Clear", { "playlistid" : playlistid})   
        this.makePostRequest(req).subscribe();
    }

    

}