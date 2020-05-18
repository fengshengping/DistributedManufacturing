import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { CalcServiceModule} from "../calcservice/calcservice.module"
import { SchedulingComponent} from "./scheduling.component";
import { RouterModule } from "@angular/router";
import { GanttModule } from '@syncfusion/ej2-angular-gantt';

@NgModule({
 imports: [ModelModule, CalcServiceModule, BrowserModule, FormsModule, RouterModule, GanttModule],
 declarations: [SchedulingComponent],
    exports: [SchedulingComponent]
})
export class SchedulingModule { 


}