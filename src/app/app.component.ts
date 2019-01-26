import { Component,HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hogwarts';
  value: number = 0;
  MaxReached: boolean = false;
  MinReached: boolean = false;
  Increment() {
    if (this.value === 15) {
      this.MaxReached = true;
    } else {
      this.MinReached = false;
      this.value = this.value + 1;
    }
  }

  Decrement() {
    if (this.value <= 15) this.MaxReached = false;
    if (this.value) {
      this.value = this.value - 1;
    } else {
      this.MinReached = true;
    }
  }

  onKey(event: any){
    console.log(event.keyCode);
    if(event.keyCode===38){
      this.Increment();
    }
    if(event.keyCode===40){
      this.Decrement();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.keyCode===38){
      this.Increment();
    }
    if(event.keyCode===40){
      this.Decrement();
    }
  }
}
