import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot,Router} from "@angular/router";
import { DistributedPlanComponent } from "./distributedplan/distributedplan.component";

@Injectable()
export class MapFirstGuard {

    private firstNavigation = true;
 
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != DistributedPlanComponent) {
                this.router.navigateByUrl("/");
                return false;
            }
        }
        return true;
    }
}
