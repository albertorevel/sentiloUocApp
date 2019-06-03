import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    private appComponent: AppComponent,
    private location: Location
    ) { }

  ngOnInit() {

    // Leemos los parámetros y preparamos los datos del componente. Dependiendo de los datos que llegan,
    // se trata de la vista de un componente o de la creación de uno nuevo.
    var id = this.route.snapshot.paramMap.get('component-id');

    if (typeof id !== "undefined" && id != null) {
      this.customComponent = this.modelService.getComponentClone(id);
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

  /**
   * Añade un nuevo sensor a la lista de sensores a añadir al componente
   */
  addSensor() {
    var newSensor: Sensor = new Sensor();
    newSensor.newId = this.counter++;
    this.newSensors.push(newSensor);
  }

  /**
   * Elimina el sensor indicado en el parámetro de la lista de sensores a añadir al componente
   */
  removeSensor(newId: number) {
    this.newSensors = this.newSensors.filter(function(value, _index, _arr){

      return value.newId != newId;
    });
  }

  /**
   * Activa el modo de edición de un componente
   */
  enableModify() {
    this.modify = true;    
    this.customComponent = this.customComponent.getClone();
  }

  /**
   * Copia el componente y todos sus datos para la creación de uno nuevo.
   */
  copyComponent() {

    this.modify = true;
    this.creation = true;    
    this.customComponent = this.customComponent.getClone();
    this.customComponent.id = '';

    while(this.customComponent.sensors.length > 0) {
      var sensor = this.customComponent.sensors.pop();
      sensor.id = '';
      sensor.newId = this.counter++;
      this.newSensors.push(sensor);
    }
    
  }

  /**
   * Cancela la edición o creación del componente.
   */
  cancelComponent() {
    if (!this.creation) {
      this.modify = false;
      this.customComponent
    } else {
      this.location.back();
    }
  }

  /**
   * Envía la información que se está editando del componente (existente o nuevo)
   */
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
            this.submitError(null);
            loadingElement.dismiss();
          }
          
        },
        error => {
          this.submitError(error);
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
            this.submitError(null);
            loadingElement.dismiss();
          }
        },
        error => {
          this.submitError(error);
          loadingElement.dismiss();
        });
      });
    }
  }

  /**
   * Callback llamado cuando el envío de datos ha resultado satisfactorio
   */
  submitSuccess() {

    this.appComponent.showToast('Datos añadidos correctamente.');
    
    this.modelService.setComponent(this.customComponent);

    // Añadimos el nuevo componente a la lista
    this.creation = false;

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

  /**
   * Callback llamado cuando el envío de datos ha resultado erróneo
   */
  submitError(error) {
    var message = '';

    if (error != null) {
      try {
        JSON.parse(error.error).errorDetails.forEach( errorMessage => {
          message += errorMessage + '\n'
        });
        if(error.error.includes('invalid value for field type') || error.error.includes('invalid value for field componentType')) {
          message += 'El tipo indicado debe existir en su instancia de Sentilo';
        }
      } catch { }
    }

    if (message.length == 0) {
      message = 'Ha ocurrido un error. Compruebe los datos introducidos y la conexión.';
    }

    this.appComponent.showToast(message);
  }

  /**
   * Dirige a la vista de las últimas medidas tomadas para los sensores del componente mostrado
   */
  showMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, true]);
  }

  /**
   * Dirige a la adición de medidas tomadas para los sensores del componente mostrado
   */
  addMeasurements() {
    this.router.navigate(['measurement-view',this.customComponent.id, false]);
  }
}
