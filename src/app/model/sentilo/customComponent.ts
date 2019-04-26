import { CustomComponentType } from './customComponentType';
import { CustomLocation } from '../customLocation';

export class CustomComponent {

    private _id: String = '';
    private _description: String = '';   
    private _location: CustomLocation = new CustomLocation();
    private _type: CustomComponentType = new CustomComponentType('','');

    // constructor() {
    //     this.location = new CustomLocation();
    //     this.type = new CustomComponentType('','');
    // }

    // constructor() {
    //     console.log("aaa  " + this);
    //     this.location = new CustomLocation();
    //     this.type = new CustomComponentType('','');
    // }

    public get type(): CustomComponentType {
        return this._type;
    }
    public set type(value: CustomComponentType) {
        this._type = value;
    }
   
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

    public get location(): CustomLocation {
        return this._location;
    }
    public set location(value: CustomLocation) {
        this._location = value;
    }

    public fillData(id: String, description:String, location:CustomLocation, type:CustomComponentType) {
        this.id = id;
        this.description = description;
        this.location = location;
        this.type = type;
    }
}