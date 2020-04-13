import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/pong",
    title: "Pong Bot",
    rtlTitle: "خرائط",
    icon: "icon-laptop",
    class: "",
  },
  {
    path: "/pong1v1",
    title: "Pong 1v1",
    rtlTitle: "خرائط",
    icon: "icon-controller",
    class: "",
  },
  {
    path: "/pongonline",
    title: "Pong Online",
    rtlTitle: "خرائط",
    icon: "icon-cloud-upload-94",
    class: "",
  },
  {
    path: "/tables",
    title: "Table List",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: "",
  },
  {
    path: "/user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: "",
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: "",
  },
  {
    path: "/icons",
    title: "Icons",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: "",
  },

  {
    path: "/notifications",
    title: "Notifications",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: "",
  },

  {
    path: "/typography",
    title: "Typography",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
