import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/model/measurement';
import { Sensor } from '../model/sensor';
import { CustomLocation } from '../model/customLocation';
import { CustomComponentType } from '../model/customComponentType';
import { CustomComponent } from '../model/customComponent';
import { SensorType } from '../model/sensorType';
import { Observable, from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
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
  ) { }            


  /**
   * Devuelve el objeto de tipo HTTP (nativo) añadiendo el serializador JSON.
   */
  private get nativeHttp(): HTTP {
    this._nativeHttp.setDataSerializer('json');
    return this._nativeHttp;
  }

  /**
   * Devuelve la cabecera a enviar con la petició a la API con el formato correcto
   */
  private get headers(): {} {
    this.httpOptions['IDENTITY_KEY'] = this.authenticationService.providerToken;

    return this.httpOptions;
  }

  /* *******************
  * Getters and setters
  * ******************* */

  public get providerName() : string {
    return this.authenticationService.providerName;
  }

  public get apiURL() : string {
    return this.authenticationService.apiURL;
  }

  public get sensorTypes(): {} {
    return this._sensorTypes;
  }

  public get customComponentTypes() {
    return this._customComponentTypes;
  }

  /**
   * Devuelve todos los componentes almacenados para el proveedor
   */
  getAllCustomComponentTypes(): Array<CustomComponentType> {
    return Object.values(this.customComponentTypes);
  }

  /**
   * Devuelve todos los tipos de sensor almacenados para el proveedor
   */
  getAllSensorTypes(): Array<SensorType> {
    return Object.values(this.sensorTypes);
  }

  /**
   * Devuelve todos los componentes almacenados para el proveedor
   */
  getAllComponents(): Array<CustomComponent> {
    return Object.values(this.components);
  }

  /**
   * Devuelve el componente cuyo id se corresponde con el pasado por parámetro
   */
  getComponent(id: string): CustomComponent {
    return this.components[id];
  }
  
  /**
   * Devuelve un clon del componente cuyo id se corresponde con el pasado por parámetro, si existe
   */
  getComponentClone(id: string): CustomComponent {
    if (this.components[id]) {
      return this.components[id].getClone();
    } 
    return null;
  }

  /**
   * Devuelve el sensor cuyo id se corresponde con el pasado por parámetro
   */
  getSensor(id: string): Sensor {
    return this.sensors[id];
  }

  /**
   * Actualiza el componente pasado por parámetro si este existe en los datos almacenados
   */
  setComponent(customComponent: CustomComponent) {
    if (customComponent.id) {
      this.components[customComponent.id] = customComponent;
    }
  }

 /* ****************************
  * LLAMADAS A LA API DE SENTILO
  * **************************** */

  /**
   * Recupera todos los elementos (componentes, sensores y sus tipos) para el proveedor autenticado.
   * 
   * @returns true si se han recuperado y añadido a la app correctamente los datos
   */
  findAllElements() {

    var observable = Observable.create((observer:any) => {
        this.nativeHttp.get(`${this.apiURL}/catalog`,{}, this.headers).then( data => {
            let result = this.parseElements(data);
            observer.next(result);
          },
          _error => {
            observer.next(false);
          }
        )
    });

    return observable;
  }

  /**
   * Actualiza un componente en la plataforma Sentilo con los datos pasados por parámetro, 
   * añadiendo los sensores pasados por parámetro si es necesario.
   * 
   * @returns la respuesta del servidor
   */
  updateComponent(customComponent: CustomComponent, sensorsToAdd: Array<Sensor>) {
    var objectPayload = {"sensors":[],"components":[]};

    // Cargamos el componente a actualizar
    var componentPayload = {};
    componentPayload['component'] = customComponent.id;
    componentPayload['componentDesc'] = customComponent.description;
    componentPayload['componentType'] = customComponent.correctType.id;

    var location = customComponent.location.locationString;
    if (location.length > 0) {
      componentPayload['location'] = location;
    }

    objectPayload.components.push(componentPayload);

    var sensorPayload = {};

    for( var sensor of customComponent.sensors) {
      sensorPayload = {};

      sensorPayload['sensor'] = sensor.id;
      sensorPayload['description'] = sensor.description;
      sensorPayload['unit'] = sensor.unit;
      sensorPayload['type'] = sensor.correctType.id;
      
      objectPayload.sensors.push(sensorPayload);
    }

    if (sensorsToAdd.length > 0) {
      this.addSensors(customComponent, sensorsToAdd).subscribe(data => {
        return from(this.nativeHttp.put(`${this.apiURL}/catalog/${this.providerName}`,objectPayload, this.headers));
      },
      _error => {
        return from(new Promise(resolve => resolve(_error)));
      });
    }

    return from(this.nativeHttp.put(`${this.apiURL}/catalog/${this.providerName}`,objectPayload, this.headers));
  }

  /**
   * Añade los sensores pasados por parámetro al componente indicado en la plataforma Sentilo
   * 
   * @returns la respuesta del servidor
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

      sensorPayload['type'] = sensor.correctType.id;
      sensorPayload['unit'] = sensor.unit;
      sensorPayload['component'] = customComponent.id;
      sensorPayload['componentType'] = customComponent.correctType.id;
      sensorPayload['componentDesc'] = customComponent.description;
      
      var location = customComponent.location.locationString;
      if (location.length > 0) {
        sensorPayload['location'] = location;
      }
      

      if (customComponent.description && customComponent.description.length > 0) {
        sensorPayload['componentDesc'] = customComponent.description;
      }
    
      objectPayload.sensors.push(sensorPayload);
    }

    return from(this.nativeHttp.post(`${this.apiURL}/catalog/${this.providerName}`,objectPayload, this.headers));
  }

  /**
   * Recupera la última medición para todos los sensores que contiene el componente indicado por parámetro.
   * 
   * @returns true si se han recuperado y añadido a la app correctamente los datos
   */
  getComponentMeasurements(customComponent: CustomComponent) {
    
    var sensorsMap = {};
    customComponent.sensors.forEach(sensor => {
      sensorsMap[sensor.id] = sensor;
    });

    var observable = Observable.create((observer:any) => {
      this.nativeHttp.get(`${this.apiURL}/data/${this.providerName}?limit=1`, {}, this.headers).then(data => {
        this.parseSensorsMeasurements(data, sensorsMap);
        observer.next(true);
      },
      _error => {
        observer.next(false);
      });
    });
    
    return observable;
  }

  /**
   * Añade la medición que contiene cada uno de los sensores pasados por parámetro a estos sensores.
   * 
   * @returns la respuesta del servidor
   */
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

      if (typeof sensor.newMeasurement.date !== 'undefined' && sensor.newMeasurement.date != null && sensor.newMeasurement.date.length > 0) {
        observationPayload['timestamp'] = this.parseTimeFromUTC(sensor.newMeasurement.date);
      }
      
      sensorPayload['observations'].push(observationPayload);

      objectPayload.sensors.push(sensorPayload);
    });

    return from(this.nativeHttp.put(`${this.apiURL}/data/${this.providerName}`,objectPayload, this.headers));
  }

 /* *******
  * PARSERS
  * ******* */

  /**
   * Formatea los datos recibidos para las entidades pertenecientes a un proveedor,
   * almacenándolos en el modelo de datos que maneja la aplicación
   */
  parseElements(rawData) : boolean {
    
    let result = false;

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
              null,
              sensor['unit'],
              sensor['dataType']);
    
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
            
          }
        }
        result = true;
      }
      catch(e) {
       result = false;
      }
    
    }

    return result;
  }

  /**
   * Formatea los datos recibidos de una serie de mediciones,
   * almacenándolos en el modelo de datos que maneja la aplicación
   */
  parseSensorsMeasurements (rawData, sensors) {
    if (rawData && rawData.data && JSON.parse(rawData.data)) {
      var sensorList = JSON.parse(rawData.data).sensors;
      sensorList.forEach(element => {
        
        var sensor: Sensor = sensors[element.sensor];
        
        if (typeof sensor !== 'undefined' && sensor != null && element.observations.length > 0) {
          var newMeasurement: Measurement = new Measurement();
          
          newMeasurement.value = element.observations[0].value;
          
          var newDate = new Date(element.observations[0].time);
          
          newMeasurement.date = newDate.toISOString();

          sensor.lastMeasurement = newMeasurement;
        }

      });
    }
  }

  /**
   * Formatea una fecha en UTC en el formato esperado por la plataforma Sentilo.
   */
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
