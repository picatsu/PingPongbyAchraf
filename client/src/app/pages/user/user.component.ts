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
  constructor(private sharedService: SharedService) {}

  onSave(user: User) {
    console.log("g recu sa :", user);
    this.sharedService.postNewUser(user);
  }

  ngOnInit() {}
}
