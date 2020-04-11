import { Component, OnInit } from "@angular/core";
import { SharedService } from "../sharedService/shared.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";

  constructor(private readonly sharedService: SharedService) {}
  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName("sidebar")[0];
    var mainPanel = document.getElementsByClassName("main-panel")[0];

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
}
