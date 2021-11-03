import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { searchMenuItem } from 'src/app/models/searchMenu';

@Component({
  selector: 'app-movies-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MoviesMenuComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() items: searchMenuItem[] = [];
  @Input() searchPageButton: boolean = false

  ngOnInit(): void {
  }

  isPage(page: string): boolean {
    return page == this.router.url.split("/")[2];
  }

  navigate(url: string){

    if(url == this.router.url.split("/")[2]){
      this.router.navigate([this.router.url.split("/")[1]]);
      return;
    }

    this.router.navigate([this.router.url.split("/")[1] + "/" + url]);
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
