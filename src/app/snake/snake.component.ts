import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  SnakeHead:string = "⚈";
  SnakeBody:string = "☉☉☉";
  Apple:string = "⚫";

 //Snake coords 
  X:number;
  Y:number;
  BodyX:number;
  BodyLen:number;
  speed:number = 10;
  SnakePosition:number;

  //Score
  Target:number = 5;
  Score:number = 0;
  ShowTarget:boolean = true;
  TargetComplete:boolean = false;
  GameOver:boolean = false;

  //Timer
  Timer:number = 33;

  //Apple coords
  appleX:number;
  appleY:number;
  ApplePosition:number;

  //Fire controls
  bullet:string = "⚙"; //⚙ ⚊
  bulletX:number;
  bulletY:number;

  constructor() { }

  ngOnInit() {

    this.Timer = 33;
    this.Target = 5;
    this.Score = 0;
    this.ShowTarget = true;
    this.TargetComplete = false;
    this.GameOver = false;

    this.X = 600;
    this.Y = 300;
    this.BodyLen = (this.SnakeBody.length+1)*10;
    this.BodyX = 600 - this.BodyLen;

    this.bulletX = this.X;
    this.bulletY = this.Y;

    this.SnakePosition = this.X*10000+this.Y;
    this.ApplePosition = this.appleX*10000+this.appleY;

    this.DisplayTarget();
    this.DynamicApple();
    this.CountDown();
  }

  GoUp(){
    this.SnakeEatsApple();
    this.FireTheApple();
    this.Y = this.Y - this.speed;
  }

  GoDown(){
    this.SnakeEatsApple();
    this.FireTheApple();
    this.Y = this.Y + this.speed;
  }

  GoRight(){
    this.SnakeEatsApple();
    this.FireTheApple();
    this.X = this.X + this.speed;
    this.BodyX = this.X - this.BodyLen;
  }

  GoLeft(){
    this.SnakeEatsApple();
    this.FireTheApple();
    this.X = this.X - this.speed;
    this.BodyX = this.X - this.BodyLen;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

DynamicApple(){
  this.appleY = Math.floor(Math.abs(-400+ Math.random() * 1000));
  this.appleX= Math.floor(80+ Math.random() * 1000);
  this.delay(5000).then(any => {
    this.DynamicApple();
});
}

DisplayTarget(){
  this.delay(3000).then(any => {
    this.ShowTarget = false;
});
}

CountDown(){
  if(this.Timer){
  this.delay(1000).then(any => {
    this.Timer = this.Timer - 1;
    this.CountDown();
});}else{
  this.GameOver = true;
}
}

  Fire(){
    this.bulletX = this.X;
    let currx = this.X;
    this.bulletY = this.Y;
    for(let i = currx;i<=1400;i++){
      this.delay(300).then(any => {
        this.bulletX = i;
        console.log(i);
        this.FireTheApple();
    });
    }
  }

  FireTheApple(){
    console.log(Math.abs(this.bulletX-this.appleX) + "---" + Math.abs(this.bulletY-this.appleY) );
    if(Math.abs(this.bulletX-this.appleX)<=15 && Math.abs(this.bulletY-this.appleY)<=15){
      this.appleY = Math.floor(Math.abs(-400+ Math.random() * 1000));
      console.log(this.appleY);

      this.appleX= Math.floor(80+ Math.random() * 1000);
      console.log(this.appleX);

      this.bulletX = this.X;
      this.bulletY = this.Y;

      this.Score = this.Score + 1;
      if(this.Score>=this.Target)
        this.TargetComplete = true;
    }
  }

  SnakeEatsApple(){
    this.SnakePosition = this.X*10000+this.Y;
    this.ApplePosition = this.appleX*10000+this.appleY;

    if(Math.abs(this.X-this.appleX)<=15 && Math.abs(this.Y-this.appleY)<=15){
      this.appleY = Math.floor(Math.abs(-400+ Math.random() * 1000));
      console.log(this.appleY);

      this.appleX= Math.floor(80+ Math.random() * 1000);
      console.log(this.appleX);
      this.Score = this.Score + 1;
      if(this.Score>=this.Target)
        this.TargetComplete = true;
    }

    // console.log(this.SnakePosition + "---" + this.ApplePosition + "---" +Math.abs(this.SnakePosition-this.ApplePosition));

    // if(Math.abs(this.SnakePosition-this.ApplePosition)<=41005){
    //   this.appleY = Math.floor(Math.abs(-400+ Math.random() * 1000));
    //   console.log(this.appleY);

    //   this.appleX= Math.floor(80+ Math.random() * 1000);
    //   console.log(this.appleX);
    //   this.Score = this.Score + 1;
    // }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.keyCode===13){
      this.ngOnInit();
    }
    if(event.keyCode===32){
      this.Fire();
    }
    if(event.keyCode===37){
      this.GoLeft();
    }
    if(event.keyCode===38){
      this.GoUp();
    }
    if(event.keyCode===39){
      this.GoRight();
    }
    if(event.keyCode===40){
      this.GoDown();
    }
  }
}
