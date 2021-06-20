import { AudioDetailsAlbum, AudioDetailsArtist, AudioDetailsGenres, AudioDetailsSong } from "./audio";
import { LibraryDetailsGenre } from "./library";
import { ListItemAll } from "./listItem";
import { VideoDetailsEpisode, VideoDetailsMovie, VideoDetailsSeason, VideoDetailsTVShow } from "./video";

export interface ListLimits {
    end: number;
    start: number;
}

export interface ListLimitsReturned {
    end: number;
    start: number;
    total: number;
}

export interface ResponseWithLimits {
    limits: ListLimitsReturned,
    tvshows: VideoDetailsTVShow[],
    movies: VideoDetailsMovie[],
    seasons: VideoDetailsSeason[],
    episodes: VideoDetailsEpisode[],
    albums: AudioDetailsAlbum[]
    items: ListItemAll[],
    songs: AudioDetailsSong[],
    artists: AudioDetailsArtist[],
    genres: LibraryDetailsGenre[]
};


export interface MediaArtwork {
    banner?: string;
    fanart?: string;
    poster?: string;
    thumb?: string;
    'artist.fanart'?: string;
    'artist.thumb'?: string;
    'album.thumb'?: string;
    'albumartist.banner' ?: string;
    'albumartist.clearart' ?: string;
    'albumartist.clearlogo' ?: string;
    'albumartist.fanart' ?: string;
}

export interface ItemDetailsBase {
    label?: string;
}

export interface MediaDetailsBase extends ItemDetailsBase {
    fanart?: string;
    thumbnail?: string;
}

export interface GlobalTime {
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
}