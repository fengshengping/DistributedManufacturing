import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ModelModule } from "../model/model.module";
import { CalcServiceModule} from "../calcservice/calcservice.module"
import { DistributedPlanComponent} from "../distributedplan/distributedplan.component";
import { RouterModule } from "@angular/router";

@NgModule({
 imports: [ModelModule, CalcServiceModule, BrowserModule, FormsModule, RouterModule, LeafletModule],
 declarations: [DistributedPlanComponent],
    exports: [DistributedPlanComponent]
})
export class DistributedPlanModule { }