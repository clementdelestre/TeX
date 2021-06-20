export enum PlaylistType {
    "video",
    "audio",
    "picture"
}

export interface Playlist {
    playlistid: number;
    type: PlaylistType;
}

export interface PlaylistItem {
    file?: string;
    movieid?: number;
    episodeid?: number;
    songid?: number;
    artistid?: number;
    albumid?: number;
}