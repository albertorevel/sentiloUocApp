import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/model/measurement';
import { Sensor } from '../model/sensor';
import { CustomLocation } from '../model/customLocation';
import { CustomComponentType } from '../model/customComponentType';
import { CustomComponent } from '../model/customComponent';
import { SensorType } from '../model/sensorType';
import { Observable, from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public components = {};
  public sensors = {};
  private _customComponentTypes = {};
  private _sensorTypes = {};
  private httpOptions = {'Content-Type': 'application/json; charset=UTF-8', 'IDENTITY_KEY' : ''};

  constructor(
    private _nativeHttp:HTTP, 
    private authenticationService: AuthenticationService
  ) {
  }

  private get nativeHttp(): HTTP {

    this._nativeHttp.setDataSerializer('json');
    return this._nativeHttp;
  }

  private get headers(): {} {
    this.httpOptions['IDENTITY_KEY'] = this.authenticationService.providerToken;

    return this.httpOptions;
  }

// shortcut
  public get providerName() : string {
    return this.authenticationService.providerName;
  }

  public get sensorTypes(): {} {
    return this._sensorTypes;
  }

  public get customComponentTypes()  {
    return this._customComponentTypes;
  }

  /**
   * Returns all the components types retrieved for the provider
   */
  getAllCustomComponentTypes(): Array<CustomComponentType> {
    return Object.values(this.customComponentTypes);
  }

  /**
   * Returns all the sensor types retrieved for the provider
   */
  getAllSensorTypes(): Array<SensorType> {
    return Object.values(this.sensorTypes);
  }

  getComponentMeasurements(customComponent: CustomComponent) {
    
    var sensorsMap = {};
    customComponent.sensors.forEach(sensor => {
      sensorsMap[sensor.id] = sensor;
    });

    var observable = Observable.create((observer:any) => {
      this.nativeHttp.get(`https://api-sentilo.diba.cat/data/${this.providerName}?limit=1`, {}, this.headers).then(data => {
        this.parseSensorsMeasurements(data, sensorsMap);
        observer.next();
      });
    });
    
    return observable;
  }

  parseSensorsMeasurements (rawData, sensors) {
    if (rawData && rawData.data && JSON.parse(rawData.data)) {
      var sensorList = JSON.parse(rawData.data).sensors;
      sensorList.forEach(element => {
        
        var sensor: Sensor = sensors[element.sensor];
        
        if (typeof sensor !== 'undefined' && sensor != null && element.observations.length > 0) {
          var newMeasurement: Measurement = new Measurement();
          
          newMeasurement.sensor = sensor;
          newMeasurement.value = element.observations[0].value;
          
          var newDate = new Date(element.observations[0].time);
          
          newMeasurement.date = newDate.toISOString();

          sensor.lastMeasurement = newMeasurement;
        }

      });
    }
  }

  /**
   * Returns all the components retrieved for the provider
   */
  getAllComponents(): Array<CustomComponent> {
    return Object.values(this.components);
  }

  /**
   * Returns a component with an id passed as a parameter
   */
  getComponent(id: string): CustomComponent {
    return this.components[id];
  }

  /**
   * Returns a sensor with an id passed as a parameter
   */
  getSensor(id: string): Sensor {
    return this.sensors[id];
  }

  /**
   * 
   */
  updateComponent(customComponent: CustomComponent, sensorsToAdd: Array<Sensor>) {
    var objectPayload = {"sensors":[],"components":[]};

    // Cargamos el componente a actualizar
    var componentPayload = {};
    componentPayload['component'] = customComponent.id;
    componentPayload['componentDesc'] = customComponent.description;
    componentPayload['componentType'] = customComponent.type.id;

    objectPayload.components.push(componentPayload);

    var sensorPayload = {};

    for( var sensor of customComponent.sensors) {
      sensorPayload = {};

      sensorPayload['sensor'] = sensor.id;
      sensorPayload['description'] = sensor.description;
      sensorPayload['type'] = sensor.type.id;

      //TODO unit and datatype

      objectPayload.sensors.push(sensorPayload);
    }

    // var messagePayload = JSON.stringify(objectPayload);

    if (sensorsToAdd.length > 0) {
      this.addSensors(customComponent, sensorsToAdd);
    }
    
    // TODO manage responses

    return from(this.nativeHttp.put(`https://api-sentilo.diba.cat/catalog/${this.providerName}`,objectPayload, this.headers));

  }

  /**
   * 
   * @param customComponent 
   * @param sensorsToAdd 
   */
  addSensors(customComponent: CustomComponent, sensorsToAdd: Array<Sensor>) {

    var objectPayload = {"sensors":[]};
    var sensorPayload = {};

    for( var sensor of sensorsToAdd) {
      sensorPayload = {};

      sensorPayload['sensor'] = sensor.id;

      if (sensor.description && sensor.description.length > 0) {
        sensorPayload['description'] = sensor.description;
      }

      sensorPayload['type'] = sensor.type.id;
      sensorPayload['component'] = customComponent.id;
      sensorPayload['componentType'] = customComponent.type.id;

      if (customComponent.description && customComponent.description.length > 0) {
        sensorPayload['componentDesc'] = customComponent.description;
      }
      

      //TODO unit and datatype

      objectPayload.sensors.push(sensorPayload);
    }

    return from(this.nativeHttp.post(`https://api-sentilo.diba.cat/catalog/${this.providerName}`,objectPayload, this.headers));
  }


  addMeasurements(sensors: Array<Sensor>) {
    var objectPayload = {'sensors' : []};
    var sensorPayload = {}
    var observationPayload = {};

    // Por el momento añadimos uno solo por sensor como máximo
    sensors.forEach(sensor => {
      sensorPayload = {};
      observationPayload = {};

      sensorPayload['sensor'] = sensor.id;
      sensorPayload['observations'] = [];
      
      observationPayload['value'] = sensor.newMeasurement.value;

      if (sensor.newMeasurement.date.length > 0) {
        observationPayload['timestamp'] = this.parseTimeFromUTC(sensor.newMeasurement.date);
      }
      
      sensorPayload['observations'].push(observationPayload);

      objectPayload.sensors.push(sensorPayload);
    });

    return from(this.nativeHttp.put(`https://api-sentilo.diba.cat/data/${this.providerName}`,objectPayload, this.headers));
  }

  findAllElements() {

    var observable = Observable.create((observer:any) => {
        this.nativeHttp.get('https://api-sentilo.diba.cat/catalog',{}, this.headers).then( data => {
            this.parseElements(data);
            observer.next(true);
          }
        )
    });

    return observable;
    
  }

  parseElements(rawData) {
    
    if(rawData && rawData.data) {
      let data = JSON.parse(rawData.data);

      try {
        for (let provider of data['providers']) {
          for (let sensor of provider['sensors']) {
          
            //SENSOR
            var newSensor = new Sensor();

            if (sensor['location']) {
              var newLocation = new CustomLocation();
              newLocation.fillDataString(sensor['location']);
            }

            newSensor.fillData(sensor['sensor'],
              sensor['description'],
              newLocation,
              null);
    
            this.sensors[sensor.sensor] = newSensor;
            
            
            // SENSORTYPÊ
            var sensorTypeName = sensor['type'];
            var sensorType:SensorType = this.sensorTypes[sensorTypeName];
           
            if (!sensorType) {
              sensorType = new SensorType(sensorTypeName);
              this.sensorTypes[sensorTypeName] = sensorType;
            }

            newSensor.type = sensorType;
            
    
            // CUSTOMCOMPONENTTYPE
           
            var customComponentTypeId = sensor['componentType'];
            var customComponentType = this.customComponentTypes[customComponentTypeId];

            if (!customComponentType) {
              customComponentType = new CustomComponentType(customComponentTypeId);
              this.customComponentTypes[customComponentTypeId] = customComponentType;
            }

            // CUSTOMCOMPONENT
            var customComponentId = sensor['component'];
            var customComponent = this.components[customComponentId]
    
            if (!customComponent) {
              customComponent = new CustomComponent();
              customComponent.fillData(customComponentId, sensor['componentDesc'], newLocation, customComponentType);
              this.components[customComponentId] = customComponent;
            }

            customComponent.sensors.push(newSensor);
            newSensor.customComponent = customComponent;
            
          }
        }
      }
      catch(e) {
        console.log(e);
        //TODO: ver que hacer
      }

    }
    
  }

  parseTimeFromUTC(utcDate: string) : string {
    var parsedDate: string = '';
    var objectDate = new Date(utcDate);
    var isoDate = objectDate.toISOString().substr(0,19)

    var splittedDate = isoDate.split('T');
    if (splittedDate.length == 2) {
      var splittedDay = splittedDate[0].split('-') ;
      if (splittedDay.length == 3) {
        parsedDate = `${splittedDay[2]}/${splittedDay[1]}/${splittedDay[0]}T${splittedDate[1]}`
      }
    }

    return parsedDate;
  }

}
