import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './components/libraries/movies/movies.component';
import { MediacardComponent } from './components/utils/mediacard/mediacard.component';
import { TvshowsComponent } from './components/libraries/tvshows/tvshows.component';
import { MediaInformationsComponent } from './components/media-informations/media-informations.component';
import { MovieInformationComponent } from './components/media-informations/movie-information/movie-information.component';
import { TvshowInformationComponent } from './components/media-informations/tvshow-information/tvshow-information.component';
import { EpisodeComponent } from './components/media-informations/tvshow-information/episode/episode.component';
import { RemoteComponent } from './components/remote/remote.component';
import { PlaylistItemComponent } from './components/header/player/playlist-item/playlist-item.component';
import { SearchComponent } from './components/libraries/search/search.component';
import { SearchbarComponent } from './components/header/searchbar/searchbar.component';
import { PlayerComponent } from './components/header/player/player.component';
import { SwitchComponent } from './components/utils/switch/switch.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SettingsComponent } from './components/settings/settings.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { MusicsComponent } from './components/libraries/musics/musics.component';
import { MusicsHomeComponent } from './components/libraries/musics/home/home.component';
import { MusicsAlbumsComponent } from './components/libraries/musics/albums/albums.component';
import { MusicsMusicsComponent } from './components/libraries/musics/musics/musics.component';
import { MusicsViewComponent } from './components/libraries/musics/musics-view/musics-view.component';
import { AlbumDetailsComponent } from './components/libraries/musics/album-details/album-details.component';
import { ArtistDetailsComponent } from './components/libraries/musics/artist-details/artist-details.component';
import { ArtistsComponent } from './components/libraries/musics/artists/artists.component';
import { GenreDetailsComponent } from './components/libraries/musics/genre-details/genre-details.component';
import { GenresComponent } from './components/libraries/musics/genres/genres.component';
import { ItemComponent } from './components/libraries/musics/musics-view/item/item.component';
import { AppearanceComponent } from './components/settings/appearance/appearance.component';
import { GeneralComponent } from './components/settings/general/general.component';
import { AdvancedComponent } from './components/settings/advanced/advanced.component';
import { RowMediaComponent } from './components/utils/row-media/row-media.component';
import { MoviesHomeComponent } from './components/libraries/movies/home/home.component';
import { LibraryCategoryComponent } from './components/libraries/menu/category/category.component';
import { MoviesMenuComponent } from './components/libraries/menu/menu.component';
import { TvShowsHomeComponent } from './components/libraries/tvshows/home/home.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { PruningTranslationLoader } from './pruning-loader';
import { MovieEditComponent } from './components/media-informations/movie-edit/movie-edit.component';
import { TvshowEditComponent } from './components/media-informations/tvshow-edit/tvshow-edit.component';
import { ContributeComponent } from './components/settings/contribute/contribute.component';
import { MovieSetInformationsComponent } from './components/media-informations/movie-set-informations/movie-set-informations.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MediacardComponent,
    TvshowsComponent,
    MediaInformationsComponent,
    MovieInformationComponent,
    TvshowInformationComponent,
    EpisodeComponent,
    RemoteComponent,
    PlaylistItemComponent,
    SearchComponent,
    SearchbarComponent,
    SwitchComponent,
    PlayerComponent,
    SettingsComponent,
    NotificationsComponent,
    MusicsComponent,
    MusicsHomeComponent,
    MusicsAlbumsComponent,
    MusicsMusicsComponent,
    MusicsViewComponent,
    AlbumDetailsComponent,
    ArtistDetailsComponent,
    ArtistsComponent,
    GenreDetailsComponent,
    GenresComponent,
    ItemComponent,
    AppearanceComponent,
    GeneralComponent,
    AdvancedComponent,
    RowMediaComponent,
    MoviesHomeComponent,
    LibraryCategoryComponent,
    MoviesMenuComponent,
    TvShowsHomeComponent,
    MovieEditComponent,
    TvshowEditComponent,
    ContributeComponent,
    MovieSetInformationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    FontAwesomeModule
  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
 }

// AOT compilation support

// export function httpTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new PruningTranslationLoader(http);
}
