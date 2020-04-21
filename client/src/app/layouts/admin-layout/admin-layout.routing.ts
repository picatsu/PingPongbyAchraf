import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { VsdeuxComponent } from "../../pages/vsdeux/vsdeux.component";
import { PongGameComponent } from "../../pages/pong_bot/pong.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { Pong1v1Component } from "src/app/pages/pong1v1/pong1v1.component";
import { PongonlineComponent } from "src/app/pages/pongonline/pongonline.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "pong", component: PongGameComponent },
  { path: "pong1v1", component: Pong1v1Component },
  { path: "pongonline", component: PongonlineComponent },
  { path: "vsdeux", component: VsdeuxComponent },
  { path: "tables", component: TablesComponent },
  { path: "user", component: UserComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
