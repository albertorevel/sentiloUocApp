import { SensorType } from './sensorType';
import { CustomComponent } from './customComponent';

export class Sensor {
    
    private _id:String; 
    private _description:String;
    private _location:String;
    private _type:SensorType;
    private _customComponent:CustomComponent;

    
    public get id(): String {
        return this._id;
    }
    public set id(value: String) {
        this._id = value;
    }

    public get description(): String {
        return this._description;
    }
    public set description(value: String) {
        this._description = value;
    }

    public get location(): String {
        return this._location;
    }
    public set location(value: String) {
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
}