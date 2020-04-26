import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-pongonline",
  templateUrl: "./pongonline.component.html",
  styleUrls: ["./pongonline.component.scss"],
})
export class PongonlineComponent implements OnInit {
  //@ViewChild("PongCanvas") canvas: ElementRef;
  public GAME_SETTINGS = null;
  public INTERVAL = 10;
  public srcnode = environment.node1v1;
  urlSafe: SafeResourceUrl;
  private url = environment.node1v1;
  private socket;
  public numberScore: number = 10;
  // public ctx = this.canvas.nativeElement.getContext("2d");

  constructor(public sanitizer: DomSanitizer) {
    this.socket = io(this.srcnode);
    this.getMessage().subscribe((message: string) => {
      // this.messages.push(message);
      this.numberScore = Number(message);
    });
  }

  saveNumberScore() {
    this.socket.emit("maxscore", this.numberScore.toString());
  }

  getMessage() {
    //return this.socket
    //  .fromEvent("new message") ;
    return Observable.create((observer) => {
      this.socket.on("maxscore", (message) => {
        observer.next(message);
        console.log("recu :", message);
        this.numberScore = Number(message);
      });
    });
  }

  mainLoop() {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
