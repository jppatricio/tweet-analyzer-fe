import { Component } from '@angular/core';
import { ViewChild,ElementRef,Renderer2} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweet-analyzer';
  currentTitle = 'INFORMACIÓN'

  constructor(private renderer:Renderer2){}
  @ViewChild('card', {static: false}) card: ElementRef;
  @ViewChild('card2', {static: false}) card2: ElementRef;
  @ViewChild('card3', {static: false}) card3: ElementRef;

  predict = false
  train = false

  onMouseLeave(event){
    this.renderer.setStyle(this.card.nativeElement,'transform',`rotateY(0) rotateX(0)`);
    this.renderer.setStyle(this.card2.nativeElement,'transform',`rotateY(0) rotateX(0)`);
    this.renderer.setStyle(this.card3.nativeElement,'transform',`rotateY(0) rotateX(0)`);
  }

  onMouseMove(event) {
    let x = (event.screenX-75) / 10;
    let y = -(event.screenY - 225) / 5;
    this.renderer.setStyle(this.card.nativeElement,'transform',`rotateY(${x}deg) rotateX(${y}deg)`);
  }

  onMouseMove2(event) {
    let x = (event.screenX-75) / 10;
    let y = -(event.screenY - 200*3) / 5;
    this.renderer.setStyle(this.card2.nativeElement,'transform',`rotateY(${x}deg) rotateX(${y}deg)`);
  }

  onMouseMove3(event) {
    let x = (event.screenX-75) / 10;
    let y = -(event.screenY - 200*4)/ 5;
    this.renderer.setStyle(this.card3.nativeElement,'transform',`rotateY(${x}deg) rotateX(${y}deg)`);
  }
  opengit(){
    window.open("https://github.com/jppatricio/tweet-analyzer-fe");
  }

}
