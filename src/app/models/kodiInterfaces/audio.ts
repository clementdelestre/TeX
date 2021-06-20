import { ItemDetailsBase, MediaArtwork, MediaDetailsBase } from "./others";

export interface AudioDetailsMedia extends AudioDetailsBase {
    artist?: string[];
    artistid?: number[];
    displayartist?: string;
    musicbrainzalbumartistid?: string[];
    orignialdate?: string;
    rating?: number;
    releasedate?: string;
    sortartist?: string;
    title?: string;
    userrating?: number;
    votes?: number;
    year?: number;
};

export interface AudioDetailsBase extends MediaDetailsBase {
    art?: MediaArtwork;
    dateadded?: string;
    genre?: string[];
}

export enum AudioAlbumReleaseType {
    single,
    album
}

export interface AudioDetailsAlbum extends AudioDetailsMedia {
    albumduration?: number;
    albumid: number;
    albumlabel ?: string;
    albumstatus?: string;
    compilation?: boolean;
    description?: string;
    isboxset?: boolean;
    lastplayed?: string;
    mood?: string[];
    musicbrainzalbumid?: string;
    musicbrainzreleasegroupid?: string;
    playcount?: number;
    releasetype?: AudioAlbumReleaseType
    songgenres?: AudioDetailsGenres[];
    sourceid?: number[];
    style?: string[];
    theme?: string[];
    totaldiscs?: number;
    type?: string;
}

export interface AudioDetailsArtist extends AudioDetailsBase {
    artist?: string;
    artistid: number;
    born?: string;
    compilationartist?: boolean;
    description?: string;
    died?: string;
    disambiguation?: string;
    disbanded?: string;
    formed?: string;
    gender?: string;
    instrument?: string[];
    isalbumartist?: boolean;
    mood?: string[];
    musicbrainzartistid?: string[];
    roles?: AudioArtistRole[];
    songgenres?: AudioDetailsGenres[];
    sortname?: string;
    sourceid?: number[];
    style?: string[];
    type?: string;
    yearsactive?: string[];
}

export interface AudioDetailsGenres {
    genreid: number;
    title: string;
}

export interface AudioDetailsRoles extends ItemDetailsBase {
    roleid: number;
    title: string;
}

export interface AudioDetailsSong extends AudioDetailsMedia {
    album?: string;
    albumartist?: string[];
    albumartistid?: number[];
    albumid?: number;
    albumreleasetype?: AudioAlbumReleaseType;
    bitrate?: any;
    npm?: any;
    channels?: any;
    comment?: string;
    contrinutors?: AudioContributor[];
    disc?: number;
    disctitle?: string;
    displaycomposer?: string;
    displayconductor?: string;
    displaylyricist?: string;
    displayorchestra?: string;
    duration?: number;
    file?: string;
    genreid?: number[];
    lastplayed?: string;
    lyrics?: string;
    mood?: string;
    musicbrainzartistid?: string[];
    musicbrainztrackid?: string;
    playcount?: number;
    samplerate?: any;
    songid: number;
    sourceid?: number[];
    track?: number;
}

export interface AudioContributor {
    artistid: string;
    name: string;
    role: string;
    roleid: number;
}

export interface AudioArtistRole {
    role: string;
    roleid: number;
}

