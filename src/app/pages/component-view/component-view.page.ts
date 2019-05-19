import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from 'src/app/services/model.service';
import { CustomComponent } from 'src/app/model/customComponent';
import { Sensor } from 'src/app/model/sensor';
import { SensorType } from 'src/app/model/sensorType';
import { CustomComponentType } from 'src/app/model/customComponentType';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

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
    public router: Router,
    private loadingCtrl: LoadingController,
    private appComponent: AppComponent
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
    this.newSensors = this.newSensors.filter(function(value, _index, _arr){

      return value.newId != newId;
  
  });
  }

  enableModify() {
    this.modify = true;
  }

  submitComponent() {

    if(this.creation) {
      
      this.loadingCtrl.create({
        message: 'Enviando'
      }).then(loadingElement => {
        
        loadingElement.present();
        
        this.modelService.addSensors(this.customComponent, this.newSensors).subscribe(_data => {
          
          if (_data) {
            this.submitSuccess();
            loadingElement.dismiss();
          }
          else {
            this.submitError();
            loadingElement.dismiss();
          }
          
        },
        _error => {
          this.submitError();
          loadingElement.dismiss();
        });
      });
    }
    else {

      this.loadingCtrl.create({
        message: 'Enviando'
      }).then(loadingElement => {
        
        loadingElement.present();
        
        this.modelService.updateComponent(this.customComponent, this.newSensors).subscribe(_data => {
          if (_data) {
            this.submitSuccess();
            loadingElement.dismiss();
          }
          else {
            this.submitError();
            loadingElement.dismiss();
          }
        },
        _error => {
          this.submitError();
          loadingElement.dismiss();
        });
      });
    }
  }

  submitSuccess() {

    // Añadimos el nuevo componente a la lista
    if (this.creation) {
      this.modelService.components[this.customComponent.id] = this.customComponent;
      this.creation = false;
    }

    this.modify = false;

    // Introducimos los nuevos sensores en la lista de sensores del componente
    this.newSensors.forEach(sensor => {
      this.customComponent.sensors.push(sensor);
    });

    this.newSensors = new Array<Sensor>();

    // Añadimos los nuevos tipos
    if (this.customComponent.hasNewType) {
      this.modelService.customComponentTypes[this.customComponent.newType.id] = this.customComponent.newType;
      this.customComponent.updateNewType();
    }

    this.customComponent.sensors.forEach(sensor => {
      if (sensor.hasNewType) {
        this.modelService.sensorTypes[sensor.newType.id] = sensor.newType;
        sensor.updateNewType();
      }
    })
    
  }

  submitError() {
    this.appComponent.showToast('Ha ocurrido un error. Compruebe los datos introducidos y la conexión.');
  }

  showMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, true]);
  }

  addMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, false]);
  }

  

  compareWithFn = (o1, o2) => {
    return o1 && o2 && o1 == o2;
  }

  compareWith = this.compareWithFn;
}
