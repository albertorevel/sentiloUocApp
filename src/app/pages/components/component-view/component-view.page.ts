import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/sentilo/customComponent';
import { Sensor } from 'src/app/model/sentilo/sensor';

@Component({
  selector: 'app-component-view',
  templateUrl: './component-view.page.html',
  styleUrls: ['./component-view.page.scss'],
})
export class ComponentViewPage implements OnInit {
  
  customComponent:CustomComponent;
  newSensors:Array<Sensor> = new Array<Sensor>();
  modify:boolean;
  counter: number = 0;

  constructor(
    public toastController: ToastController,
    private route: ActivatedRoute,
    private modelService: ModelService
    ) { }

  ngOnInit() {

    // We read parameters and prepare data
    this.modify = this.route.snapshot.paramMap.get('modify') === "true";
    var id = this.route.snapshot.paramMap.get('component-id');

    if (typeof id !== "undefined" && id != null) {
      this.customComponent = this.modelService.getComponent(id);
    }
    else {
      id = null
      this.customComponent = new CustomComponent();
      this.modify = true;
    }
  }

  addSensor() {
    var newSensor: Sensor = new Sensor();
    newSensor.newId = this.counter++;
    this.newSensors[newSensor.newId] = newSensor;
  }

  removeSensor(newId: number) {
    this.newSensors = this.newSensors.filter(function(value, index, arr){

      return value.newId != newId;
  
  });
  }

  enableModify() {
    this.modify = true;
  }

  async submit() {

    // TODO
    const toast = await this.toastController.create({
      message: `Component [${this.customComponent}] submitted`,
      duration: 2000
    });
    toast.present();
  }

}
