import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/libraries/movies/movies.component';
import { TvshowsComponent } from './components/libraries/tvshows/tvshows.component';
import { SearchComponent } from './components/libraries/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MusicsComponent } from './components/libraries/musics/musics.component';
import { LibraryCategoryComponent } from './components/libraries/menu/category/category.component';
import { MoviesHomeComponent } from './components/libraries/movies/home/home.component';
import { TvShowsHomeComponent } from './components/libraries/tvshows/home/home.component';
import { RemoteComponent } from './components/remote/remote.component';

const routes: Routes = [

  {
    path:'movies',
    component: MoviesComponent,
    children:[
      {
        path:'',
        component:MoviesHomeComponent
      },
      {
        path:'home',
        component:MoviesHomeComponent
      },
      {
        path:':type',
        component:LibraryCategoryComponent
      }
    ]
  },
  {
    path:'movie',
    children:[
      {
        path:':type',
        component:MoviesComponent
      }
    ]
  },
  {
    path:'tvshows',
    component: TvshowsComponent,
    children:[
      {
        path:'',
        component:TvShowsHomeComponent
      },
      {
        path:'home',
        component:TvShowsHomeComponent
      },
      {
        path:':type',
        component:LibraryCategoryComponent
      }
    ]
  },
  {
    path:'tvshow',
    children:[
      {
        path:':type',
        component:TvshowsComponent
      }
    ]
  },

  {
    path:'musics',
    component: MusicsComponent,
    children:[
      {
        path:'musics',
        component: MusicsComponent,
      },
      {
        path:'albums',
        component: MusicsComponent,
      },
      {
        path:'album',
        component: MusicsComponent,
        children: [
          {
            path:':type',
            component: MusicsComponent
          }
        ]
      },
      {
        path:'artists',
        component: MusicsComponent,
      },
      {
        path:'artist',
        component: MusicsComponent,
        children: [
          {
            path:':type',
            component: MusicsComponent
          }
        ]
      },
      {
        path:'genres',
        component: MusicsComponent,
      },
      {
        path:'genre',
        component: MusicsComponent,
        children: [
          {
            path:':type',
            component: MusicsComponent
          }
        ]
      },
    ]
  },
  {
    path:'search',
    component: SearchComponent,
  },
  {
    path:'settings',
    component: SettingsComponent,
    children: [
      {
        path:'general',
        component: SettingsComponent
      },
      {
        path:'appearance',
        component: SettingsComponent
      },
      {
        path:'advanced',
        component: SettingsComponent
      },
      {
        path:'contribute',
        component: SettingsComponent
      },
    ]
  },
  {
    path:'remote',
    component: RemoteComponent,
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'movies'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
