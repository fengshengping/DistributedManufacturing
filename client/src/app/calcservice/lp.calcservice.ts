import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { PlanNode } from "./plannode.model";
import { NodeConnection } from "./nodeconnection.model";


const PROTOCOL = "http";
const PORT = 3600;
@Injectable()
export class LPCalcService{
    baseUrl: string;
    auth_token: string;
    constructor(private http: HttpClient) {
         this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
         //this.baseUrl = `${PROTOCOL}://${location.hostname}/`;
    }

    getOptimizeCenterPick(plannodes: PlanNode[], maxCenterNumber: number, minCapacity: number): Observable<NodeConnection[]>{
        let maxCenterNum = "" + maxCenterNumber;
        let minCap = "" + minCapacity;
        //let strPlannodes = JSON.stringify(plannodes);
        return this.http.post<NodeConnection[]>(
            `${this.baseUrl}AdvancedPlanning/GetOptimizedConnectionsCenterPick/${maxCenterNum}/${minCap}`, 
            plannodes
        );
    }


    // private getOptions() {
    //     return {
    //        headers: new HttpHeaders({
    //           "Authorization": `Bearer<${this.auth_token}>`
    //        })
    //     }
    // }
}