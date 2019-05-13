import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/model/sentilo/measurement';
import { Sensor } from '../model/sentilo/sensor';
import { CustomLocation } from '../model/customLocation';
import { CustomComponentType } from '../model/sentilo/customComponentType';
import { CustomComponent } from '../model/sentilo/customComponent';
import { SensorType } from '../model/sentilo/sensorType';
import { Observable, from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public components = {};
  public sensors = {};
  private _customComponentTypes = {};
  private _sensorTypes = {};
  private providerId = 'uoc@arevelproveidor';
/*
  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'IDENTITTY_KEY': ''
    })
  }

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'IDENTITY_KEY': '81d0e9c5d1b0dcc9ee9a15333774da126744ca3ee80c1254d58375f73d1b4095'
    })
  }
*/
  httpOptions1String = {'Content-Type': 'application/json; charset=UTF-8',
  'IDENTITY_KEY': '8de83e2f39505b22c237b92093c7ed01e671f01b479d6706d7cc68b2b3a82bf2'};

  httpOptions2String = {'Content-Type': 'application/json; charset=UTF-8',
  'IDENTITY_KEY': '81d0e9c5d1b0dcc9ee9a15333774da126744ca3ee80c1254d58375f73d1b4095'};


  constructor(private nativeHttp:HTTP, private storage: Storage) {
    this.nativeHttp.setDataSerializer('json');

    
//TODO delete
    // Or to get a key/value pair
    this.storage.get('provider_credentials').then((val) => {
      console.log('Provider is: ', val);
    });
  }

  public get sensorTypes(): {} {
    return this._sensorTypes;
  }

  public get customComponentTypes()  {
    return this._customComponentTypes;
  }

  // getMeasurement(id:Number): Measurement {
      
  //   console.log('hey1');

  //   var measurement:Measurement = new Measurement();
  //   var location = new CustomLocation();
  //   location.fillData(3,3.2);

  //   measurement.fillData("35", new Date(),location);

  //   console.log(measurement);

  //   return measurement;
  // }

  // getComponent(id:Number): CustomComponent {
      
  //   console.log('hey3');

  //   var customComponent:CustomComponent = new CustomComponent();
  //   var location = new CustomLocation();
  //   location.fillData(3,3.2);

  //   var type = this.getCustomComponentTypeList()[0];

  //   customComponent.fillData("35", "An example",location,type);

  //   console.log(customComponent);

  //   return customComponent;
  // } 

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

  getMeasurements(sensorId: string, limit: number) {
    // http://<your_api_server.com>/data/<provider_id>/<sensor_id>?<parameter>=<value>
    var sensor = this.getSensor(sensorId);

    if (typeof sensor !== 'undefined' && sensor != null) {
      var observable = Observable.create((observer:any) => {
        this.nativeHttp.get(`https://api-sentilo.diba.cat/data/${this.providerId}/${sensorId}?limit=${limit}`,{},this.httpOptions1String).then(data => {
          sensor.measurements = this.parseMeasurements(data);
          observer.next()
        });
      });
    }

    return observable;
    
  }

  parseMeasurements (rawData): Array<Measurement> {
    console.log(rawData);
    return null;
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

    return from(this.nativeHttp.put(`https://api-sentilo.diba.cat/catalog/${this.providerId}`,objectPayload, this.httpOptions1String));

}

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

  // var messagePayload: string = JSON.stringify(objectPayload);
  return from(this.nativeHttp.post(`https://api-sentilo.diba.cat/catalog/${this.providerId}`,objectPayload, this.httpOptions1String));
}

  findAllElements() {

    var observable = Observable.create((observer:any) => {
        this.nativeHttp.get('https://api-sentilo.diba.cat/catalog',{}, this.httpOptions1String).then( data => {
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

  }
