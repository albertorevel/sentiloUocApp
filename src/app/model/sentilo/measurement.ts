import { Sensor } from './sensor';
import { CustomLocation } from '../customLocation';

export class Measurement {

    private _value: String;
    private _date: Date;
    private _location: CustomLocation;
    
    public get value(): String {
        return this._value;
    }
    public set value(value: String) {
        this._value = value;
    }

    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }

    public get location(): CustomLocation {
        return this._location;
    }
    public set location(value: CustomLocation) {
        this._location = value;
    }

    public fillData(value: String, date: Date, location: CustomLocation) {
        this.value = value;
        this.date = date;
        this.location = location;
    }
}