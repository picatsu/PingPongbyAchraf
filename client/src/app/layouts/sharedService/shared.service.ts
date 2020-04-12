import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public sidebarColor: string = "black";
  public activeUser: string = "anonyme";
  constructor() {}
}
