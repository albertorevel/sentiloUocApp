import { Sensor } from './sensor';
import { CustomLocation } from '../customLocation';

export class Measurement {

    private _value: string;
    private _date: Date;
    private _location: CustomLocation;
    
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
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

    public fillData(value: string, date: Date, location: CustomLocation) {
        this.value = value;
        this.date = date;
        this.location = location;
    }
}