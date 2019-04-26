import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/model/sentilo/measurement';
import { Sensor } from '../model/sentilo/sensor';
import { CustomLocation } from '../model/customLocation';
import { CustomComponentType } from '../model/sentilo/customComponentType';
import { CustomComponent } from '../model/sentilo/customComponent';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public componentsList:Array<CustomComponent>
  public sensorsList:Array<Sensor>
  private customComponentTypestList:Array<CustomComponentType>

  constructor() {}

  getMeasurement(id:Number): Measurement {
      
    console.log('hey1');

    var measurement:Measurement = new Measurement();
    var location = new CustomLocation();
    location.fillData(3,3.2);

    measurement.fillData("35", new Date(),location);

    console.log(measurement);

    return measurement;
  }

  getComponent(id:Number): CustomComponent {
      
    console.log('hey3');

    var customComponent:CustomComponent = new CustomComponent();
    var location = new CustomLocation();
    location.fillData(3,3.2);

    var type = this.getCustomComponentTypeList()[0];

    customComponent.fillData("35", "An example",location,type);

    console.log(customComponent);

    return customComponent;
  }

  fillCustomComponentTypes() {
    var customComponentTypesList: Array<CustomComponentType> = new Array();

    var customComponentType : CustomComponentType = new CustomComponentType("comptyp1","component type 1");

    this.customComponentTypestList = customComponentTypesList;
  }

  getCustomComponentTypeList() {
    
    if (this.customComponentTypestList = undefined) {
      this.fillCustomComponentTypes();
    }

    return this.customComponentTypestList;
  }
}
