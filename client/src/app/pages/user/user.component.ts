import { Component, OnInit } from "@angular/core";
import {
  User,
  SharedService,
} from "src/app/layouts/sharedService/shared.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  public user: User;
  public myIp: string = "";
  constructor(public sharedService: SharedService) {
    this.sharedService.getIPAddress().subscribe((x: any) => {
      this.myIp = x.ip;
    });
  }

  onSave(user: User) {
    console.log("g recu sa :", user);
    this.sharedService.postNewUser(user);
  }

  ngOnInit() {}
}
