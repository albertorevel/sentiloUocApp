import { SensorType } from './sensorType';
import { CustomLocation } from './customLocation';
import { Measurement } from './measurement';

export class Sensor {
    
    // Primitive types
    private _id:string; 
    private _newId: number; 
    private _description:string;
    private _hasNewType: boolean = false;
    private _unit: string; 

    // Primitive types
    private _location:CustomLocation = new CustomLocation();
    private _type:SensorType = new SensorType('');;
    private _newType: SensorType = new SensorType('');
    private _newMeasurement: Measurement = new Measurement();
    private _lastMeasurement: Measurement = new Measurement();
    
    constructor() { }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get newId(): number {
        return this._newId;
    }
    public set newId(value: number) {
        this._newId = value;
    }
    
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get location(): CustomLocation {
        return this._location;
    }
    public set location(value: CustomLocation) {
        this._location = value;
    }

    public get type(): SensorType {
        return this._type;
    }
    public set type(value: SensorType) {
        this._type = value;
    }

    public get newType(): SensorType {
        return this._newType;
    }
    public set newType(value: SensorType) {
        this._newType = value;
    }

    public get hasNewType(): boolean {
        return this._hasNewType;
    }
    public set hasNewType(value: boolean) {
        this._hasNewType = value;
    }
    
    public get correctType () : SensorType {
        return this.hasNewType ? this.newType : this.type;
    }

    public get unit(): string {
        return this._unit;
    }
    public set unit(value: string) {
        this._unit = value;
    }

    public get newMeasurement(): Measurement {
        return this._newMeasurement;
    }
    public set newMeasurement(value: Measurement) {
        this._newMeasurement = value;
    }

    public get lastMeasurement(): Measurement {
        return this._lastMeasurement;
    }
    public set lastMeasurement(value: Measurement) {
        this._lastMeasurement = value;
    }

    public fillData(id:string, description:string, location:CustomLocation, type:SensorType, unit: string, dataType: string) {
        this.id = id;
        this.description = description;
        this.location = location;
        this.type = type;
        this.unit = unit;
    }

    public updateNewType() {
      this.type = this.newType;
      this.newType = new SensorType('');
      this.hasNewType = false;
    }

    public getClone(): Sensor {
       var copiedSensor = new Sensor();

       // Primitive types
       copiedSensor.id = this.id;
       copiedSensor.newId = this.newId;
       copiedSensor.description = this.description;
       copiedSensor.hasNewType = this.hasNewType;
       copiedSensor.unit = this.unit;
       
       // Objects
       copiedSensor.location = this.location.getClone();
       copiedSensor.type = this.type.getClone();
       copiedSensor.newType = this.newType.getClone();
       copiedSensor.newMeasurement = this.newMeasurement.getClone();
       copiedSensor.lastMeasurement = this.lastMeasurement.getClone();

       return copiedSensor;
    }
}