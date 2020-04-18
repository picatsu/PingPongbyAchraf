import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { PongGameComponent } from "../../pages/pong_bot/pong.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Pong1v1Component } from "src/app/pages/pong1v1/pong1v1.component";
import { PongonlineComponent } from "src/app/pages/pongonline/pongonline.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    PongGameComponent,
    Pong1v1Component,
    PongonlineComponent,
    // RtlComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule {}
