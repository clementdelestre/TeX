import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';

@Component({
  selector: 'app-library-row-medias',
  templateUrl: './row-media.component.html',
  styleUrls: ['./row-media.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class RowMediaComponent implements OnInit {

  @Input() title: string = "";
  @Input() medias: any[] = []

  constructor() { }

  ngOnInit(): void {

  }

  mouseDown: boolean = false;
  treeshold = 0;
  previousMouseX  = 0;
  @ViewChild('scrollElement') scrollViewElement:any; 

  public onMouseMove(event: MouseEvent) {
    
    if (!this.mouseDown)
      return;
    let moveX = event.x - this.previousMouseX;
    this.previousMouseX = event.x;

    if (this.treeshold == 10) {
      this.treeshold -= .1;
      return;
    }
    

    let previousTS = this.treeshold;
    this.treeshold = Math.max(0, this.treeshold - Math.abs(moveX));
    let diff = previousTS - this.treeshold;
    if (moveX < 0)
      diff = -diff;
    
    moveX -= diff;

    this.scrollViewElement.nativeElement.scrollBy({
      left: -moveX
    });
  }

  @HostListener('window:mouseup')
  private mouseUp() {
    this.mouseDown = false;
  }

}
