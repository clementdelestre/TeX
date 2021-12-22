import { MediaArtwork, MediaDetailsBase } from "./others";

export interface VideoCast {
    name: string;
    order: number;
    role: string;
    thumbnail: string;
}

export interface VideoResume {
    position: number;
    total: number;
}

export interface VideoStreams {
    audio: VideoStreamAudio[];
    subtitle: VideoStreamSubtitle[];
    video: VideoStreeamVideo[];
}

export interface VideoStreamAudio {
    channels: number;
    codec: string;
    language: string;
}

export interface VideoStreamSubtitle {
    language: string;
}

export interface VideoStreeamVideo {
    aspect: number;
    codec: string;
    duration: number;
    height: number;
    language: string;
    stereomode: string;
    width: number;
}

export interface VideoDetailsBase extends MediaDetailsBase {
    art?: MediaArtwork;
    playcount?: number;
}

export interface VideoDetailsMedia extends VideoDetailsBase {
    title?: string;
}

export interface VideoDetailsItem extends VideoDetailsMedia {
    dateadded?: string;
    file?: string;
    lastplayed?: string;
    plot?: string;
}

export interface VideoDetailsFile extends VideoDetailsItem {
    director?: string[];
    resume?: VideoResume;
    runtime?: number;
    streamdetails?: VideoStreams;
}

export interface VideoDetailsMovie extends VideoDetailsFile {
    cast: VideoCast[];
    country?: string[];
    genre?: string[];
    imdbnumber?: string;
    movieid: number;
    mpaa?: string;
    originaltitle?: string;
    plotoutline?: string;
    premierd?: string;
    rating?: number;
    ratings?: any;
    set?: string;
    setid?: number;
    showlink?: string[];
    sorttitle?: string;
    studio?: string[];
    tag?: string[];
    tagline?: string;
    top250?: number;
    trailer?: string;
    uniqueid?: any; //Media.UniqueID
    userrating?: number;
    votes?: string;
    writer?: string[];
    year?: number;
    streamdetails: VideoStreams;
}

export interface VideoDetailsTVShow extends VideoDetailsItem {
    cast?: VideoCast[];
    episode?: number;
    episodeguide?: string;
    genre?: string[];
    imdbnumber?: string;
    mpaa?: string;
    originaltitle?: string;
    premiered?: string;
    rating?: number;
    ratings?: any;
    runtime?: number;
    season?: number;
    sorttitle?: string;
    status?: string;
    studio?: string[];
    tag?: string[];
    tvshowid: number;
    uniqueid?: any; //Media.UniqueID
    userrating?: number;
    votes?: string;
    watchedepisodes?: number;
    year?: number;
}

export interface VideoDetailsSeason extends VideoDetailsBase {
    episode?: number;
    season?: number;
    seasonid: number;
    showtitle?: string;
    title?: string;
    tvshowid?: number;
    userrating?: number;
    watchedepisodes?: number;
}

export interface VideoDetailsEpisode extends VideoDetailsFile {
    cast?: VideoCast[];
    episode?: number;
    episodeid: number;
    firstaired?: string;
    originaltitle?: string;
    productioncode?: string;
    rating?: number;
    ratings?: any;
    season?: number;
    seasonid?: number;
    showtitle?: string;
    specialsortepisode?: number;
    specialsortseason?: number;
    tvshowid?: number;
    userrating?: number;
    votes?: string;
    writer?: string[];
}

export const previewMovieProperties = [
    "year",
    "art",
    "title",
    "resume",
    "rating"
];

export const fullMovieProperties = [
    "year",
    "art",
    "title",
    "plot",
    "tagline",
    "runtime",
    "rating",
    "studio",
    "genre",
    "writer",
    "director",
    "trailer",
    "cast",
    "file",
    "lastplayed",
    "playcount",
    "dateadded",
    "streamdetails",
    "country",
    "set",
    "tag"
];


export const previewTVShowProperties = [
    "year",
    "art",
    "title"
];

export const fullTVShowProperties = [
    "year",
    "art",
    "title",
    "plot",
    "runtime",
    "rating",
    "studio",
    "genre",
    "episode",
    "season",
    "playcount"
];

export const seasonProperties = [
    "episode",
    "season",
    "title",
    "showtitle",
    "tvshowid",
    "playcount"
]

export const episodeProperties = [
    "cast",
    "episode",
    "firstaired",
    "originaltitle",
    "productioncode",
    "rating",
    "ratings",
    "season",
    "seasonid",
    "showtitle",
    "specialsortepisode",
    "specialsortseason",
    "tvshowid",
    "userrating",
    "votes",
    "writer",
    "title",
    "art",
    "plot",
    "file",
    "playcount",
    "dateadded",
    "streamdetails",
]

