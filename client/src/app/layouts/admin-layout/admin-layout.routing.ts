import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { PongGameComponent } from "../../pages/pong/pong.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "pong", component: PongGameComponent },
  { path: "tables", component: TablesComponent },
  { path: "user", component: UserComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },

  { path: "notifications", component: NotificationsComponent },

  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
