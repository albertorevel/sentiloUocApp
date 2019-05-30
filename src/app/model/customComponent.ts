import { CustomComponentType } from './customComponentType';
import { CustomLocation } from './customLocation';
import { Sensor } from './sensor';

/**
 * Entidad que representa un componente del catálogo de Sentilo.
 */
export class CustomComponent {

    // Primitive types
    private _id: string = '';
    private _description: string = '';   
    private _hasNewType: boolean = false;

    // Objects
    private _location: CustomLocation = new CustomLocation();
    private _type: CustomComponentType = new CustomComponentType('');
    private _newType: CustomComponentType = new CustomComponentType('');
    
    // Arrays
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

    public get newType(): CustomComponentType {
        return this._newType;
    }
    public set newType(value: CustomComponentType) {
        this._newType = value;
    }

    public get hasNewType(): boolean {
        return this._hasNewType;
    }
    public set hasNewType(value: boolean) {
        this._hasNewType = value;
    }
    
    public get correctType () : CustomComponentType {
        return this.hasNewType ? this.newType : this.type;
    }

    public fillData(id: string, description:string, location:CustomLocation, type:CustomComponentType) {
        this.id = id;
        this.description = description;
        this.location = location;
        this.type = type;
    }

    public updateNewType() {
      this.type = this.newType;
      this.newType = new CustomComponentType('');
      this.hasNewType = false;
    }

    /**
     * Devuelve una copia del objeto
     */
    public getClone() : CustomComponent {
        var clonedObject = new CustomComponent();

        // Primitive types
        clonedObject.id = this.id;
        clonedObject.description = this.description;
        clonedObject.hasNewType = this.hasNewType;

        // Objects
        clonedObject.location = this.location.getClone();
        clonedObject.type = this.type.getClone();
        clonedObject.newType = this.newType.getClone();

        // Arrays
        this.sensors.forEach(sensor => {
            clonedObject.sensors.push(sensor.getClone());
        })

        return clonedObject;
    }
}