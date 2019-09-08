import { Component } from '@angular/core';

declare var Peer:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  anotherId;
  peer;
  mypeerId;

  ngOnInit(){
    this.peer = new Peer({key: 'lwjd5qra8257b9'});
    setTimeout(()=>{
      this.mypeerId=this.peer.id;
    },3000)
  }
  
}
