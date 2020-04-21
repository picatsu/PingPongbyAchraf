import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public sidebarColor: string = "black";
  public activeUser: string = "anonyme";
  public myIp: string = "";
  public activeUsername = "Unknown";

  constructor(private http: HttpClient, private router: Router) {
    this.getIPAddress().subscribe((x: any) => {
      this.myIp = x.ip;
    });
  }

  onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.router.navigate(["/dashboard"]);
    }
  }

  getAllUsers() {
    return this.http.get(environment.nodeApiUrl + "/allusers/");
  }

  postNewUser(user: User) {
    return this.http.post("/saveuser/", user);
  }

  getOneUser(username: string) {
    return this.http.get("/userbyusername/" + username);
  }

  putOneUser(user: User) {
    return this.http.put("/userbyusername/" + user.username, user);
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }
}

export interface User {
  username: String;
  email: String;
  firstname: String;
  adress: String;
  bestscore: Number;
  mode: String;
  ip: String;
}
