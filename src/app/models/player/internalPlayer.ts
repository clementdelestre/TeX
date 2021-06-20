import { Subscription } from "rxjs";
import { KodiApiService } from "src/app/services/kodi-api.service";
import { PlayerService } from "src/app/services/player.service";
import { AudioDetailsSong } from "../kodiInterfaces/audio";
import { ListItemAll } from "../kodiInterfaces/listItem";
import { GlobalTime } from "../kodiInterfaces/others";
import { PlayerPropertyValue, PlayerSubtitle, PlayerAudioStream } from "../kodiInterfaces/player";
import { VideoDetailsEpisode, VideoDetailsMovie } from "../kodiInterfaces/video";
import { ControlPlayer } from "./player";

export class InternalPlayer implements ControlPlayer {

    playerid: number = 999;
    title:string;

    properties: PlayerPropertyValue;
    playerItem: ListItemAll | undefined;
    playerIllustration: string = "";
    subscriptionIncrementProgress: Subscription | undefined;

    playlistItems: ListItemAll[] = [];    
    itemIndex = 0;

    isActive = false;

    audio = new Audio();

    constructor(private kodiApi: KodiApiService, private player: PlayerService){
        this.title = "library.musicsView.internalPlayer";

        this.properties = {
            time : {
                hours: 0,
                minutes : 0,
                seconds : 0,
                milliseconds : 0
            },
            totaltime: {
                hours: 0,
                minutes : 0,
                seconds : 0,
                milliseconds : 0
            }
        }

        this.audio.onplaying = e => this.onPlayPause(true);
        this.audio.onpause = e => this.onPlayPause(false);
        this.audio.onended = e => this.goForward();

        this.audio.onerror = e => {

        }

        this.audio.onclose = e => {
            this.onStop();
        }

        this.audio.ontimeupdate = e => {
            let secondsAudio = parseInt(this.audio.currentTime.toFixed(0));

            var hours   = Math.floor(secondsAudio / 3600);
            var minutes = Math.floor((secondsAudio - (hours * 3600)) / 60);
            var seconds = secondsAudio - (hours * 3600) - (minutes * 60);

            this.properties.time.seconds = seconds;
            this.properties.time.minutes = minutes;
            this.properties.time.hours = hours;

            this.properties.percentage = (secondsAudio / this.audio.duration)*100
        }

        this.audio.onloadedmetadata = e => {
            let secondsAudio = parseInt(this.audio.duration.toFixed(0));

            var hours   = Math.floor(secondsAudio / 3600);
            var minutes = Math.floor((secondsAudio - (hours * 3600)) / 60);
            var seconds = secondsAudio - (hours * 3600) - (minutes * 60);

            this.properties.totaltime.seconds = seconds;
            this.properties.totaltime.minutes = minutes;
            this.properties.totaltime.hours = hours;

            let nav: any;
            nav = window.navigator

            if(nav.mediaSession){
                // @ts-ignore
                nav.mediaSession.metadata = new MediaMetadata({
                    title: this.playerItem?.title,
                    artist: this.playerItem?.artist?.join(", "),
                    album: this.playerItem?.album,
                    artwork: [
                      { src: this.playerIllustration },
                    ],                   
                });

                nav.mediaSession.setActionHandler('previoustrack', () => this.goBackward());
                nav.mediaSession.setActionHandler('nexttrack', () => this.goForward());
            }         

        }

    }

    loadPlayer(): void {
        
    }

    openFile(file: string){
        
    }

    openPlaylist(){              
        this.startAudio(0);
    }

    private startAudio(index: number){
        this.itemIndex = index;   

        if(!this.isActive){
            this.isActive = true; 
            this.player.setDefaultPlayer()
            this.player.currentPlayer = this;
        }
        

        if(this.playlistItems[this.itemIndex].file){
            this.kodiApi.file.getPreparedFileUrl(this.playlistItems[this.itemIndex].file ?? "").subscribe((fileUrl) => {

                this.playerItem = this.playlistItems[this.itemIndex];

                this.audio.src = fileUrl
                this.audio.load();
                this.audio.play();


                let findUrl =this.playerItem.art?.["album.thumb"] ?? "";
                             
                if(findUrl != "")
                this.kodiApi.file.getPreparedFileUrl(findUrl).subscribe((url) => {
                    this.playerIllustration = url;
                });

            });           
        }       
    }

    isPlaying(): boolean {
        if(!this.properties) return false;
        return this.properties.speed == 1;
    }
    
    updateProgress(): void {
        throw new Error("Method not implemented.");
    }

    tooglePlayPause(): void {
        this.audio.paused ? this.audio.play() : this.audio.pause()
    }

    setSubtitle(subtitle: PlayerSubtitle): void {
        throw new Error("Method not implemented.");
    }

    toggleSubtitle(): void {
        throw new Error("Method not implemented.");
    }

    setAudioStream(audioStream: PlayerAudioStream): void {
        throw new Error("Method not implemented.");
    }

    setSeek(percent: any): void {
        this.audio.currentTime = this.audio.duration * percent / 100
    }

    setFixedSeek(second: number): void {
        this.audio.currentTime += second;
    }

    stop(): void {
        this.onStop();
    }

    goTo(position: number): void {
        this.startAudio(position);
    }

    goForward(): void {
        if(this.itemIndex < this.playlistItems.length-1){
            this.startAudio(this.itemIndex+1);
        } else {
            this.stop();
        }           
    }

    goBackward(): void {
        if(this.itemIndex > 0){
            this.startAudio(this.itemIndex-1);
        } else {
            this.audio.currentTime = 0;
        }         
    }

    onPlayPause(play: boolean): void {
        if(this.properties)
            this.properties.speed = play ? 1 : 0;
    }

    onSubtitleChange(subtitle: PlayerSubtitle): void {
        throw new Error("Method not implemented.");
    }

    onSubtitleEnableChange(enable: boolean): void {
        throw new Error("Method not implemented.");
    }

    onAudioStreamChange(audioStream: PlayerAudioStream): void {
        throw new Error("Method not implemented.");
    }

    onSeek(time: GlobalTime): void {
        throw new Error("Method not implemented.");
    }

    onStop(): void {
        console.log("Internal player stopped")
        this.audio.src = "";
        this.itemIndex = 0;
        this.isActive = false;
        this.playerItem = undefined;
        this.playerIllustration = "";
        this.player.setDefaultPlayer();
    }

    loadPlaylist(): void {
        
    }

    async playlistClear(): Promise<void> {
        this.playlistItems = [];
        return Promise.resolve();
    }

    playlistAddAll(items: VideoDetailsMovie[] | VideoDetailsEpisode[] | AudioDetailsSong[]) {
        items.forEach((item:VideoDetailsMovie | VideoDetailsEpisode | AudioDetailsSong) => {
            this.playlistItems.push({
                title: item.title,
                file:item.file,
                art: item.art,
                id: (item as AudioDetailsSong).songid,
                ...(item as AudioDetailsSong).songid ? {songid: (item as AudioDetailsSong).songid} : undefined,
                ...(item as AudioDetailsSong).songid ? {type: 'song'} : undefined,
                ...(item as AudioDetailsSong).artist ? {artist: (item as AudioDetailsSong).artist} : undefined,
                ...(item as AudioDetailsSong).albumartist ? {albumartist: (item as AudioDetailsSong).albumartist} : undefined,
            })
        })
    }

}