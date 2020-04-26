import { Component, OnInit } from "@angular/core";
import * as io from "socket.io-client";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Component({
  selector: "app-vsdeux",
  templateUrl: "vsdeux.component.html",
  styleUrls: ["./vsdeux.component.scss"],
})
export class VsdeuxComponent implements OnInit {
  //@ViewChild("PongCanvas") canvas: ElementRef;
  public GAME_SETTINGS = null;
  public INTERVAL = 10;

  public srcnode = environment.node2v2;
  urlSafe: SafeResourceUrl;
  private url = environment.node2v2;
  private socket;
  private serverObjects = [];
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
