import { Component, OnInit } from "@angular/core";

import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-vsdeux",
  templateUrl: "vsdeux.component.html",
  styleUrls: ["./vsdeux.component.scss"],
})
export class VsdeuxComponent implements OnInit {
  //@ViewChild("PongCanvas") canvas: ElementRef;
  public GAME_SETTINGS = null;
  public INTERVAL = 10;
  public srcnode = "https://localhost:4000";
  urlSafe: SafeResourceUrl;
  private url = "http://localhost:" + 4000;
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
