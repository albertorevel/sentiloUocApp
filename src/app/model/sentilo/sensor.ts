import { SensorType } from './sensorType';
import { CustomComponent } from './customComponent';
import { CustomLocation } from '../customLocation';
import { Measurement } from './measurement';

export class Sensor {
    
    private _id:string; 
    private _newId: number; // TODO
    
    private _description:string;
    private _location:CustomLocation;
    private _type:SensorType;
    private _unit: string;//TODO
    private _dataType: string; //TODO
    private _customComponent:CustomComponent;
    private _measurements: Array<Measurement>;
    
    constructor() {
        this._location = new CustomLocation();
        this._type = new SensorType('');
        this._customComponent = new CustomComponent();
        this._measurements = new Array<Measurement>();
    }

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
   
    public get customComponent(): CustomComponent {
        return this._customComponent;
    }
    public set customComponent(value: CustomComponent) {
        this._customComponent = value;
    }

    public get measurements(): Array<Measurement> {
        return this._measurements;
    }
    public set measurements(value: Array<Measurement>) {
        this._measurements = value;
    }

    public fillData(id:string, description:string, location:CustomLocation, type:SensorType) {
        this.id = id;
        this.description = description;
        this.location = location;
        this.type = type;
    }
}