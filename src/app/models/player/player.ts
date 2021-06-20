import { Subscription } from "rxjs";
import { ListItemAll } from "../kodiInterfaces/listItem";
import { GlobalTime } from "../kodiInterfaces/others";
import { PlayerAudioStream, PlayerPropertyValue, PlayerSubtitle } from "../kodiInterfaces/player";

export interface ControlPlayer {

    playerid: number;
    title: string;
    
    properties: PlayerPropertyValue | undefined;

    playerItem: ListItemAll | undefined;
    playlistItems: ListItemAll[];

    playerIllustration: string;

    subscriptionIncrementProgress: Subscription | undefined;

    loadPlayer() : void;
    isPlaying() : boolean;

    updateProgress() : void;
    tooglePlayPause() : void;
    setSubtitle(subtitle: PlayerSubtitle): void;
    toggleSubtitle() : void;
    setAudioStream(audioStream: PlayerAudioStream) : void;
    setSeek(percent: any) : void;
    setFixedSeek(second: number) : void;
    stop() : void;
    goTo(position: number) : void;
    goForward() : void;
    goBackward() : void;

    onPlayPause(play:boolean) : void;
    
    onSubtitleChange(subtitle: PlayerSubtitle) : void;

    onSubtitleEnableChange(enable: boolean) : void;

    onAudioStreamChange(audioStream: PlayerAudioStream) : void;

    onSeek(time: GlobalTime) : void;

    onStop() : void;

    loadPlaylist() : void
}