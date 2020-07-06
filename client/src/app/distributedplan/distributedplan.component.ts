import { Component, OnInit} from "@angular/core";
import 'leaflet.heat/dist/leaflet-heat.js';
import { latLng, Map, point, polyline,  marker, tileLayer, icon, Circle} from 'leaflet';
import * as L from 'leaflet';

import { PlanNode } from "../calcservice/plannode.model";
import { NodeConnection} from "../calcservice/nodeconnection.model";
import { LPCalcService} from "../calcservice/lp.calcservice";


@Component({
    selector: "distributed-plan",
    templateUrl: "distributedplan.component.html",
    styleUrls:['distributedplan.component.scss']
})
export class DistributedPlanComponent implements OnInit {

    // Define our base layers so we can reference them multiple times
    streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    
    // Layers control object with our two base layers and the three overlay layers
    layersControl = {
        baseLayers: {
            'Street Maps': this.streetMaps,
            'Wikimedia Maps': this.wMaps
        }
    };

    map:Map;
    
    options = {
        layers: [ this.streetMaps],
        zoom: 9,
        center: latLng(46.879966, -121.726909)
    };
    
    mapapps: MapApp[] = [
        {id: 1, name: "Center Pick"},
        {id: 2, name:"Workshop Config"}
    ]

    selectedApp: MapApp = this.mapapps[0];

    optAddCenter:boolean = true;

    optAddWorkshop:boolean = true;

    maxCenterNumber: number = 0;

    centerCnt:number = 0;

    minCapacity: number = 0;

    minCap: number = 0;

    allCircles: Circle[] = [];

    allConnections: L.Polyline[] = [];

    idCnt:number = 0;

    constructor(private lpCalcService: LPCalcService){

    }

    ngOnInit():void{
    
    }

    onMapReady(map: Map) {
        this.map = map;   
    }

    
    onClick(env){
        let latlng = env.latlng;
        let ctrl = this;

        let ranVal = Math.random() * 30.0 + 70;

        if(ctrl.selectedApp.id == 1){
            ctrl.allCircles.push(L.circle(latlng, { 
                color: ctrl.optAddCenter ? 'red': 'blue',
                fillColor: ctrl.optAddCenter ? '#f03' : '#0f3',
                fillOpacity: 0.5,
                radius: ranVal
            }).addTo(this.map));         

       

            if(ctrl.optAddCenter){
                ctrl.centerCnt++; 
                ctrl.minCap = 7 * ctrl.centerCnt;
                
                if(ctrl.minCapacity < ctrl.minCap)
                    ctrl.minCapacity = ctrl.minCap
                
                //if(ctrl.maxCenterNumber > ctrl.centerCnt)
                    //ctrl.maxCenterNumber = ctrl.centerCnt;

                ctrl.maxCenterNumber = ctrl.centerCnt - 1;
            }

        }else{
            ctrl.allCircles.push(L.circle(latlng, { 
                color: ctrl.optAddWorkshop ? 'red': 'blue',
                fillColor: ctrl.optAddWorkshop ? '#f03' : '#0f3',
                fillOpacity: 0.5,
                radius: ranVal,
            }).addTo(this.map));
        }
    }

    changeMapapp(mapapp: MapApp){
        this.selectedApp = mapapp;

        this.allCircles.forEach(c=>c.remove());
        this.allConnections.forEach(l=>l.remove());
        this.centerCnt = 0;
    }

    onOptimize(){
        let allNodes: PlanNode[] = [];
        let ctrl = this;

        ctrl.idCnt = 0;
        this.allCircles.forEach(cir=>{

            let color = cir.options['color'];
            let latlng = cir.getLatLng();
            let val = cir.getRadius();

            let planNode = new PlanNode();
            planNode.id = ctrl.idCnt++;
            planNode.lat = latlng.lat;
            planNode.lng = latlng.lng;

            if(ctrl.selectedApp.id == 1){ //This is center pick
                if(color == 'red'){
                    planNode.nodeType = 'center';
                    planNode.capacity = val * 0.1;
                }
                else{
                    planNode.nodeType = 'storage';
                    planNode.capacity = val;
                }
            }
            else{ //This is workshop config
                if(color == 'red'){
                    planNode.nodeType = 'workshop';
                    planNode.capacity = val * 0.1;
                }
                else{
                    planNode.nodeType = 'center';
                    planNode.capacity = val;
                }
            }

            allNodes.push(planNode);
        });

        this.lpCalcService.getOptimizeCenterPick(
            allNodes, 
            this.maxCenterNumber, 
            this.minCapacity).subscribe(data=>{

            data.forEach(nodeConn=>{
                let center = allNodes.find(node=>node.id == nodeConn.id);
                let storage = allNodes.find(node=>node.id == nodeConn.parentId);             

                let pl = polyline( 
                    [[center.lat, center.lng],
                    [storage.lat, storage.lng]], 
                    {color: 'black', weight: 1}).addTo(ctrl.map);
                
                ctrl.allConnections.push(pl);
            });
        });
    }
}

class MapApp {
    name: string;
    id: number;
}
