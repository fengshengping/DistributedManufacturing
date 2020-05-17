import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DistributedPlanModule } from "./distributedplan/distributedplan.module"
import { DistributedPlanComponent } from "./distributedplan/distributedplan.component"
import { RouterModule } from "@angular/router";
import { MapFirstGuard } from './mapFirst.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    DistributedPlanModule,
    RouterModule.forRoot([
      { path: "map", component: DistributedPlanComponent, canActivate: [MapFirstGuard]},
      { path: "admin",loadChildren: "./admin/admin.module#AdminModule", canActivate: [MapFirstGuard]},
      { path: "**", redirectTo: "/map" }
    ])
  ],
  providers: [MapFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
