import { Component, Input, OnInit } from '@angular/core';
import { VideoDetailsMovie } from 'src/app/models/kodiInterfaces/video';
import { AppNotificationType } from 'src/app/models/notification';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-movie-set-edit',
  templateUrl: './movie-set-edit.component.html',
  styleUrls: ['./movie-set-edit.component.scss']
})
export class MovieSetEditComponent implements OnInit {

  @Input() movie!: VideoDetailsMovie;
  @Input() isLoaded: boolean = false;

  constructor(private kodiApi:KodiApiService,  private application: ApplicationService) { }

  ngOnInit(): void {
  }
}
