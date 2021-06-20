import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ListItemAll } from "src/app/models/kodiInterfaces/listItem";
import { ActivePlayer, PlayerPropertyValue, PlayerSubtitle } from "src/app/models/kodiInterfaces/player";
import { fullPlayerItemProperties, fullPlayerPropertyName } from "src/app/models/kodiInterfaces/playerproperties";
import { HttpRequestData } from "./http";

export class PlayerRequest extends HttpRequestData {

    constructor(http:HttpClient){
        super(http)
    }

    getActivePlayers(): Observable<ActivePlayer[]>{

      let params = { }
  
      const req = this.getRequestUrl("getactiveplayers", "Player.GetActivePlayers", params)
      return this.makeGetRequest(req);
    }
  
    getPlayerItem(playerid: number): Observable<any>{
  
      let params = {
        'playerid' : playerid,
        'properties' : fullPlayerItemProperties
      }
  
      const req = this.getRequestUrl("getplayeritem", "Player.GetItem", params)
      return this.makeGetRequest(req);
    }
  
    getPlayerProperties(playerid: number): Observable<PlayerPropertyValue>{
  
      let params = {
        'playerid' : playerid,
        'properties' : fullPlayerPropertyName
      }
  
      const req = this.getRequestUrl("getplayerproperties", "Player.GetProperties", params)
      return this.makeGetRequest(req);
    }

    goTo(playerid: number, position: number | string){
      const req = this.getRequestParams("playergoto", "Player.GoTo", { "playerid" : playerid, "to" : position, })   
      this.makePostRequest(req).subscribe();
    }

    open(item: any){
      const req = this.getRequestParams("playeropen", "Player.Open", { "item": item})   
      this.makePostRequest(req).subscribe();
    }

    stop(playerid: number){
      const req = this.getRequestParams("playerstop", "Player.Stop", {"playerid" : playerid})   
      this.makePostRequest(req).subscribe();
    }

    playPause(playerid: number, play: boolean){
      const req = this.getRequestParams("playergoto", "Player.PlayPause", {"playerid" : playerid, "play" : play})   
      this.makePostRequest(req).subscribe();
    }

    setAudioStream(playerid: number, stream: number){
      const req = this.getRequestParams("playersetaudiostream", "Player.SetAudioStream", { "playerid" : playerid, "stream" : stream, })   
      this.makePostRequest(req).subscribe();
    }

    seek(playerid: number, seek: number){
      const req = this.getRequestParams("playerseek", "Player.Seek", { "playerid" : playerid, "value" : { "seconds" : seek }})   
      this.makePostRequest(req).subscribe();
    }

    setSubtitle(playerid: number, subtitleId: number, enable: boolean){
      const req = this.getRequestParams("playersetsubtitle", "Player.SetSubtitle", { "playerid" : playerid, "subtitle" : enable ? subtitleId : "off", "enable" : enable })   
      this.makePostRequest(req).subscribe();
    }

}