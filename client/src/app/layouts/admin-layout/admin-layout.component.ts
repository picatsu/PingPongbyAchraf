import { Component, OnInit, AfterViewInit } from "@angular/core";
import { SharedService } from "../sharedService/shared.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public sidebarColor;

  constructor(private readonly sharedService: SharedService) {
    localStorage.setItem("sidebarcolor", "blue");
    this.sidebarColor = localStorage.getItem("sidebarcolor");
    //this.changeSidebarColor(this.sidebarColor);
  }
  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName("sidebar")[0];
    var mainPanel = document.getElementsByClassName("main-panel")[0];
    localStorage.setItem("sidebarcolor", color);
    this.sidebarColor = color;
    this.sharedService.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute("data", color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute("data", color);
    }
  }
  changeDashboardColor(color) {
    var body = document.getElementsByTagName("body")[0];
    if (body && color === "white-content") {
      body.classList.add(color);
    } else if (body.classList.contains("white-content")) {
      body.classList.remove("white-content");
    }
  }
  ngOnInit() {}
  ngAfterViewInit() {
    document
      .getElementsByClassName("sidebar")[0]
      .setAttribute("data", this.sidebarColor);
  }
}
