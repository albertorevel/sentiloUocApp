import { CustomComponentType } from './customComponentType';
import { CustomLocation } from './customLocation';
import { Sensor } from './sensor';

export class CustomComponent {

    private _id: string = '';
    private _description: string = '';   
    private _location: CustomLocation = new CustomLocation();
    private _type: CustomComponentType = new CustomComponentType('');
    private _sensors: Array<Sensor> = new Array();

    constructor() { }
   
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
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

    public get sensors(): Array<Sensor> {
        return this._sensors;
    }
    public set sensors(value: Array<Sensor>) {
        this._sensors = value;
    }

    public get type(): CustomComponentType {
        return this._type;
    }
    public set type(value: CustomComponentType) {
        this._type = value;
    }

    public fillData(id: string, description:string, location:CustomLocation, type:CustomComponentType) {
        this.id = id;
        this.description = description;
        this.location = location;
        this.type = type;
    }
}