import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public sidebarColor: string = "black";
  public activeUser: string = "anonyme";

  constructor(private http: HttpClient) {}

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
