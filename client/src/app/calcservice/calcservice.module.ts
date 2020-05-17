import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { PlanNode } from "./plannode.model";
import {NodeConnection} from './nodeconnection.model'
import { LPCalcService } from "./lp.calcservice";

@NgModule({
    imports: [HttpClientModule],
    providers: [LPCalcService, PlanNode, NodeConnection]
})
export class CalcServiceModule {}