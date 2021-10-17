import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modalAnimation, modalAnimationReverse, openCloseAnimation } from 'src/app/models/appAnimation';
import { ApplicationService } from 'src/app/services/application.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    openCloseAnimation,
    modalAnimation,
    modalAnimationReverse
  ]
})
export class HeaderComponent implements OnInit {
  constructor(public application:ApplicationService, public player: PlayerService, public router:Router) { }

  ngOnInit(): void {
    this.router.url.indexOf("movie") != -1;
  }

  openRemote(){
    this.application.openRemote = true;
  }

  openPlayer(){
    this.application.showPlayer = !this.application.showPlayer;
  }

  isRoute(route: string) : boolean {
    return this.router.url.indexOf(route) != -1;
  }

}
