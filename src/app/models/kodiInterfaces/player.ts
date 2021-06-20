import { GlobalTime } from "./others";

export enum PlayerType {
    "video",
    "audio",
    "picture"
}

export enum PlayerPlayerType {
    "internal",
    "external",
    "remote"
}

export interface Player {
    name: string;
    playsaudio: boolean;
    playsvideo: boolean;
    type: string;
}

export interface ActivePlayer {
    playerid: number;
    playertype: PlayerPlayerType;
    type: PlayerType;
}

export interface PlayerPropertyValue {
    audiostreams?: any[];
    cachepercentage?: number;
    canchangespeed?: boolean;
    canmove?: boolean;
    canrepear?: boolean;
    canrotate?: boolean;
    canseek?: boolean;
    canshuffle?: boolean;
    canzoom?: boolean;
    currentaudiostream?: PlayerAudioStream;
    currentsubtitle?: PlayerSubtitle;
    currentvideostream?: PlayerVideoStream;
    live?: boolean;
    partymode?: boolean;
    percentage?: number;
    playlistid?: number;
    position?: number;
    repeat?: PlayerReapeat;
    shuffled?: boolean;
    speed?: number;
    subtitleenabled?: boolean;
    subtitles?: PlayerSubtitle[];
    time: GlobalTime;
    totaltime: GlobalTime;
    type?: PlayerType;
    videostreams?: PlayerVideoStream[]
}

export interface PlayerAudioStream {
    bitrate: number;
    channels: number;
    codec: string;
    index: number;
    isdefault: boolean;
    isimpaired: boolean;
    isorignia: boolean;
    language: string;
    name: string;
    samplerate: number;
}

export interface PlayerVideoStream {
    codec: string;
    height: number;
    index: number;
    language: string;
    name: string;
    width: number;
}



export interface PlayerSubtitle {
    index: number;
    isdefault: boolean;
    isforced: boolean;
    isimpaired: boolean;
    language: boolean;
    name: string;
}

export enum PlayerReapeat {
    "off",
    "one",
    "all"
}