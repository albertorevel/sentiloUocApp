import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/customComponent';
import { Sensor } from 'src/app/model/sensor';
import { SensorType } from 'src/app/model/sensorType';
import { CustomComponentType } from 'src/app/model/customComponentType';

@Component({
  selector: 'app-component-view',
  templateUrl: './component-view.page.html',
  styleUrls: ['./component-view.page.scss'],
})
export class ComponentViewPage implements OnInit {
  
  customComponent:CustomComponent;
  newSensors:Array<Sensor> = new Array<Sensor>();
  modify:boolean = false;
  counter:number = 0;
  creation:boolean = false;
  sensorTypes: Array<SensorType> = new Array<SensorType>();
  customComponentTypes: Array<CustomComponentType> = new Array<CustomComponentType>();
  
  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    public router: Router
    ) { }

  ngOnInit() {

    // We read parameters and prepare data
    var id = this.route.snapshot.paramMap.get('component-id');

    if (typeof id !== "undefined" && id != null) {
      this.customComponent = this.modelService.getComponent(id);
    }

    if (typeof this.customComponent === "undefined" || this.customComponent == null) {
      id = null
      this.customComponent = new CustomComponent();
      this.creation = true;
      this.modify = true;
      this.addSensor();
    }

    this.sensorTypes = this.modelService.getAllSensorTypes();
    this.customComponentTypes = this.modelService.getAllCustomComponentTypes();
  }

  addSensor() {
    var newSensor: Sensor = new Sensor();
    newSensor.newId = this.counter++;
    this.newSensors.push(newSensor);
  }

  removeSensor(newId: number) {
    this.newSensors = this.newSensors.filter(function(value, index, arr){

      return value.newId != newId;
  
  });
  }

  getCustomComponentType(id: string) {
    if (id == 'sentiloUcApp_other_c') {
      return 'Other';
    } 

    return id;
  }

  enableModify() {
    this.modify = true;
  }

  async submitComponent() {

    if(this.creation) {
      this.modelService.addSensors(this.customComponent, this.newSensors).subscribe(data => {
        this.modify = false;
        this.creation = false;
      })
    }
    else {
      this.modelService.updateComponent(this.customComponent, this.newSensors).subscribe(data => {
          //TODO: Loading false
          this.modify = false;
          this.creation = false;
      });
    }
  }

  showMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, true]);
  }

  addMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, false]);
  }

}
