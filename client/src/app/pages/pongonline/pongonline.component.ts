import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "app-pongonline",
  templateUrl: "./pongonline.component.html",
  styleUrls: ["./pongonline.component.scss"],
})
export class PongonlineComponent implements OnInit {
  //@ViewChild("PongCanvas") canvas: ElementRef;
  public GAME_SETTINGS = null;
  public INTERVAL = 10;
  public srcnode = "https://localhost:3000";
  urlSafe: SafeResourceUrl;
  private url = "http://localhost:" + 3000;
  private socket;
  private serverObjects = [];
  // public ctx = this.canvas.nativeElement.getContext("2d");

  constructor(public sanitizer: DomSanitizer) {
    //this.socket = io(this.url);
  }

  mainLoop() {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
