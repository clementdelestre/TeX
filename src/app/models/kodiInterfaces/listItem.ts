import { AudioAlbumReleaseType, AudioDetailsMedia } from "./audio";
import { VideoCast, VideoDetailsFile } from "./video";

export interface ListItemBase extends VideoDetailsFile, AudioDetailsMedia {
    album?:string;
    albumartist?: string[];
    albumartistid?: number[];
    albumid?: number;
    albumlabel?: string;
    albumreleasetype?: AudioAlbumReleaseType;
    albumstatus?: string;
    bitrate?: string;
    bpm?: number;
    cast?: VideoCast[];
    channels?: number;
    comment?: string;
    compilation?: boolean;
    contributors?: any[];
    country?: string[];
    customproperties?: any;
    description?: string;
    disc?: number;
    disctitle?: string;
    displaycomposer?: string;
    displayconductor?: string;
    displaylyricist?: string;
    displayorchestra?: string;
    duration?: number;
    dynpath?: string;
    episode?: number;
    episodeguide?: string;
    firstaired?: string;
    id?: number;
    isboxset?: boolean;
    lyrics?: string;
    mediapath?: string;
    mood?: string[] | string;
    mpaa?: string;
    musicbrainzartistid?: string[];
    musicbrainztrackid?: string;
    originaldate?: string;
    originaltitle?: string;
    plotoutline?: string;
    premiered?: string;
    productioncode?: string;
    releasedate?: string;
    releasetype?: AudioAlbumReleaseType;
    samplerate?: number;
    season?: number;
    set?: string;
    setid?: number;
    showtitle?: string;
    sorttitle?: string;
    specialsortepisode?: number;
    specialsortseason?: number;
    studio?: string[];
    style?: string[];
    tag?: string[];
    tagline?: string;
    theme?: string[];
    top250?: number;
    totaldiscs?: number;
    track?: number;
    trailer?: string;
    tvshowid?: number;
    type?: string;
    uniqueid?: any;
    votes?: number;
    watchedepisodes?: number;
    writer?: string[];
}

export interface ListItemFile extends ListItemBase {
    file?: string;
    filetype?: string;
    lastmodified?: string;
    mimetype?: string;
    size?: number;
}

export interface ListItemAll extends ListItemBase {
    channel?: string;
    channelnumber?: number;
    channeltype?: any;
    endtime?: string;
    hidden?: boolean;
    locked?: boolean;
    starttime?: string;
    subchannelnumber?: number;
}

export interface ListSort {
    ignorearticle?: boolean;
    method: ListSortMethod;
    order?: ListSortOrder;
    useartistsortname?: boolean;
}

export enum ListSortMethod {
    none = "none",
    label = "label",
    date = "date",
    size = "size",
    file = "file",
    path = "path",
    drivetype = "drivetype",
    title = "title",
    track = "track",
    time = "time",
    artist = "artist",
    album = "album",
    albumtype = "albumtype",
    genre = "genre",
    country = "country",
    year = "year",
    rating = "rating",
    userrating = "userrating",
    votes = "votes",
    top250 = "top250",
    programcount = "programcount",
    playlist = "playlist",
    episoe = "episode",
    season = "season",
    totalepisodes = "totalepisodes",
    watchedepisodes = "watchedepisodes",
    tvshowstatus = "tvshowstatus",
    tvshowtitle = "tvshowtitle",
    sorttitle = "sorttitle",
    productioncode = "productioncode",
    mpaa = "mpaa",
    studio = "studio",
    dateadded = "dateadded",
    lastplayed = "lastplayed",
    playcount = "playcount",
    listeners = "listeners",
    bitrate = "bitrate",
    random = "random",
    totaldiscs = "totaldiscs",
    originaldate = "originaldate",
    bpm = "bpm"
}

export enum ListSortOrder {
    ascending = "ascending",
    descending = "descending"
}
