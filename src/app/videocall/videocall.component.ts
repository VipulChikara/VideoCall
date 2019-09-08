import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var Peer: any;
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {

  anotherId;
  peer;
  mypeerId;
  showbutton :boolean;
  video;
  @ViewChild('myvideo') myVideo: any
  @ViewChild('video') Video: any
  @ViewChild('myaudio') myAudio: any

  constructor() { }

  ngOnInit() {
    this.video = this.Video.nativeElement;
    console.log(this.showbutton)
    let video = this.myVideo.nativeElement;
    let audio = this.myAudio.nativeElement;
    this.peer = new Peer({ key: 'lwjd5qra8257b9', debug: 3 });
    setTimeout(() => {
      this.mypeerId = this.peer.id;
    }, 3000)
    console.log(this.peer.id)
    this.peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log(data)
      })
    })
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia);
    this.peer.on('call', function (call) {
      n.getUserMedia({ video: true, audio: true }, function (stream) {
        call.answer(stream)
        
        call.on('stream', function (remotestream) {
          video.srcObject = remotestream;
          video.play();
          console.log(this.showbutton)
          if (this.showbutton === false)
          this.showbutton = true
        else
          this.showbutton = false
        })
      }, function (error) {
        console.log(error)
      })
    })
  }

  connect() {
    var conn = this.peer.connect(this.anotherId)
    conn.on('open', function () {
      console.log('hi')
    })
  }

  videoconnect() {
    if (this.showbutton === false)
      this.showbutton = true
    else
      this.showbutton = false
    this.initCamera({ video: true, audio: false });
    this.videocall()
  }

  initCamera(config: any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      this.video.play();
    });
  }

  videocall() {
    let video = this.myVideo.nativeElement;
    let localvar = this.peer
    let fname = this.anotherId
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia);
    n.getUserMedia({ video: true, audio: true }, function (stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function (remotestream) {
        video.srcObject = remotestream;
        video.play();
      })
    }, function (error) {
      console.log(error)
    })
  }

  callend() {
    console.log(this.showbutton)
    if (this.showbutton === false)
      this.showbutton = true
    else
      this.showbutton = false
    console.log(this.showbutton)
    this.video.disconnect();
    this.peer.on('connection', function (dataConnection) {
      console.log(dataConnection);
      dataConnection.close();
    })
  }
  audiocall() {
    let audio = this.myAudio.nativeElement;
    let localvar = this.peer
    let fname = this.anotherId
    var n = <any>navigator;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia);
    n.getUserMedia({ video: false, audio: true }, function (stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function (remotestream) {
        audio.srcObject = stream;
        console.log(this.showbutton)
        audio.play();
      })
    }, function (error) {
      console.log(error)
    })
  }


}
