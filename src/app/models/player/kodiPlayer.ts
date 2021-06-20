import { interval, Subscription } from "rxjs";
import { KodiApiService } from "src/app/services/kodi-api.service";
import { ListItemAll } from "../kodiInterfaces/listItem";
import { GlobalTime } from "../kodiInterfaces/others";
import { PlayerAudioStream, PlayerPropertyValue, PlayerSubtitle } from "../kodiInterfaces/player";
import { ControlPlayer } from "./player";

export class KodiPlayer implements ControlPlayer {

    playerid: number;
    title:string;
    
    properties: PlayerPropertyValue | undefined;
    subscriptionIncrementProgress: Subscription | undefined;

    playlistItems: ListItemAll[] = [];

    constructor(playerid: number, private kodiApi:KodiApiService,){
        this.playerid = playerid;
        this.title = "Kodi";
    }
    

    playerItem: ListItemAll | undefined;
    playerIllustration: string = "";
    
    loadPlayer(): void {
        this.kodiApi.player.getPlayerItem(this.playerid).subscribe((items) => {
            this.playerItem = items.item;
      
            let findUrl:string = "";
            if(!this.playerItem) return;

            if(this.playerItem.type == "movie"){
              findUrl = this.playerItem?.art?.poster ?? "";
            }
      
            if(this.playerItem.type == "episode"){
              findUrl = this.playerItem?.art?.thumb ?? "";
            }
      
            if(this.playerItem.type == "song"){
              findUrl = this.playerItem?.thumbnail ?? "";
            }
      
            this.kodiApi.file.getPreparedFileUrl(findUrl).subscribe((url) => {
              this.playerIllustration = url;
            });
      
        });
      
        this.kodiApi.player.getPlayerProperties(this.playerid).subscribe((properties) => {
            this.properties = properties;
            this.incrementProgressTime();
        });
    }

    isPlaying(): boolean {
        if(!this.properties) return false;
        return this.properties.speed == 1;
    }

    incrementProgressTime(){

        const source = interval(1000);


        this.subscriptionIncrementProgress?.unsubscribe();
        

        if(!this.isPlaying()) return;

        this.subscriptionIncrementProgress = source.subscribe(val => {
            if(!this.properties) return; 

            this.properties.time.seconds+=1;
        
            if(this.properties.time.seconds<0){
                this.properties.time.seconds = 0;
            }
        
            if(this.properties.time.seconds == 60){
                this.properties.time.seconds = 0;
                this.properties.time.minutes+=1;
                if(this.properties.time.minutes == 60){
                this.properties.time.minutes = 0;
                this.properties.time.hours+=1;
                }
            }

            this.updateProgress();
        });

    }

    updateProgress(){
        if(!this.properties) return; 
        this.properties.percentage = (this.properties.time.seconds + this.properties.time.minutes*60 + this.properties.time.hours*3600) / (this.properties.totaltime.seconds + this.properties.totaltime.minutes*60 + this.properties.totaltime.hours*3600)*100;
    }

    tooglePlayPause(){
        this.kodiApi.player.playPause(this.playerid, !this.isPlaying())
        // this.onPlayPause(!this.isPlaying())
    }

    setSubtitle(subtitle: PlayerSubtitle){
        this.kodiApi.player.setSubtitle(this.playerid, subtitle.index, true);
        this.onSubtitleChange(subtitle);
        this.onSubtitleEnableChange(true);
    }

    toggleSubtitle(){
        if(!this.properties) return; 
        this.kodiApi.player.setSubtitle(this.playerid, this.properties?.currentsubtitle?.index ?? 0, !this.properties.subtitleenabled)
        this.onSubtitleEnableChange(!this.properties.subtitleenabled);
    }

    setAudioStream(audioStream: PlayerAudioStream){
        this.kodiApi.player.setAudioStream(this.playerid, audioStream.index);
        this.onAudioStreamChange(audioStream);
    }

    setSeek(percent: any){
        if(!this.properties) return; 
        const totalSeconds:number = (this.properties.totaltime.seconds + this.properties.totaltime.minutes*60 + this.properties.totaltime.hours*3600);
        const currentSeconds: number = (this.properties.time.seconds + this.properties.time.minutes*60 + this.properties.time.hours*3600);
        let newSeconds = totalSeconds*percent/100

        let diff = Number((newSeconds - currentSeconds).toFixed(0));

        this.setFixedSeek(diff);
    }

    setFixedSeek(second: number){
        this.kodiApi.player.seek(this.playerid, second);
    }

    stop(){
        this.kodiApi.player.stop(this.playerid);
        this.onStop();
    }

    goTo(position: number){
        this.kodiApi.player.goTo(this.playerid, position);
    }

    goForward(){
        this.kodiApi.player.goTo(this.playerid, "next");
    }

    goBackward(){
        this.kodiApi.player.goTo(this.playerid, "previous");
    }


    onPlayPause(play:boolean){  
        if(!this.properties) return; 
        this.properties.speed = play ? 1 : 0;
        this.incrementProgressTime();
    }

    onSubtitleChange(subtitle: PlayerSubtitle){
        if(!this.properties) return; 
        this.properties.currentsubtitle = subtitle;
    }

    onSubtitleEnableChange(enable: boolean){
        if(!this.properties) return; 
        this.properties.subtitleenabled = enable;
    }

    onAudioStreamChange(audioStream: PlayerAudioStream){
        if(!this.properties) return; 
        this.properties.currentaudiostream = audioStream;
    }

    onSeek(time: GlobalTime){
        if(!this.properties) return; 
        this.properties.time = time;
        this.updateProgress();
    }

    onStop(){
    
    }

    loadPlaylist(): void {
        this.kodiApi.playlist.getPlaylistItem(this.properties?.playlistid ?? 0).subscribe((items) => {
            this.playlistItems = items.items;
        });   
    }

}